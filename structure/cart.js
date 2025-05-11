function mostrarCarrito() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const lista = document.getElementById('lista-carrito');
        const totalCarrito = document.getElementById('totalCarrito');
        lista.innerHTML = '';
        let total = 0;
        if (carrito.length === 0) {
            lista.innerHTML = `<li class="list-group-item text-center text-muted">No hay productos en el carrito.</li>`;
        } else {
            carrito.forEach(prod => {
                const li = document.createElement('li');
                li.className = 'list-group-item d-flex justify-content-between align-items-center';
                li.innerHTML = `
                    <span>${prod.titulo} <small class="text-muted">($${prod.precio.toLocaleString()})</small></span>
                `;
                lista.appendChild(li);
                total += prod.precio || 0;
            });
        }
        totalCarrito.textContent = `$${total.toLocaleString()}`;
    }

    function vaciarCarrito() {
        localStorage.removeItem('carrito');
        mostrarCarrito();
    }

    function realizarCompra() {
        alert('Funcionalidad de compra no implementada.');
    }

    document.addEventListener('DOMContentLoaded', mostrarCarrito);