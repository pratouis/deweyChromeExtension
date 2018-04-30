'use strict';

window.onload = () => {
  chrome.storage.sync.get(['options'], (result) => { //Checks the options popup.
      if (!result.options) { //If there are no options checked, app will do nothing.
          return;
      } else if (result.options.TwitterOn && window.location.host==='twitter.com') { //If the Twitter button is on, will run the app on Twitter's site.
          console.log('is this extension still running on twitter');
          const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
          let ol = document.getElementById('stream-items-id'); //Tracking the position of the OL to track the scroll.
          const pc = document.getElementById('page-container'); //Tracking page container to track changes in React page.
          init();
          setModalPosition();

          window.addEventListener('resize', setModalPosition);
          document.getElementById('modalCloseButton').addEventListener('click', ()=> {
            document.getElementById('dialogModal').classList.add('modalHide');
          });
          window.addEventListener('keyup', (e) => {
            if(e.key === 'Escape' || e.code === 'Escape'){
              document.getElementById('dialogModal').classList.add('modalHide');
            }
          })


          const observer = new MutationObserver((mutations, observer) => { //Observes mutations in HTML while scrolling.
            for (var i = 0; i < mutations.length; i++) {
                const mutation = mutations[i];
              if (mutation.type === 'childList') {
                  const listOfiFrameContainers = Array.from(mutation.addedNodes).map(node => node.getElementsByClassName('js-macaw-cards-iframe-container')[0]).filter(Boolean);
                  processiFrameContainers(listOfiFrameContainers)
              }
            }
          });

          // Register the element root you want to look for changes
          observer.observe(ol, {
            childList: true
          });

          //Checks for change in page. Twitter is a single page app so we're checking for mutations in the div that contains the Tweets.
          const pcChangeObserver = new MutationObserver(mutations => {
            ol = document.getElementById('stream-items-id'); //ol is the ordered list of Tweets.
            observer.disconnect();
            observer.observe(ol, {
              childList: true
            });
            init();
          })

          pcChangeObserver.observe(pc, { childList: true, attributes: true })

        } else if (result.options.RedditOn &&
          (result.options.Subreddits.map((subreddit) => `/${subreddit}/`).concat("/").includes(window.location.pathname)) ){ //If the Reddit button is checked, will run on Reddit.

          // fetch links depending on whether user is lookign at old or new reddit
          let links = !!document.querySelector('.link:not(.promoted)') ?
                      document.querySelectorAll('.link:not(.promoted)') :
                      document.querySelectorAll('.scrollerItem:not(.promoted)');
          links.forEach((redditLink) => {
            const title = redditLink.querySelector('a.title').textContent;
            // only check articles tagged with users selected reddits
            if(window.location.pathname === "/"){
              const subreddit = redditLink.querySelector('.subreddit').textContent.toLowerCase();
              if(result.options.Subreddits.includes(subreddit)) {
                addDeweyRedditFunctionality(redditLink, title);
              }
            }else{
              addDeweyRedditFunctionality(redditLink, title);
            }
          })
        }
  })
}
// fetch("//glacial-peak-84659.herokuapp.com/register/foo/bar/b4cff8cfe5b847d1b1d6b9460d48341e", {
// method: "GET"
// }).then((response) => response.json()).then(console.log)
// fetch("https://glacial-peak-84659.herokuapp.com/updateNewsApi/889e1b52b3e6fd951d9e04f2f61f0fff/b4cff8cfe5b847d1b1d6b9460d48341e", {
// method: "GET"
// }).then((response) => response.json()).then(console.log)
//
// fetch("https://glacial-peak-84659.herokuapp.com/login/foo/bar", {
// method: "GET"
// }).then((response) => response.json()).then(console.log)
