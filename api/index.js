import express from 'express';
import NewsAPI from 'newsapi';
import bodyParser from 'body-parser';
import { articleRouter } from './parseNews';
import cors from 'cors';

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
app.use('/', articleRouter(newsapi));


const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app.listen(port, () => console.log('backend express listening on port', port));
