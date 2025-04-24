fetch("/components/cart.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("cart-container").innerHTML = data;
  })