//Crear Card
document.addEventListener('DOMContentLoaded', function () {
    fetch('productos.json')
        .then(response => response.json())
        .then(productos => {
            const container = document.getElementById('productos-container');//ID contenedor productos---//& Verificar

            productos.forEach(producto => {
                const card = document.createElement('div');
                card.id = `card-${producto.id}`; // Id de producto
                card.className = 'col-12 col-sm-6 col-md-4 d-flex justify-content-center p-0';
                card.innerHTML = `
                <div class="card h-100 custom-card categoria-${producto.categoria} nivel-${producto.nivel} edad-${producto.edad}">
                        <img src="${producto.imagen}" class="imagen-card" alt="${producto.titulo}">
                        <div class="card-body">
                            <h5 class="card-title"><strong>${producto.titulo}</strong></h5>
                            <h3 class="card-price">$ ${producto.precio.toLocaleString()}</h3>
                            <button class="btn bt-productos"><strong>Comprar</strong></button>
                        </div>
                    </div>
                `;
                container.appendChild(card);//Agregar card al contenedor
            });
        });
});