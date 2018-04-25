window.onload = () => {
  console.log('being logged inside twitter_faux_bootstrap');
  const modal = document.getElementById('dialogModal');
  const timeline = document.getElementById('timeline');

  const setModalPosition = () => {
    const right = timeline.getBoundingClientRect().right;
    modal.style.maxWidth = `${window.innerWidth-right-15}px`;
    document.getElementById('dialogModalBody').style.maxHeight = `${window.innerHeight - 130}px`;
    modal.style.left = `${right+8}px`;
    return true;
  }

  setModalPosition();

  window.addEventListener('resize', setModalPosition);

  document.getElementById('modalCloseButton').addEventListener('click', ()=> {
    document.getElementById('dialogModal').classList.add('modalHide');
  });
  
  window.addEventListener('keyup', (e) => {
    if(e.key === 'Escape' || e.code === 'Escape'){
      modal.classList.toggle('modalHide');
    }
  })

}
