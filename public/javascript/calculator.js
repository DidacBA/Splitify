
function calculator() {
  const itemPrices = document.querySelectorAll('.item-price');
  const billTotal = document.getElementById('bill-total');
  const userTotal = document.getElementById('user-total');
  const userName = document.getElementById('user-name');

  let globalTotal = 0;
  let partialTotal = 0;

  for (let i = 0; i < itemPrices.length; i++) {
    globalTotal += parseFloat(itemPrices[i].innerHTML);
    if (itemPrices[i].getAttribute('value') === userName.textContent) {
      partialTotal += parseFloat(itemPrices[i].innerHTML);
    }
  }
  billTotal.textContent = globalTotal.toFixed(2);
  userTotal.textContent = partialTotal.toFixed(2);
}

window.addEventListener('load', calculator);
