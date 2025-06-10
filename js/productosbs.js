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
                console.log("imagenUrl:", producto.imagenUrl);
                const card = document.createElement("div");
                card.id = `card-${producto.id}`;
                ard.style.marginTop = "8px";
                card.style.marginBottom = "8px";

                // Usar los nombres de propiedades correctos según tu backend
                card.innerHTML = `
            <div id="card-custom" class="card categoria-${producto.categoria} nivel-${producto.nivel} edad-${producto.edad}" > 
                <img src="${producto.imagen}" class="imagen-card" alt="${producto.titulo}">
                <div class="card-body">
                    <h5 class="card-title"><strong>${producto.titulo}</h5>
                    <h3 class="card-price">$ ${producto.precio.toLocaleString()}</h3>
                    <div class="botones">
                        <a href="/HTML/product_details/producto${producto.id}.html"id="${producto.id}" class="btn-verMas">VER MÁS</a>
                        <a href="#" class="btn-carrito-card"><img src="../assets/images/CARRITOBLUET2.png"  data-id="${producto.id}"class="imagen-carrito" alt="BlueT.Carrito"></a>
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
    // Def const y obtener valores
    const edades = [];
    document.querySelectorAll('.filtro-edad:checked').forEach(el => {
        edades.push(el.value);
    });

    const categorias = [];
    document.querySelectorAll('.filtro-categoria:checked').forEach(el => {
        categorias.push(el.value);
    });

    const niveles = nivelesSeleccionados; // array niveles

    // Escanear o recorrer cards
    const cards = document.querySelectorAll('#productos-container .card');
    cards.forEach(card => {
        const claseCard = card.classList;

        // Verificar filtros activados
        let coincideEdad = (edades.length === 0);
        edades.forEach(edad => {
            if (claseCard.contains(`edad-${edad}`)) {
                coincideEdad = true;
            }
        });

        let coincideCategoria = (categorias.length === 0);
        categorias.forEach(cat => {
            if (claseCard.contains(`categoria-${cat}`)) {
                coincideCategoria = true;
            }
        });

        let coincideNivel = (niveles.length === 0);
        niveles.forEach(niv => {
            if (claseCard.contains(`nivel-${niv}`)) {
                coincideNivel = true;
            }
        });

        // Mostrar o no según filtro
        if (coincideEdad && coincideCategoria && coincideNivel) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
}

// Filtro Nivel TEA 2
const botonesNivel = document.querySelectorAll('.btn-nivel');
botonesNivel.forEach(btn => {
    btn.addEventListener('click', () => {
        const valor = btn.getAttribute('data-value');

        if (nivelesSeleccionados.includes(valor)) {
            // Quitar selección
            nivelesSeleccionados = nivelesSeleccionados.filter(n => n !== valor);
            btn.classList.remove('activo');
        } else {
            // Agregar selección
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


// Actualiza la vista del carrito (ejemplo simple)
function actualizarVistaCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const total = carrito.reduce((sum, prod) => sum + (prod.precio || 0), 0);
    const totalCarrito = document.getElementById('totalCarrito');
    if (totalCarrito) {
        totalCarrito.textContent = `$${total.toLocaleString()}`;
    }

    // Mostrar productos en el carrito
    const offcanvasBody = document.querySelector('.offcanvas-body');
    if (offcanvasBody) {
        // Limpiar contenido anterior, excepto el primer <p>
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

            // Evento para eliminar productos del carrito
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
            <div class="toast-body">
                ${mensaje}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    container.appendChild(toast);

    // Quitar el toast después de 2.5 segundos
    setTimeout(() => {
        toast.classList.remove('show');
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 300);
    }, 1500);

    // Cerrar manualmente
    toast.querySelector('.btn-close').onclick = () => toast.remove();
}