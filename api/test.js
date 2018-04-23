var _ = require('underscore');
var stopwords = require('./stopwords.json');
// console.log(stopwords.length);
// var articles = [
//         {
//             "name": "Ozy.com",
//             "url": "http://www.ozy.com/acumen/asia-may-soon-eclipse-us-as-worlds-biggest-vc-market/83238",
//             "title": "Asia May Soon Eclipse U.S. as World's Biggest VC Market"
//         },
//         {
//             "name": "Techinasia.com",
//             "url": "https://www.techinasia.com/talk/product-copycats-what-to-do",
//             "title": "My product has a copycat. What should I do? - Tech in Asia"
//         },
//         {
//             "name": "Techinasia.com",
//             "url": "https://www.techinasia.com/startup-exhibitors-tia-singapore-2017-infographic",
//             "title": "What startup exhibitors said about TIA Singapore 2017 (INFOGRAPHIC)"
//         },
//         {
//             "name": "Techinasia.com",
//             "url": "https://www.techinasia.com/startup-exhibitors-tia-singapore-2017-infographic?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed%3A+PennOlson+%28Tech+in+Asia%29",
//             "title": "What startup exhibitors said about TIA Singapore 2017 (INFOGRAPHIC)"
//         },
//         {
//             "name": "Bloomberg",
//             "url": "https://www.bloomberg.com/news/articles/2018-02-27/father-son-startup-shows-how-apps-are-upending-commodity-trading",
//             "title": "This Father-Son Team Is Rewriting the Rules of Commodities Trading"
//         }
//     ];
//
// var foo = _.mapObject(_.groupBy(articles,'title'),(articles,key) => {
// 	return articles[0];
// });
//
// console.log(foo);

// var rake = require('node-rake');
var stdin = process.openStdin();
// var keyword_extractor = require('keyword-extractor');
// var sentiment = require('sentiment');
// console.log('------------------------------------------');
// stdin.addListener("data", function(d){
//   var userString = d.toString().split('|')[0].trim();
//   console.log("user entered: [" + userString + "]");
//   console.log('sentiment analysis on userString: ', sentiment(userString));
//   var keywords = rake.generate(userString, stopwords);
//   console.log('rake produced: \n', keywords);
//   keywords = keyword_extractor.extract(userString, { language:"english", remove_digits: true, return_changed_case:true, remove_duplicates: false });
//   console.log('keyword_extractor produced: \n', keywords);
//   console.log('------------------------------------------');
// });

var retext = require('retext');
var retext_kw = require('retext-keywords');
// var retext_simplify = require('retext-simplify');
var nlcstToString = require('nlcst-to-string');

console.log('------------------------------------------');

var craftQuery = (words) => {
  return words.reduce((acc, word) => {
      console.log('acc: ', acc);
      console.log('word: ', word);
      var test = acc ? `${acc} "${word}"` : `"${word}"`;
      console.log('test: ', test);
      return test;
  });
}

stdin.addListener("data", function(d) {
    var userString = d.toString().split('|')[0].trim();
    console.log("user entered: [" + userString + "]");
    retext().use(retext_kw).process(userString, function(err, file){
      if(err){
        console.error(err);
        return;
      }

      var keywords = file.data.keywords.map( (keyword) => nlcstToString(keyword.matches[0].node) );

      console.log(`keywords (${file.data.keywords.length}): `, keywords);

      console.log();
      var keyphrases = file.data.keyphrases.map((phrase) => phrase.matches[0].nodes.map(nlcstToString).join('').split(' '));

      console.log(`Key-phrases (${file.data.keyphrases.length}): `, keyphrases);

      var query = file.data.keyphrases.length ? craftQuery(keyphrases) : craftQuery(keywords);
      console.log(`query: ${query}`);

    });

    // console.log('sentiment analysis on userString: ', sentiment(userString));
    // var keywords = rake.generate(userString, stopwords);
    // console.log('rake produced: \n', keywords);
    // keywords = keyword_extractor.extract(userString, { language:"english", remove_digits: true, return_changed_case:true, remove_duplicates: false });
    // console.log('keyword_extractor produced: \n', keywords);
    // console.log('------------------------------------------');
})
