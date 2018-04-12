import express from 'express';
import NewsAPI from 'newsapi';
const app = express();

const newsapi = new NewsAPI(process.env.NEWS_API);
//	workflow
//		get keyword parsed titles from dialogFlow
//		create route to DB
//			TODO investigate if REDIS on heroku would be fastest
//		perform similarity comparison on titles in redis(https://www.npmjs.com/package/similarity), to check if we have archived versions of articles
//		if not in redis, go to news api
//		TODO investigate

app.get('/createURLS/:title', async (req, res) => {
  // console.log('title: ', req.params.title);
  // TODO: send req.params.title to dialogFlow
  try {
    const title = req.params.title;
    newsapi.v2.everything({
      q: '"national enquirer" trump',
      language: 'en',
      sortBy: 'relevancy'
    }).then(response => res.json(response))
    .catch(err => res.status(500).json(err));
  } catch(error) {
    console.error(error);
    if(typeof error !== 'object') error = { error }
    res.status(500).json(error);
  }
  // res.status(200).json({title: req.params.title});
  // res.status(501).send('this route will handle requests to populate database');
});

app.get('/fetchURLS/:title', async (req, res) => {
  res.status(501).send('this route will handle requests to get URLs from database');
});



const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app.listen(port, () => console.log('backend express listening on port', port));
