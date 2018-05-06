## Dewey
<img src="/readmeimages/twittergeneral.gif">


<img src="/readmeimages/redditgeneral.gif">

### Why Dewey?
In the past few years, we've experienced two shifts in peoples' relationship with media. The first is that more and more people are getting their information from social media platforms. The second is that media institutions have been systematically de-legimitized, pushing the conceptions of reality and truth. The goal of the application is to create a simple to use educational tool that helps users contextualize the information they see every day. We seek to promote critical thinking, media literacy, and basic research, all without having to leave the platform browser. By shifting the responsibility of truth to the reader, the social media platform no longer needs to divert resources into censoring their own platform and the media institutions can shift focus from defending their organization to more in-depth journalism. 

### How to install
1. Clone the repo. Otherwise download the .zip and unzip it. Also make sure your Google Chrome browser is up to date. 

2. Go to ```chrome://extensions```. 

3. On the top right of the page, enable developer mode. 

<img src="/readmeimages/developermode.jpg" width="108px">

4. Click load unpacked. In the prompt, navigate to where you installed the repo folder. 

<img src="/readmeimages/loadunpacked.jpg" width="260px">

5. If successful, you should see this on your page:

<img src="/readmeimages/success.jpg" width="257px">

   If you see this, your installation is complete! 

### How to set up
1. Click on the Dewey icon on your Chrome toolbar. 

<img src="/readmeimages/toolbar.jpg" width="87px">

2. You should see a register page. First thing you should do is getting a [News API](https://newsapi.org/) key. Put in any username
and password along with your new API Key. Click register. 

<img src="/readmeimages/register.jpg" width="187px">


   If you cannot register, try using another username password combination. 

3. Now you should see the options. For 'Allow Twitter' and 'Allow Reddit', we will go over that in the Features.
Here you can change your News API key and log out. 

<img src="/readmeimages/options.jpg" width="186px">

### Features

#### Twitter
1. Clicking on the slider allows you to enable or disable the app's functionality on Twitter. 

2. Upon visiting your Twitter page, you should see an icon like this on some of your posts. 

<img src="/readmeimages/twittericon.jpg" width="405px">

3. Clicking on this icon will create a modal on the right-hand side with articles and information that pertain to the same story,
   but from different sources. Up to five articles will be returned, and you can scroll around in the modal to view them. 

<img src="/readmeimages/twittermodal.jpg" width="260px">
   
4. To close the modal, click the x on the top right corner of the modal or press the esc key. 

#### Reddit
1. Clicking on the slider allows you to enable or disable the app's functionality on Reddit. 

2. Clicking the chevron to the right of the slider pulls up the list of subreddits on which the app will run. 
   r/news, r/worldnews, and r/politics are added by default. 
   
<img src="/readmeimages/checkedsubreddits.jpg" width="185px">   
   
   Type in the name of any subreddit and the app will run on that subreddit while adding it to the list. 
   
3. To remove the subreddit, just click the x next to its name. 

<img src="/readmeimages/checkedsubredditscancel.jpg" width="185px">

4. This app works two ways on Reddit.

-- On the Reddit front page, it will look for links posted on a subreddit that you allowed. 

<img src="/readmeimages/redditfrontpage.jpg" width="578px">

-- On a page of a subreddit you enabled, it will look at all of the page's links.

<img src="/readmeimages/subreddit.jpg" width="544px">

5. In both instances, licking on the Dewey icon will drop down a list of articles that you can click to find out more information about    the relevant news story. Up to five articles will be returned.

<img src="/readmeimages/subredditdropdown.jpg" width="516px">
   
6. To close the modal, click the Dewey icon again. 

### The Technology
1. First, the user is required to sign up for a News API key. The pop-up was created with Bootstrap and JQuery. The user must register for a News API key which will be used later and is stored in the Google Chrome Extension storage, encrypted by a salt token created by the username and password. The user's information is held in a postgres database. 

2. The options to enable/disable the application on Twitter and/or Reddit (with subreddits) are also saved on the chrome storage. These enable or disable the javascript to run on the respective pages. 

3. You can modify whether or not Dewey will work with Twitter or Reddit/subreddits. Eventually we might implement any changes to the options without requiring a refresh of the respective page. 

-- If Twitter is enabled, we scrape the DOM for all h2 headers inside iFrame containers to get all article headlines. Most articles that are shared on Twitter are posted in the iFrame format. This was the method we found to most consistently find article titles on Twitter. Although effective, this method has two flaws. First, it often picks up advertisements which sometimes uses iFrames. Second, it misses some articles posted that do not use iFrames. As Twitter's desktop page is a single-page application, we have mutation obervers to check for new headlines upon each scroll as well as page redirections. The headlines are then sent back to the backend. 

--If Reddit is enabled, it will have two functionalities. The first is scraping the Reddit front page (no subreddit) to look for posts posted in enabled subreddits. It will take headlines from the same div element and send them to the backend. If you are on a subreddit page, it will take all headlines and send them to the backend. 

4. The headlines are first read through a natural language processing package called Retext in close conjunction with retext-keywords and nlcst-to-string packages to pull keywords from article headlines. These keywords are then stored in our postgres database. We want to create our own NLP eventually to have more modularity and objectivity in reading through headlines. 

5. If the database entry has only keywords and no article link associated, then we input the keywords into the News API to return 5 articles with their title, publisher, author, description, and image link. If any of these are not present, then we do not display them. If there are no articles returned from the keywords, we do not display the Dewey button. Otherwise we send the all the information back to the front end.

6. For scalability, if someone else has seen the exact article as you have before, the database is already populated so we do not need to expend a News API call to look up the articles again. This speeds up the process the more users Dewey has and relieves News API from a bombardment of calls. Each entry lasts for 24 hours in the database. 

7. We wanted to create as seamless and native of an experience possible using Dewey on the two platforms it works on.

-- On Twitter, we created a modal that displays on the right of the main feed that pops up when the Dewey button is pressed. As it takes up negative space inherent in Twitter's display, it does not block other posts or advertisements. The modal was created through Bootstrap. It can be scrolled through to see the articles that were returned from the database. Each entry is a link. 

-- On Reddit, we decided to mimic the button that opens up images and text posts within the same page. This is a recognizable feature with Reddit users and again does not block other posts or advertisements. When the Dewey button is clicked, an element expands below the post that provides the information returned from the database. 


### Todos
1. Fix the bug that starts Twitter with a black screen. If that's the case, press the esc key to close it. 
2. Only stash user's token on the chrome storage. 
3. Find more modular solution to NPL package. 
4. Fix issue with login info not persisting. 
5. Have the options/register pop-up pop up upon first-time installation. 
6. Optimization. Speed up button appearance. 

