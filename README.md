## Dewey
### How to install
1. Clone the repo. Otherwise download the .zip and unzip it.

2. Go to ```chrome://extensions```. 

3. On the top right of the page, enable developer mode. 

4. Click load unpacked. In the prompt, navigate to where you installed the repo folder. 

5. If successful, you should see this on your page:

If you see this, your installation is complete! 

### How to set up
1. Click on the Dewey icon on your Chrome toolbar. 

2. You should see a register page. First thing you should do is getting a [News API](https://newsapi.org/) key. Put in any username
and password along with your new API Key. Click register. 

3. Now you should see the options. For 'Allow Twitter' and 'Allow Reddit', we will go over that in the Features.
Here you can change your News API key and log out. 

### Features

#### Twitter
1. Clicking on the slider allows you to enable or disable the app's functionality on Twitter. 

2. Upon visiting your Twitter page, you should see an icon like this on some of your posts. 

3. Clicking on this icon will create a modal on the right-hand side with articles and information that pertain to the same story,
   but from different sources. Up to five articles will be returned, and you can scroll around in the modal to view them. 
   
4. To close the modal, click the x on the top right corner of the modal or press the esc key. 

#### Reddit
1. Clicking on the slider allows you to enable or disable the app's functionality on Reddit. 

2. Clicking the chevron to the right of the slider pulls up the list of subreddits on which the app will run. 
   r/news, r/worldnews, and r/politics are added by default. 
   Type in the name of any subreddit and the app will run on that subreddit while adding it to the list. 
   
3. To remove the subreddit, just click the x next to its name. 

4. This app works two ways on Reddit.

-- On the Reddit front page, it will look for links posted on a subreddit that you allowed. 

-- On a page of a subreddit you enabled, it will look at all of the page's links.

5. Clicking on the Dewey icon will drop down a list of articles that you can click to find out more information about the relevant
   news story. Up to five articles will be returned. 
   
6. To close the modal, click the Dewey icon again. 

### The Technology

### Todos
1. Fix the bug that starts Twitter with a black screen. If that's the case, press the esc key to close it. 
2. Only stash user's token on the chrome storage. 
3. Find more modular solution to NPL package. 
