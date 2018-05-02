## Dewey
<img src="/readmeimages/twittergeneral.gif">

<img src="/readmeimages/redditgeneral.gif">

### How to install
1. Clone the repo. Otherwise download the .zip and unzip it. Also make sure your Google Chrome browser is up to date. 

2. Go to ```chrome://extensions```. 

3. On the top right of the page, enable developer mode. 

<img src="/readmeimages/developermode.jpg" width="216px">

4. Click load unpacked. In the prompt, navigate to where you installed the repo folder. 

<img src="/readmeimages/loadunpacked.jpg" width="50%">

5. If successful, you should see this on your page:

<img src="/readmeimages/success.jpg" width="50%">

   If you see this, your installation is complete! 

### How to set up
1. Click on the Dewey icon on your Chrome toolbar. 

![toolbar](/readmeimages/toolbar.jpg)

2. You should see a register page. First thing you should do is getting a [News API](https://newsapi.org/) key. Put in any username
and password along with your new API Key. Click register. 

![register](/readmeimages/register.jpg)

   If you cannot register, try using another username password combination. 

3. Now you should see the options. For 'Allow Twitter' and 'Allow Reddit', we will go over that in the Features.
Here you can change your News API key and log out. 

![options](/readmeimages/options.jpg)

### Features

#### Twitter
1. Clicking on the slider allows you to enable or disable the app's functionality on Twitter. 

2. Upon visiting your Twitter page, you should see an icon like this on some of your posts. 

![twittericon](/readmeimages/twittericon.jpg)

3. Clicking on this icon will create a modal on the right-hand side with articles and information that pertain to the same story,
   but from different sources. Up to five articles will be returned, and you can scroll around in the modal to view them. 
   
![twittermodal](/readmeimages/twittermodal.jpg)
   
4. To close the modal, click the x on the top right corner of the modal or press the esc key. 

#### Reddit
1. Clicking on the slider allows you to enable or disable the app's functionality on Reddit. 

2. Clicking the chevron to the right of the slider pulls up the list of subreddits on which the app will run. 
   r/news, r/worldnews, and r/politics are added by default. 
   
![checkedsubreddits](/readmeimages/checkedsubreddits.jpg)
   
   Type in the name of any subreddit and the app will run on that subreddit while adding it to the list. 
   
3. To remove the subreddit, just click the x next to its name. 

![checkedsubredditscancel](/readmeimages/checkedsubredditscancel.jpg)

4. This app works two ways on Reddit.

-- On the Reddit front page, it will look for links posted on a subreddit that you allowed. 

![redditfrontpage](/readmeimages/redditfrontpage.jpg)

-- On a page of a subreddit you enabled, it will look at all of the page's links.

![subreddit](/readmeimages/subreddit.jpg)

5. In both instances, licking on the Dewey icon will drop down a list of articles that you can click to find out more information about    the relevant news story. Up to five articles will be returned. 

![subredditdropdown](/readmeimages/subredditdropdown.jpg)   
   
6. To close the modal, click the Dewey icon again. 

### The Technology

### Todos
1. Fix the bug that starts Twitter with a black screen. If that's the case, press the esc key to close it. 
2. Only stash user's token on the chrome storage. 
3. Find more modular solution to NPL package. 
4. Fix issue with login info not persisting. 

