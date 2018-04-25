'use strict';

chrome.storage.sync.get(['options'], (result) => { //Checks the options popup.
    if (!result.options) { //If there are no options checked, app will do nothing.
        return
    } else if (result.options.TwitterOn && window.location.host==='twitter.com') { //If the Twitter button is on, will run the app on Twitter's site.
        const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
        const myiFrames = {};
        let ol = document.getElementById('stream-items-id'); //Tracking the position of the OL to track the scroll.
        const pc = document.getElementById('page-container'); //Tracking page container to track changes in React page.

        const iframeOnLoad = (iframe) => () => { //Waits for iFrames to load. Targets correct iFrame.
            const title = iframe.contentDocument.getElementsByTagName('h2')[0].innerHTML; //To grab title.
            if(!myiFrames[iframe.id]) {
              myiFrames[iframe.id] = iframe;
              // console.log(title);
              const parentTweet = iframe.closest('[data-tweet-id]');
              addDeweyFunctionality(parentTweet, title);
            }
        }

        function processiFrameContainers(listOfiFrameContainers) {
            listOfiFrameContainers.forEach(element => {
              const iframe = element.getElementsByTagName('iframe')[0]; //Looks for iFrames.
              if (!iframe) {
                  const iframeObserver = new MutationObserver(([mutation]) => {
                      const iframe = mutation.addedNodes[0];
                      iframe.onload = iframeOnLoad(iframe);
                      iframeObserver.disconnect(); //Disconnects for speed.
                  })
                  iframeObserver.observe(element, { childList: true });
                  return;
              }
              iframe.onload = iframeOnLoad(iframe);
            })
        }
        const init = () => processiFrameContainers(Array.from(ol.getElementsByClassName('js-macaw-cards-iframe-container'))) //Checks for initial iFrames when a new page is loaded.
        init();

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
        // console.log('fro .m twitter, what are the options: ', result.options);

      } else if (result.options.RedditOn &&
        (result.options.Subreddits.map((subreddit) => `/${subreddit}/`).concat("/").includes(window.location.pathname)) ){ //If the Reddit button is checked, will run on Reddit.
        let links = !!document.querySelector('.thing:not(.promoted)') ?
                    document.querySelectorAll('.thing:not(.promoted)') :
                    document.querySelectorAll('.scrollerItem:not(.promoted)');
        const printKeywords = async (redditLink) => {
          let text = redditLink.querySelector('a.title').textContent;
          let response = await fetch("//glacial-peak-84659.herokuapp.com/associated-articles/redditTexts?title="+encodeURIComponent(text))
          const { title, keywords } = await response.json();
          const joined_kw = keywords.reduce((acc, word) => (acc ? `${acc} "${word}"` : `"${word}"`), "");
          console.log(`keywords: ${joined_kw}`);
        }

        links.forEach((redditLink) => {
          if(window.location.pathname === "/"){
            const subreddit = redditLink.querySelector('.subreddit').textContent.toLowerCase();
            if(result.options.Subreddits.includes(subreddit)) {
              console.log(`subreddit: ${subreddit}`);
              printKeywords(redditLink);
              addDeweyRedditFunctionality(redditLink, "foo");
            }
          }else{
            printKeywords(redditLink);
            addDeweyRedditFunctionality(redditLink, "foo");

          }
        })
        // if(window.location.pathname === "/"){
        //   links.forEach((redditLink) => {
        //     const subreddit = redditLink.querySelector('.subreddit').textContent.toLowerCase();
        //     if(result.options.Subreddits.includes(subreddit)){
        //       console.log(`subreddit: ${subreddit}`);
        //       printKeywords(redditLink);
        //     }
        //   })
        // }else{
        //   // check for subreddits if home page
        //   // otherwise do for all links
        //   links.forEach((redditLink) => printKeywords(redditLink));
        // }



        // console.log(redditTexts);
      } else {
        console.log('result: ', result.options);
        var temp = result.options.Subreddits.map((subreddit) => `/${subreddit}/`).concat("/");
        console.log('possible options: ', temp);
        console.log(temp.includes(window.location.pathname));
        console.log('pathname: ', window.location.pathname);
      }
})

console.log('foobar ');
