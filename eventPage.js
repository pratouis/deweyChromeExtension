// Starts the event listener in the background. Starts when app starts, not only when there is a change to the state.
chrome.storage.sync.get(['options'], (result) => {
    let options
    if (!result.options) {
        options = {TwitterOn: true, RedditOn: true, Subreddits: ["r/news", "r/worldnews", "r/politics"]} //Default options.
        //Could add r/science
        chrome.storage.sync.set({options});
    }
    console.log('Results: ', options);
})
