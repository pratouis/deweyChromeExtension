const twitterCheckbox = document.getElementById('twitter')
const redditCheckbox = document.getElementById('reddit')
let options
chrome.storage.sync.get(['options'], (result) => {
    if (!result.options) {
        options = {TwitterOn: true, RedditOn: true}
        chrome.storage.sync.set({options}, () => {

        })
    } else {
        options = result.options
        twitterCheckbox.checked = options.TwitterOn
        redditCheckbox.checked = options.RedditOn
    }
    console.log('Results: ', options);
})

twitterCheckbox.addEventListener('change', e => {
    chrome.storage.sync.set({options: {...options, TwitterOn: e.target.checked}}, () => {
        console.log('Set Twitter to:', e.target.checked);
    })
})

redditCheckbox.addEventListener('change', e => {
    chrome.storage.sync.set({options: {...options, RedditOn: e.target.checked}}, () => {
        console.log('Set Reddit to: ', e.target.checked);
    })
})



// Saves options to chrome.storage.sync.
// function save_options() {
//   var color = document.getElementById('color').value;
//   var likesColor = document.getElementById('like').checked;
//   chrome.storage.sync.set({
//     favoriteColor: color,
//     likesColor: likesColor
//   }, function() {
//     // Update status to let user know options were saved.
//     var status = document.getElementById('status');
//     status.textContent = 'Options saved.';
//     setTimeout(function() {
//       status.textContent = '';
//     }, 750);
//   });
// }
//
// // Restores select box and checkbox state using the preferences
// // stored in chrome.storage.
// function restore_options() {
//   // Use default value color = 'red' and likesColor = true.
//   chrome.storage.sync.get({
//     favoriteColor: 'red',
//     likesColor: true
//   }, function(items) {
//     document.getElementById('color').value = items.favoriteColor;
//     document.getElementById('like').checked = items.likesColor;
//   });
// }
// document.addEventListener('DOMContentLoaded', restore_options);
// document.getElementById('save').addEventListener('click',
//     save_options);
//
// //collapse
// var coll = document.getElementsByClassName("collapsible");
// var i;
