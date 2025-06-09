document.querySelector('.order-button').addEventListener('click', () => {
  const quantity = document.getElementById('info').value;
  const instructions = document.getElementById('cooking instructions').value;
  const pizzaName = document.querySelector('.pizza-title').innerText;

  if (!quantity || quantity <= 0) {
    alert('Please enter a valid quantity.');
    return;
  }

  const orderData = {
    pizzaName,
    quantity,
    instructions: instructions || 'None'
  };

  localStorage.setItem('orderData', JSON.stringify(orderData));
  window.open('invoice.html', '_blank');
});
