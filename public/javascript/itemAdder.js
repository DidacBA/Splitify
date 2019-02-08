const buttons = document.querySelectorAll('.item-adder');
const billInformation = document.getElementById('billInformation');
const names = document.querySelectorAll('.name-field');
const prices = document.querySelectorAll('.price-field');
const html = `<div class="item-input">
<input type="text" name="name" placeholder="Item">
<input type="number" name="price" placeholder="€">
</div>`;

const billContents = {};

buttons.forEach((button, index) => {
  const userName = button.getAttribute('id');
  billContents[userName] = [];
  button.addEventListener('click', () => {
    const inputs = button.previousElementSibling;
    console.log(inputs.querySelectorAll('input'));
    button.previousElementSibling.insertAdjacentHTML('afterend', html);
  });
});
