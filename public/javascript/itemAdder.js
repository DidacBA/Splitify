
const button = document.getElementById('item-adder');
const container = document.getElementById('item-container');

button.addEventListener('click', () => {
  console.log('clicked');
  container.insertAdjacentHTML('beforebegin', html);
});
