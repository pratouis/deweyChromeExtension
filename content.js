'use strict';

//We have a big problem. Our app only works on scroll. Doesn't work on initial links. Also only seems to work on home page. 

const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
const myiFrames = {};

const iframeOnLoad = (iframe) => () => { //Waits for iFrames to load. Targets correct iFrame.
    const title = iframe.contentDocument.getElementsByTagName('h2')[0].innerHTML; //To grab title.
    if(!myiFrames[iframe.id]) {
      myiFrames[iframe.id] = iframe;
      console.log(title);
      // console.log(myiFrames)
    }
}
const observer = new MutationObserver((mutations, observer) => { //Observes mutations in HTML while scrolling.
  
  for (var i = 0; i < mutations.length; i++) {
      const mutation = mutations[i];
    if (mutation.type === 'childList') {
        const listOfiFrameContainers = Array.from(mutation.addedNodes).map(node => node.getElementsByClassName('js-macaw-cards-iframe-container')[0]).filter(Boolean);
        // console.log('listOfiFrameContainers: ', listOfiFrameContainers)
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
  }
  document.querySelectorAll('[data-tweet-id]').forEach(el => addPocketFunctionality(el))
  console.log('here123');
});

// Register the element root you want to look for changes
observer.observe(document.getElementById('stream-items-id'), {
  childList: true
});
