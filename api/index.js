import express from 'express';
import NewsAPI from 'newsapi';
import apiai from 'apiai';
import bodyParser from 'body-parser';
import { articleRouter } from './parseNews';

if(!process.env.NEWS_API || !process.env.APIAI_CLIENT){
  console.error('no NEWS_API or APIAI_CLIENT tokens found.  Did you source env.sh?');
  process.exit(1);
}


const newsapi = new NewsAPI(process.env.NEWS_API);
const titleAI = apiai(process.env.APIAI_CLIENT);
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', articleRouter(titleAI, newsapi));



const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app.listen(port, () => console.log('backend express listening on port', port));
