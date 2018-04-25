// Starts the event listener in the background. Starts when app starts, not only when there is a change to the state.
window.onload = () => {
  chrome.storage.sync.get(['options'], (result) => {
    let options
    if (!result.options) {
      options = {TwitterOn: true, RedditOn: true, Subreddits: ["/r/news/", "/r/worldnews/", "/r/politics/"]} //Default options.
      //Could add r/science
      chrome.storage.sync.set({options});
    }
    // console.log('Results: ', options);
  })
  // const twitterRegExp = RegExp(/(twitter)/g);
  // const redditRegExp = RegExp(/(reddit)/g);
  // if(twitterRegExp.test(window.location.host)){
  //   const modal = document.getElementById('dialogModal');
  //   const timeline = document.getElementById('timeline');
  //
  //   const setModalPosition = () => {
  //     const right = timeline.getBoundingClientRect().right;
  //     modal.style.maxWidth = `${window.innerWidth-right-15}px`;
  //     document.getElementById('dialogModalBody').style.maxHeight = `${window.innerHeight - 130}px`;
  //     modal.style.left = `${right+8}px`;
  //     return true;
  //   }
  //
  //   setModalPosition();
  //
  //   window.addEventListener('resize', setModalPosition);
  //
  //   document.getElementById('modalCloseButton').addEventListener('click', ()=> {
  //     document.getElementById('dialogModal').classList.add('modalHide');
  //   });
  //
  //   window.addEventListener('keyup', (e) => {
  //     if(e.key === 'Escape' || e.code === 'Escape'){
  //       modal.classList.toggle('modalHide');
  //     }
  //   });
  // }
}
