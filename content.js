'use strict';

//We have a big problem. Our app only works on scroll. Doesn't work on initial links. Also only seems to work on home page.
const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
const myiFrames = {};
let ol = document.getElementById('stream-items-id'); //Tracking the position of the OL to track the scroll.
const pc = document.getElementById('page-container'); //Tracking page container to track changes in React page.


const iframeOnLoad = (iframe) => () => { //Waits for iFrames to load. Targets correct iFrame.
    const title = iframe.contentDocument.getElementsByTagName('h2')[0].innerHTML; //To grab title.
    if(!myiFrames[iframe.id]) {
      myiFrames[iframe.id] = iframe;
      console.log(title);
    }
    const parentTweet = iframe.closest('[data-tweet-id]');
    fetch("http://localhost:3000/associated-articles?title="+encodeURIComponent(title), { method: 'POST' })
    .then(response => response.json())
    .then(({success, error}) => {
      if(!success) throw error;
      addDeweyFunctionality(parentTweet, title);
    })
    .catch(e => console.log('error from iFrameOnLoad: ', e))
}

function processiFrameContainers(listOfiFrameContainers) {
    listOfiFrameContainers.forEach(thing => {
      const iframe = thing.getElementsByTagName('iframe')[0]; //Looks for iFrames.
      if (!iframe) {
          const iframeObserver = new MutationObserver(([mutation]) => {
              const iframe = mutation.addedNodes[0];
              iframe.onload = iframeOnLoad(iframe);
              iframeObserver.disconnect(); //Disconnects for speed.
          })
          iframeObserver.observe(thing, { childList: true });
          return;
      }
      iframe.onload = iframeOnLoad(iframe);
    })
}
const init = () => processiFrameContainers(Array.from(ol.getElementsByClassName('js-macaw-cards-iframe-container'))); //Checks for initial iFrames when a new page is loaded.
init();

const observer = new MutationObserver((mutations, observer) => { //Observes mutations in HTML while scrolling.

  for (var i = 0; i < mutations.length; i++) {
      const mutation = mutations[i];
    if (mutation.type === 'childList') {
        const listOfiFrameContainers = Array.from(mutation.addedNodes).map(node => node.getElementsByClassName('js-macaw-cards-iframe-container')[0]).filter(Boolean);
        // console.log('listOfiFrameContainers: ', listOfiFrameContainers)
        processiFrameContainers(listOfiFrameContainers)
    }
  }
  // console.log(myiFrames);
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


// fetch("http://localhost:3000/associated-articles/byTitle?title="+encodeURIComponent("Tech in Asia - Connecting Asia's startup ecosystem")).then(response => response.json()).then(console.log)
