var _ = require('underscore');

var articles = [
        {
            "name": "Ozy.com",
            "url": "http://www.ozy.com/acumen/asia-may-soon-eclipse-us-as-worlds-biggest-vc-market/83238",
            "title": "Asia May Soon Eclipse U.S. as World's Biggest VC Market"
        },
        {
            "name": "Techinasia.com",
            "url": "https://www.techinasia.com/talk/product-copycats-what-to-do",
            "title": "My product has a copycat. What should I do? - Tech in Asia"
        },
        {
            "name": "Techinasia.com",
            "url": "https://www.techinasia.com/startup-exhibitors-tia-singapore-2017-infographic",
            "title": "What startup exhibitors said about TIA Singapore 2017 (INFOGRAPHIC)"
        },
        {
            "name": "Techinasia.com",
            "url": "https://www.techinasia.com/startup-exhibitors-tia-singapore-2017-infographic?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed%3A+PennOlson+%28Tech+in+Asia%29",
            "title": "What startup exhibitors said about TIA Singapore 2017 (INFOGRAPHIC)"
        },
        {
            "name": "Bloomberg",
            "url": "https://www.bloomberg.com/news/articles/2018-02-27/father-son-startup-shows-how-apps-are-upending-commodity-trading",
            "title": "This Father-Son Team Is Rewriting the Rules of Commodities Trading"
        }
    ];

var foo = _.mapObject(_.groupBy(articles,'title'),(articles,key) => {
	return articles[0];
});

console.log(foo);

