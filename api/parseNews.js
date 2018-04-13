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

module.exports = {
  articleRouter: function (titleAI, newsapi) {
    /* middleware parsing keywords */
    router.use('/associated-articles', async (req, res, next) => {
      if(!req.query.title && !req.body.title){
        return res.status(400).json({success: false, message: 'no title provided'});
      }
      try {
        const request = titleAI.textRequest(req.query.title || req.body.title, { sessionId: 10 });
        let { status, result, sessionId } = await handleRequests(request);
        if(status.code !== 200){
          return res.status(status.code).json({ success: false, status: status.code, message: status.errorType });
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
        const key = req.body.keywords.reduce((acc, term) => (acc ? `${acc} "${term}"` : `"${term}"`), "");
        console.log('key: ', key);
        let { status, articles } = await newsapi.v2.everything({ q: key, language: 'en', sortBy: 'relevancy'});
        articles = articles.map(article => ({
          name: article.source.name,
          url: article.url,
          title: article.title}))
          .slice(0,5);
        const saved = await db.setexAsync(key, 86400, JSON.stringify(articles));
        console.log(saved);
        if(saved !== 'OK'){ return res.status(500).json({ success: false, message: `from REDIS got: ${saved}`}); }
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
        const key = req.body.keywords.reduce((acc, term) => (acc ? `${acc} "${term}"` : `"${term}"`), "");
        console.log('key: ', key);
        const data = JSON.parse(await db.smembersAsync(key));
        res.status(200).json({ success: true, data });
      } catch(error) {
        console.error('error from GET /associated-articles/byTite: ', error);
        res.status(500).json({ success: false, error, message: 'error from GET /associated-articles/byTitle' });
      }
    });

    return router;
  }
}
