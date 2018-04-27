import express from 'express';
import NewsAPI from 'newsapi';
import bodyParser from 'body-parser';
import { articleRouter } from './parseNews';
import cors from 'cors';
import md5 from 'md5';

import redis from 'redis';
import bluebird from 'bluebird';
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
// const db = redis.createClient(process.env.REDIS_URL);
const db = redis.createClient();

// if(!process.env.NEWS_API){
//   console.error('no NEWS_API token found.  Did you source env.sh?');
//   process.exit(1);
// }
//
// const newsapi = new NewsAPI(process.env.NEWS_API);
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
  origin: "*",
  methods: ['GET', 'POST']
}));



app.use('/', articleRouter(db));


app.get('/hasNewsApi/:user', async (req, res) => {
  try{
    const user = await db.getAsync(req.params.user);
    res.status(200).json({ success: !!user });
  } catch(error) {
    res.status(500).json({ success: false, error })
  }
});

app.post('/register', async (req, res) => {
  try {
    const hashedUser = md5(req.body.username+req.body.password+process.env.SALT);
    let apikey = await db.getAsync(hashedUser);
    console.log('apikey: ', apikey);
    if(apikey) { return res.status(400).json({ success: false, error: 'user already in db'}); }
    if(!req.body.newsapi){ return res.status(400).json({ success: false, error: 'no newsapi stored or provided' })}
    const newsapi = new NewsAPI(req.body.newsapi);
    /* validate NEWSAPI */
    const { status, code, message, totalResults } = await newsapi.v2.topHeadlines({ q:'bitcoin', pageSize: 2, page: 0 });
    if(status !== "ok") { return res.status(400).json({success: false, error: `${code}: ${message}`}); }
    const saved = await db.setAsync(hashedUser, req.body.newsapi);
    if(saved !== 'OK'){ return res.status(500).json({ success: false, error: `from REDIS got: ${saved}`}); }
    res.status(200).json({ success: true, hashedUser });
  } catch(error) {
    res.status(500).json({ success: false, error });
  }
});

app.post('/login', async (req, res) => {
  try {
    const hashedUser = md5(req.body.username+req.body.password+process.env.SALT);
    let apikey = await db.getAsync(hashedUser);
    if (!apikey) { return res.status(400).json({ success: false, error: 'invalid login credentials' });}
    res.status(200).json({ success: true, hashedUser });
  } catch(error) {
    res.status(500).json({ success: false, error });
  }
});


const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app.listen(port, () => console.log('backend express listening on port', port));
