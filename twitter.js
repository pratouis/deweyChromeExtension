//These functions don't yet do anything for us. Had to call in order to make pocket code run.
// function addMessageListener(){};
// function sendMessage(){};

// Set up Observer
// Checks for scrolling and new tweets.
const appObserver = new MutationObserver((mutationList) => {
  for (let mutation of mutationList) {
    if(mutation.type === 'childList' &&
      (mutation.target.id === 'page-container' ||
       mutation.target.id === 'stream-items-id' ||
       mutation.target.id === 'permalink-overlay-body')
    ) {
      handleNewItems();
    }
  }
});

// Define Markup
// Code for the info button. Svg is the path to the file containing the icon. Path retrieved from internet.

// Creates a div in HTML containing the info button.
const deweyButton = document.createElement('div')
deweyButton.classList.add(
    'ProfileTweet-action',
    'ProfileTweet-action--stp'
)
deweyButton.innerHTML = `<button class="ProfileTweet-actionButton"
    type="button" data-toggle="modal" data-target="#dialogModal">
    <div class="IconContainer js-tooltip" data-original-title="Is this true?">
        <span class="Icon Icon--medium">
            <svg class="deweyIcon" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
     viewBox="0 0 437.6 437.6" style="enable-background:new 0 0 437.6 437.6;" xml:space="preserve">
              <g>
                  <g>
                      <g>
                          <path d="M194,142.8c0.8,1.6,1.6,3.2,2.4,4.4c0.8,1.2,2,2.4,2.8,3.6c1.2,1.2,2.4,2.4,4,3.6c1.2,0.8,2.8,2,4.8,2.4
                              c1.6,0.8,3.2,1.2,5.2,1.6c2,0.4,3.6,0.4,5.2,0.4c1.6,0,3.6,0,5.2-0.4c1.6-0.4,3.2-0.8,4.4-1.6h0.4c1.6-0.8,3.2-1.6,4.8-2.8
                              c1.2-0.8,2.4-2,3.6-3.2l0.4-0.4c1.2-1.2,2-2.4,2.8-3.6s1.6-2.4,2-4c0-0.4,0-0.4,0.4-0.8c0.8-1.6,1.2-3.6,1.6-5.2
                              c0.4-1.6,0.4-3.6,0.4-5.2s0-3.6-0.4-5.2c-0.4-1.6-0.8-3.2-1.6-5.2c-1.2-2.8-2.8-5.2-4.8-7.2c-0.4-0.4-0.4-0.4-0.8-0.8
                              c-1.2-1.2-2.4-2-4-3.2c-1.6-0.8-2.8-1.6-4.4-2.4c-1.6-0.8-3.2-1.2-4.8-1.6c-2-0.4-3.6-0.4-5.2-0.4c-1.6,0-3.6,0-5.2,0.4
                              c-1.6,0.4-3.2,0.8-4.8,1.6H208c-1.6,0.8-3.2,1.6-4.4,2.4c-1.6,1.2-2.8,2-4,3.2c-1.2,1.2-2.4,2.4-3.2,3.6
                              c-0.8,1.2-1.6,2.8-2.4,4.4c-0.8,1.6-1.2,3.2-1.6,4.8c-0.4,2-0.4,3.6-0.4,5.2c0,1.6,0,3.6,0.4,5.2
                              C192.8,139.6,193.6,141.2,194,142.8z"/>
                          <path d="M249.6,289.2h-9.2v-98c0-5.6-4.4-10.4-10.4-10.4h-42c-5.6,0-10.4,4.4-10.4,10.4v21.6c0,5.6,4.4,10.4,10.4,10.4h8.4v66.4
                              H188c-5.6,0-10.4,4.4-10.4,10.4v21.6c0,5.6,4.4,10.4,10.4,10.4h61.6c5.6,0,10.4-4.4,10.4-10.4V300
                              C260,294,255.2,289.2,249.6,289.2z"/>
                          <path d="M218.8,0C98,0,0,98,0,218.8s98,218.8,218.8,218.8s218.8-98,218.8-218.8S339.6,0,218.8,0z M218.8,408.8
                              c-104.8,0-190-85.2-190-190s85.2-190,190-190s190,85.2,190,190S323.6,408.8,218.8,408.8z"/>
                      </g>
                  </g>
              </g>
            </svg>
        </span>
    </div>
</button>`;

const dialogTry2 = document.createElement('div');
dialogTry2.classList.add(
  'd-flex',
  'justify-content-center'
);
const closeModal = () => (document.getElementById('dialogModal').add('modalHide'));

dialogTry2.innerHTML = `<div class="modalHide" id="dialogModal"
  tabindex="-1" role="dialog" aria-labelledby="deweyModal" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close"
          id="modalCloseButton"
          data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" style="overflow: scroll;" id='dialogModalBody'>
      </div>
    </div>
  </div>
</div>`;


document.getElementById('timeline').prepend(dialogTry2);

// Start and Stop integration
// function resolveCheck(integrate) {
//     if (integrate) return startIntegration()
//     stopIntegration()
// }
//
// function startIntegration() {
//     appObserver.observe(document, {
//       childList: true,
//       attributes: false,
//       characterData: false,
//       subtree: true
//     });
//     handleNewItems();
// }
//
// function stopIntegration() {
//     appObserver.disconnect()
//     const nodeList = document.querySelectorAll('div.ProfileTweet-action--stp')
//     nodeList.forEach(e => e.parentNode.removeChild(e))
// }

