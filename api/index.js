import express from 'express';

const app = express();
//	workflow
//		get keyword parsed titles from dialogFlow
//		create route to DB
//			TODO investigate if REDIS on heroku would be fastest
//		perform similarity comparison on titles in redis(https://www.npmjs.com/package/similarity), to check if we have archived versions of articles
//		if not in redis, go to news api
//		TODO investigate

app.get('/createURLS/:title', async (req, res) => {
  res.status(501).send('this route will handle requests to populate database');
});

app.get('/fetchURLS/:title', async (req, res) => {
  res.status(501).send('this route will handle requests to get URLs from database');
})
