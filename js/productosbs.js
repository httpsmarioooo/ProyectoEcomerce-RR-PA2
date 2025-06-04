document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:8080/productos/ObtenerProductos")
    .then(response => {
      if (!response.ok) throw new Error("Error al obtener productos");
      return response.json();
    })
    .then(data => {
      const contenedor = document.getElementById("productos-container");

      data.forEach(producto => {
        const card = document.createElement("div");
        card.className = "card m-3";
        card.style.width = "18rem";

        card.innerHTML = `
          <img src="/assets/images/product-placeholder.jpg" class="card-img-top" alt="${producto.nombre}">
          <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">Precio: $${producto.precio}</p>
            <p class="card-text">${producto.descripcion || 'Sin descripción'}</p>
            <a href="#" class="btn btn-primary">Agregar al carrito</a>
          </div>
        `;

        contenedor.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Error al cargar productos:", error);
    });
});
