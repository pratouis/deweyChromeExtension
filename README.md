## Chrome Extension

### Todos on 4/9/2018
- select card upon click
- investigate NEWS apis
  * NOTE we need to be careful about which API we use, and how often we ping it.  

### Todos on 4/10/2018
- get button on twitter card
  * only on iFrame twitter cards 
- get dialogFlow setup
- investigate improving capturing of titles, initialize backend

### Proposed workflow of backend 4/10/2018

#### Routes

###### getting URLs 
1. get route with payload including multiple titles 
2. request keyword-only parsed titles from dialogFlow API
3. run [similarity](https://www.npmjs.com/package/similarity) query on all titles in DB 
  * this might make things faster and may have to take this out
  * investigate using redis add-on in heroku 
4. if not in redis/DB, send batch request to news api
  * investigate and decide on which news api to use
  * if using google news, investigate combining google REST API with news API
  * investigate tagging associated with news.google.com 
5.  grab five articles from each associated title, store URLs as array in redis/DB

###### fetching URLs from DB to provide in modal
1. get route with title of article - or iframe.id 
2. query redis/DB for URLs

#### To Be Determined
1. How to resolve the problem when user clicks on an article that doesn't yet have URLs associated with it
2. How to identify uniquely identify titles OR create ID associating similar titles together 
3. What to maintain in the window (this iFrames dictionary?)
