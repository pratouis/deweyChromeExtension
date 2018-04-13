import express from 'express';
const router = new express.Router();

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
      // console.log('in middleware');
      // console.log('body title: ', req.body.title);
      if(!req.params.title && !req.body.title){
        return res.status(400).json({success: false, message: 'no title provided'});
      }
      try {
        const request = titleAI.textRequest(req.params.title || req.body.title, { sessionId: 10 });
        let { status, result, sessionId } = await handleRequests(request);
        if(status.code !== 200){
          return res.status(status.code).json({ status: status.code, message: status.errorType });
        }
        req.body.keywords = result.parameters.searchterm;
        next();
      } catch (error) {
        console.error('error in middleware associated-articles: ', error);
        return res.status(500).json(error);
      }
    });

    router.post('/associated-articles', async (req,res) => {
      try {
        console.log(`title: ${req.body.title}\nkeywords: ${req.body.keywords}`);
        const key = req.body.keywords.reduce((acc, term) => (acc ? `${acc} "${term}"` : `"${term}"`), "");
        console.log('key: ', key);
        let { status, articles } = await newsapi.v2.everything({ q: key, language: 'en', sortBy: 'relevancy'});
        articles = articles.map(article => ({name: article.source.name, url: article.url, title: article.title})).slice(0,5);
        res.status(200).json(articles);
      } catch (error) {
        console.error('error from POST to associated-articles: ',error);
        res.status(500).json(error);
      }
    });

    router.get('/associated-articles/:title', async (req, res) => {
      try {
        res.status(502).send('this route will resolve with list of URLS');
      } catch(error) {
        console.error('error from GET to associated-articles');
        res.status(500).json(error);
      }
    });

    return router;
  }
}
