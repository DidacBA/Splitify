const deleteButton = document.getElementById('delete');
const realDelete = document.getElementById('real-delete');
const text = document.getElementById('text');
const noDelete = document.getElementById('noDelete');

deleteButton.addEventListener('click', () => {
  realDelete.setAttribute('type', 'submit');
  text.removeAttribute('hidden');
  deleteButton.setAttribute('type', 'hidden');
  noDelete.setAttribute('type', 'submit');
});

noDelete.addEventListener('click', () => {
  realDelete.setAttribute('type', 'hidden');
  text.hidden = true;
  deleteButton.setAttribute('type', 'submit');
  noDelete.setAttribute('type', 'hidden');
});
