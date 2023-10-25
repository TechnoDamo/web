function calculate() {
    const quantity = parseFloat(document.getElementById("quantity").value);
    const product = parseFloat(document.getElementById("product").value);
    const totalCost = quantity * product;
    document.getElementById("result").innerHTML = `Стоимость заказа: ${totalCost}`;
  }
