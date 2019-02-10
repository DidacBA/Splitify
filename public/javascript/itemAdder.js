const itemAdder = document.getElementById('item-adder');
const container = document.getElementById('items-list-container');

const html = `<input type="text" name="name" Placeholder="Item"> 
<input type="number" step="0.01" name="price" Placeholder="€">`;

itemAdder.addEventListener('click', () => {
  const div = document.createElement('div');
  div.setAttribute('class', 'item-container');
  div.innerHTML = html;
  container.appendChild(div);
});
