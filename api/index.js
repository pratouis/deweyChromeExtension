import express from 'express';
import NewsAPI from 'newsapi';
import bodyParser from 'body-parser';
import { articleRouter } from './parseNews';
import cors from 'cors';
import bcrypt from 'bcrypt';

import redis from 'redis';
import bluebird from 'bluebird';
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
// const db = redis.createClient(process.env.REDIS_URL);
const db = redis.createClient();

if(!process.env.NEWS_API){
  console.error('no NEWS_API token found.  Did you source env.sh?');
  process.exit(1);
}

const newsapi = new NewsAPI(process.env.NEWS_API);
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
  origin: "*",
  methods: ['GET', 'POST']
}));



app.use('/', articleRouter(newsapi, db));


app.get('/hasNewsApi', async (res, req) => {
  try{
    const user = await db.getAsync(req.query.user);
    res.status(200).json({ success: !!user });
  } catch(error) {
    res.status(500).json({ success: false, error })
  }
});

app.post('/login', async (req, res) => {
  try {
    const hashedUser = await bcrypt.hash(req.body.username+req.body.password+process.env.SALT, 12);
    console.log(`hashedUser: ${hashedUser}`);
    let key = await db.getAsync(hashedUser);
    if (!key) {
      if(!req.body.newsapi){ return res.status(400).json({ success: false, error: 'no newsapi stored or provided' })}
      let key = req.body.newsapi;
      console.log(req.body.newsapi);
      const storedNewsApi = await db.setAsync(hashedUser, key);
    }
    res.status(200).json({ success: true, hashedUser, key });
  } catch(error) {
    res.status(500).json({ success: false, error });
  }
});


const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app.listen(port, () => console.log('backend express listening on port', port));
