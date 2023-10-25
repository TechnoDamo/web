function calculate() {
    var quantity = parseFloat(document.getElementById("quantity").value);
    var product = parseFloat(document.getElementById("product").value);
    var totalCost = quantity * product;
    document.getElementById("result").innerHTML = totalCost;
  }
