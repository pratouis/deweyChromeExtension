import express from 'express';
const router = new express.Router();

import redis from 'redis';
import bluebird from 'bluebird';
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
const db = redis.createClient();

const _ = require('underscore');

const handleRequests = (request) => {
  return new Promise((resolve, reject) => {
    request.on('response', (response) => resolve(response));
    request.on('error', (error) => reject(error));
    request.end();
  });
}

/* API
* returns success - boolean
*         status code - 200 (OK), 400 (missing title), 500 (something went wrong in API)
*
*/
module.exports = {
  articleRouter: function (titleAI, newsapi) {
    /* middleware parsing keywords */
    router.use('/associated-articles', async (req, res, next) => {
      /* if no title is specified return 400 (user error)*/
      if(!req.query.title && !req.body.title){
        return res.status(400).json({success: false, error: 'no title provided'});
      }
      try {
        const request = titleAI.textRequest(req.query.title || req.body.title, { sessionId: 10 });
        let { status, result, sessionId } = await handleRequests(request);
        if(status.code !== 200){
          return res.status(status.code).json({ success: false, error: status.errorType });
        }
        req.body.keywords = result.parameters.searchterm;
        next();
      } catch (error) {
        console.error('error in middleware associated-articles: ', error);
        return res.status(500).json({ success: false, error});
      }
    });

    router.post('/associated-articles', async (req,res) => {
      console.log('inside POST /associated-articles');
      try {
        console.log(`title: ${req.body.title}\nkeywords: ${req.body.keywords}`);
        const query = req.body.keywords.reduce((acc, term) => (acc ? `${acc} "${term}"` : `"${term}"`), "");
        const key = req.body.keywords.join("_");
        console.log(`query: ${query}, key: ${key}`);
        let { status, articles } = await newsapi.v2.everything({ q: query, language: 'en', sortBy: 'relevancy'});
        articles =
        Object.values(
            _.mapObject(
              // group articles by title (not case-sensitive)
              _.groupBy(articles, (article) => article.title.toLowerCase()),
              // map carbon articles to first article (articles[0])
              //  and only store source's name, article title, article URL
              (articles, title) => ({ source: articles[0].source.name,
                                       title: articles[0].title,
                                         url: articles[0].url })))
              // take first five articles
                .slice(0,5);
        /* set key-value to have 60*60*24 seconds to live
           where key is a string of space separated keywords in quotes
        */
        console.log('articles: ', articles);
        const saved = await db.setexAsync(key, 86400, JSON.stringify(articles));
        if(saved !== 'OK'){ return res.status(500).json({ success: false, error: `from REDIS got: ${saved}`}); }
        res.status(200).json({ success: true });
      } catch (error) {
        console.error('error from POST /associated-articles: ', error);
        res.status(500).json({ success: false, error });
      }
    });

    router.get('/associated-articles/byTitle', async (req, res) => {
      console.log('inside GET /associated-articles/byTitle');
      try {
        console.log(`title: ${req.query.title}\nkeywords: ${req.body.keywords}`);
        // const query = req.body.keywords.reduce((acc, term) => (acc ? `${acc} "${term}"` : `"${term}"`), "");
        const key = req.body.keywords.join('_');
        console.log('key: ', key);
        /* grab URL info from redis */
        const data = JSON.parse(await db.getAsync(`${key}`));
        console.log('data from byTitle: ', data);
        if(!data){
          return res.status(500).json({ success: false, error: `data is empty or null: ${data}` });
        }
        res.status(200).json({ success: true, data });
      } catch(error) {
        console.error('error from GET /associated-articles/byTite: ', error);
        res.status(500).json({ success: false, error });
      }
    });

    return router;
  }
}