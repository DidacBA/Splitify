
function debt() {
  const userTotal = document.getElementById('user-total');

  let partialTotal = 0;

  for (let i = 0; i < itemPrices.length; i++) {
    if (itemPrices[i].getAttribute('value') === userName.textContent) {
      partialTotal += parseFloat(itemPrices[i].innerHTML);
    }
  }
  userTotal.textContent = partialTotal;
}

window.addEventListener('load', debt);
