document.addEventListener("DOMContentLoaded", () => {
    fetch("https://jatprpnjb2.us-east-1.awsapprunner.com/productos/ObtenerProductos")
        .then(response => {
            if (!response.ok) throw new Error("Error al obtener productos");
            return response.json();
        })
        .then(data => {
            const contenedor = document.getElementById("productos-container");
            contenedor.innerHTML = '';

            data.forEach(producto => {
                const card = document.createElement("div");
                card.id = `card-${producto.id}`;
                card.classList.add("card-margin");

                const rutaImagen = producto.imagenUrl;

                card.innerHTML = `
  <div id="card-custom" class="card h-100 custom-card categoria-${producto.categoria} nivel-${producto.nivel} edad-${producto.edadRecomendada}">
       
    <div class="card-img-container">
      <img src="${rutaImagen}" 
           class="imagen-card" 
           alt="${producto.titulo}" 
           onerror="this.src='/assets/images/placeholder.png'">
    </div>
    
    <div class="card-body">
      <h5 class="card-title">${producto.titulo}</h5>
      <h3 class="card-price"><strong>$ ${producto.precio.toLocaleString()}</strong></h3>
      <div class="botones d-flex justify-content-between align-items-center mt-2">
        <a href="#" class="btn-carrito-card">
          <img src="/assets/images/CARRITOBLUET.png" data-id="${producto.id}" class="imagen-carrito" alt="Agregar al carrito">
        </a>
        <a href="/HTML/product_details/producto${producto.id}.html" id="${producto.id}" class="btn-verMas"><strong>Ver más</strong></a>
      </div>
    </div>
  </div>
`;

                contenedor.appendChild(card);
            });

            contenedor.addEventListener("click", function (e) {
                if (e.target.classList.contains("imagen-carrito")) {
                    e.preventDefault();
                    const id = e.target.getAttribute("data-id");
                    const productoSeleccionado = data.find(p => p.id == id);
                    agregarAlCarrito(productoSeleccionado);
                }
            });
        })
        .catch(error => {
            console.error("Error al cargar productos:", error);
        });
});

// variables de selección
let nivelesSeleccionados = [];

// FILTROS
function aplicarFiltros() {
    const edades = [];
    document.querySelectorAll('.filtro-edad:checked').forEach(el => edades.push(el.value));

    const categorias = [];
    document.querySelectorAll('.filtro-categoria:checked').forEach(el => categorias.push(el.value));

    const niveles = nivelesSeleccionados;

    const cards = document.querySelectorAll('#productos-container .card');
    cards.forEach(card => {
        const claseCard = card.classList;

        let coincideEdad = edades.length === 0 || edades.some(edad => claseCard.contains(`edad-${edad}`));
        let coincideCategoria = categorias.length === 0 || categorias.some(cat => claseCard.contains(`categoria-${cat}`));
        let coincideNivel = niveles.length === 0 || niveles.some(niv => claseCard.contains(`nivel-${niv}`));

        card.style.display = (coincideEdad && coincideCategoria && coincideNivel) ? "" : "none";
    });
}

const botonesNivel = document.querySelectorAll('.btn-nivel');
botonesNivel.forEach(btn => {
    btn.addEventListener('click', () => {
        const valor = btn.getAttribute('data-value');
        if (nivelesSeleccionados.includes(valor)) {
            nivelesSeleccionados = nivelesSeleccionados.filter(n => n !== valor);
            btn.classList.remove('activo');
        } else {
            nivelesSeleccionados.push(valor);
            btn.classList.add('activo');
        }
        aplicarFiltros();
    });
});

document.querySelectorAll('.filtro-edad, .filtro-categoria').forEach(input => {
    input.addEventListener('change', aplicarFiltros);
});

// Función para agregar al carrito
function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarVistaCarrito();
    mostrarToast('Producto agregado al carrito');
}

function actualizarVistaCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const total = carrito.reduce((sum, prod) => sum + (prod.precio || 0), 0);
    const totalCarrito = document.getElementById('totalCarrito');
    if (totalCarrito) {
        totalCarrito.textContent = `$${total.toLocaleString()}`;
    }

    const offcanvasBody = document.querySelector('.offcanvas-body');
    if (offcanvasBody) {
        offcanvasBody.innerHTML = '<p>Aqui se mostraran los productos</p>';
        if (carrito.length > 0) {
            const list = document.createElement('ul');
            list.className = 'list-group mb-3';
            carrito.forEach((prod, idx) => {
                const item = document.createElement('li');
                item.className = 'list-group-item d-flex justify-content-between align-items-center';
                item.innerHTML = `
                    <span>${prod.titulo} <small class="text-muted">($${prod.precio.toLocaleString()})</small></span>
                    <button class="btn btn-sm btn-danger btn-remove" data-index="${idx}">&times;</button>
                `;
                list.appendChild(item);
            });
            offcanvasBody.appendChild(list);

            list.addEventListener('click', function (e) {
                if (e.target.classList.contains('btn-remove')) {
                    const idx = e.target.getAttribute('data-index');
                    carrito.splice(idx, 1);
                    localStorage.setItem('carrito', JSON.stringify(carrito));
                    actualizarVistaCarrito();
                }
            });
        }
    }
}

function mostrarToast(mensaje) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast align-items-center border-0 show';
    toast.style.minWidth = '220px';
    toast.style.marginBottom = '10px';
    toast.innerHTML = `
        <div class="toast d-flex">
            <div class="toast-body">${mensaje}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('show');
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 300);
    }, 1500);

    toast.querySelector('.btn-close').onclick = () => toast.remove();
}
