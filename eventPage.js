// Starts the event listener in the background. Starts when app starts, not only when there is a change to the state.
chrome.storage.sync.get(['options'], (result) => {
    let options
    if (!result.options) {
        options = {TwitterOn: true, RedditOn: true}
        chrome.storage.sync.set({options});
    } else {
        options = result.options
        twitterCheckbox.checked = options.TwitterOn
        redditCheckbox.checked = options.RedditOn
    }
    console.log('Results: ', options);
})