// Set Injections
function handleNewItems() {
    const tweetActionLists = document.querySelectorAll('.tweet:not(.DeweyAdded)')
    if (!tweetActionLists.length) return;
    Array.from(tweetActionLists, addDeweyFunctionality)
}

/** Returns bootstrap a-tag list of articlesList
* @param {string} title - title passed from content.js to run query
*/
const createModalBodyHTML = (title) => {
  return new Promise(async (resolve, reject) => {
    try {
      // query backend for associated articles
      let response = await fetch("http://localhost:3000/associated-articles/byTitle?title="+encodeURIComponent(title))
      let { success, error, data } = await response.json();
      if(!success) reject(error);
      if(!data || !!!data.length) reject(`data is empty or null`);

      /* create div bootsrap list-group */
      const articlesList = document.createElement('div');
      articlesList.classList.add('list-group');
      articlesList.innerHTML = data.map(article => (
        `<a href="${article.url}" class="list-group-item list-group-item-action flex-column align-items-start" target="_blank">
            <div class="d-flex w-100 justify-content-between">
              <h4 class="mb-1">${article.title}</h4>
              <small>${new Date(article.publishedAt).toDateString()}</small>
            </div>
            <p class="mb-1">${article.description}</p>
            <small>from ${article.source}</small>
        </a>`)).join('\n');

      resolve(articlesList);
    } catch(e) {
      reject(e);
    }
  })
}

const createModalHeaderHTML = (title) => {
  const articleTitle = document.createElement('h3');
  articleTitle.style.paddingBottom = '10px';
  articleTitle.textContent = title;
  return articleTitle;
}

// Function called in content.js. Finds each element (iframe) to add info button to. Binds to each unique tweet containing iframe.
/** Creates button w eventListener for each iFrame
* @param {Object} element - TODO check this HTML element containing iFrame
* @param {string} title - title passed from content.js to run query
*/
const addDeweyFunctionality = async (element, title) => {
  // clone button HTML
  const buttonClone = deweyButton.cloneNode(true);
  try {
      // TODO: what are the next two lines doing
      const permaLink = element.getAttribute('data-permalink-path')
      const elementId = element.getAttribute('data-item-id')

      const articleTitle = createModalHeaderHTML(title);
      const articles = await createModalBodyHTML(title);

      // on click the button will populate the modal
      buttonClone.addEventListener('click', () => {
        // set title of modal ?
        // TODO this is cutting off right now
        // document.getElementById('dialogModalHeader').textContent = title;
        const dialogBody = document.getElementById('dialogModalBody');

        // remove children of dialogModalBody
        while (dialogBody.firstChild) {
          dialogBody.removeChild(dialogBody.firstChild);
        }
        // dialogBody.append()
        dialogBody.append(articleTitle, articles);
        document.getElementById('dialogModal').classList.remove('modalHide');
      })

      // TODO: what are the next lines doing?
      buttonClone.setAttribute('data-permalink-path', permaLink)
      buttonClone.setAttribute('data-item-id', elementId)
      buttonClone.setAttribute('disabled', false);

      // TODO: what is this doing
      const actionList = element.querySelector('.ProfileTweet-actionList')
      if (actionList) {
        actionList.appendChild(buttonClone)
        element.classList.add('DeweyAdded')
      }

    } catch(e) {
      console.log(`ERROR in addDeweyFunctionality on '${title}': `, e);
      // NOTE on logic: if there is an error, then we shouldn't be able to open dialog
      buttonClone.setAttribute('disabled', true);
      // TODO: set data-original-title to indicate there was an error
      // buttonClone.setAttribute('data-original-title', )
    }
}

window.foobar = 'hi';
// Handle saving
// This code handles saving for pocket. This function should be altered to send title to NLP.
// function handleSave(elementId, permaLink) {
//     sendMessage(
//         null,
//         { action: 'twitterSave', permaLink, elementId },
//         resolveSave
//     )
// }
//
// function resolveSave(data) {
//     const elementId = data.saveObject.elementId
//     const tweet = document.getElementById(`pocketButton-${elementId}`)
//     tweet.classList.add(styles.saved)
// }
//
// function handleAction(action, sender, sendResponse) {
//     if (action.type === 'twitterStop') {
//         stopIntegration()
//     }
//
//     if (action.type === 'twitterStart') {
//         startIntegration()
//     }
// }
//
// addMessageListener(handleAction)
//
// // Do we want twitter integration?
// sendMessage(null, { action: 'twitterCheck' }, resolveCheck)

// Click button leads to chrome extension pop-up with news.
// https://developer.chrome.com/extensions/content_scripts
// chrome.browserAction.onClicked.addListener(function(tab) {
//     chrome.tabs.executeScript(null, {file: "content_script.js"});
//     console.log('does this function work');
// });

// chrome.commands.onCommand.addListener(function(command) {
//   if(command.name == "showcontentdialog") {
//     chrome.tabs.executeScript({ file: "content_script.js" })
//     console.log('is this working');
//   }
// })
