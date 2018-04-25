const addDeweyRedditFunctionality = (element, title) => {
  element.querySelector('.flat-list').append(createRedditDeweyButton());
}

const createRedditDeweyButton = () => {
  const buttonClone = deweyButton.cloneNode(true);
  buttonClone.dataset.dataTarget = "#";
  const listButton = document.createElement('li');
  listButton.classList.add('DeweyAdded');
  listButton.appendChild(buttonClone);
  return listButton;
}
