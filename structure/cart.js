function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const lista = document.getElementById('lista-carrito');
    const totalCarrito = document.getElementById('totalCarrito');
    lista.innerHTML = '';
    if (carrito.length === 0) {
        lista.innerHTML = `<li class="list-group-item text-center text-muted">No hay productos en el carrito.</li>`;
        totalCarrito.textContent = `$0`;
    } else {
        carrito.forEach((prod, idx) => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `
            <img src="${prod.imagenUrl}" alt="${prod.titulo}" class="imagen-carrito" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px; border-radius: 5px;">
            <span>${prod.titulo} <small class="text-muted">($${prod.precio.toLocaleString()})</small></span>
            <button class="btn btn-sm btn-remove" data-index="${idx}">&times;</button>
            `;
            lista.appendChild(li);
        });

        // Delegación de eventos para eliminar productos uno por uno
        lista.onclick = function(e) {
            if (e.target.classList.contains('btn-remove')) {
                const idx = parseInt(e.target.getAttribute('data-index'));
                carrito.splice(idx, 1);
                localStorage.setItem('carrito', JSON.stringify(carrito));
                mostrarCarrito(); // Esto recarga la lista y el total con el carrito actualizado
            }
        };

        // Calcula el total con el carrito actualizado
        const total = carrito.reduce((sum, prod) => sum + (prod.precio || 0), 0);
        totalCarrito.textContent = `$${total.toLocaleString()}`;
    }
}

function vaciarCarrito() {
    localStorage.removeItem('carrito');
    mostrarCarrito();
}

function realizarCompra() {
    alert('Funcionalidad de compra no implementada.');
}

document.addEventListener('DOMContentLoaded', mostrarCarrito);