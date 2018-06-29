// Not in manifest.json. Code moved to twitter.js in the AddPocketFunctionality function.
// This code opens a modal.

const dialog = document.createElement("dialog")
	dialog.textContent = "This is a dialog"
const button = document.createElement("button")
	button.textContent = "Close"

dialog.appendChild(button);

button.addEventListener("click", () => dialog.close());

document.body.appendChild(dialog);

dialog.showModal();
