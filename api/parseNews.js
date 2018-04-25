import express from 'express';
const router = new express.Router();

import redis from 'redis';
import bluebird from 'bluebird';
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
const db = redis.createClient(process.env.REDIS_URL);

const _ = require('underscore');

const handleRequests = (request) => {
  return new Promise((resolve, reject) => {
    request.on('response', (response) => resolve(response));
    request.on('error', (error) => reject(error));
    request.end();
  });
}

const retext = require('retext');
const retext_keywords = require('retext-keywords');
const nlcstToString = require('nlcst-to-string');

/* API
* returns success - boolean
*         status code - 200 (OK), 400 (missing title), 500 (something went wrong in API)
*
*/
module.exports = {
  articleRouter: function (newsapi) {
    /* middleware parsing keywords */
    router.use('/associated-articles', async (req, res, next) => {
      /* if no title is specified return 400 (user error)*/
      if(!req.query.title && !req.body.title){
        return res.status(400).json({success: false, error: 'no title provided'});
      }
      // console.log(req.query.title);
      var title = req.query.title.split('|')[0].trim();
      try {
        const { data } = await retext().use(retext_keywords).process(title)
        req.body.keywords = data.keyphrases.length ?
          data.keyphrases.map( (phrase) => phrase.matches[0].nodes.map(nlcstToString).join('') ) :
          data.keywords.map( (keyword) => nlcstToString(keyword.matches[0].node) );
          // console.log(req.body.keywords);
        next();
      } catch(err) {
        console.error('error from retext in /newsapi: ',err);
        return res.status(500).send(err);
      }
    });

    router.get('/associated-articles/redditTexts', async (req,res) => {

      res.json({title: req.query.title, keywords: req.body.keywords});
    });

    router.get('/associated-articles/byTitle', async (req, res) => {
      try {
        // console.log(`title: ${req.query.title}\nkeywords: ${req.body.keywords}`);
        const query = req.body.keywords.reduce((acc, term) => (acc ? `${acc} "${term}"` : `"${term}"`), "");
        const key = req.body.keywords.join('_');
        // console.log('key: ', key);
        let data = JSON.parse(await db.getAsync(`${key}`)); // check if search already exists
        if(!data){
          const query = req.body.keywords.reduce((acc, term) => (acc ? `${acc} "${term}"` : `"${term}"`), "");
          let { articles } = await newsapi.v2.everything({ q: query, language: 'en', sortBy: 'relevancy' });
          // console.log('status: ', status);
          if(!!!articles.length) res.status(200).json({ success: false, error: "0 articles returned from newsapi" });
          data = Object.values(
            _.mapObject( _.groupBy(articles, (article) => article.title.toLowerCase()), // group articles by title (not case-sensitive)
              (articles, title) => ({
                source: articles[0].source.name,
                title: articles[0].title,
                url: articles[0].url,
                publishedAt: articles[0].publishedAt,
                description: articles[0].description })))
                .slice(0,5);  // take first five articles
          /* set key-value to have 60*60*24 seconds to live where key is
              a string of space separated keywords in quotes */
          const saved = await db.setexAsync(key, 86400, JSON.stringify(data));
          if(saved !== 'OK'){ return res.status(500).json({ success: false, error: `from REDIS got: ${saved}`}); }
        }
        // console.log('articles: ', data);
        res.status(200).json({ success: true, data });
      } catch(error) {
        console.error('error from GET /associated-articles/byTite: ', error);
        res.status(500).json({ success: false, error });
      }
    });

    return router;
  }
}
