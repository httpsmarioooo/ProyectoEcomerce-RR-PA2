//Crear Card
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('productos-container');

    const storedProductos = localStorage.getItem('productosAct');
    if (storedProductos) {
        const productos = JSON.parse(storedProductos);

        productos.forEach(producto => {
            const card = document.createElement('div');
            card.id = `card-${producto.id}`;
            card.className = 'col-md-4 mb-4';
            card.innerHTML = `
                <div class="card categoria-${producto.categoria} nivel-${producto.nivel} edad-${producto.edad}" style="width: 18rem;">
                    <img src="${producto.imagen || 'default.jpg'}" class="imagen-card" alt="${producto.titulo}">
                    <div class="card-body">
                        <h5 class="card-title">${producto.titulo}</h5>
                        <p class="card-text">${producto.descripcion}</p>
                        <h3 class="card-price">Precio $ ${producto.precio.toLocaleString()}</h3>
                        <a href="#" class="btn btn-primary">Comprar</a>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    }else{

        fetch('productos.json')
        .then(response => response.json())
        .then(productos => {
            const container = document.getElementById('productos-container');//ID contenedor productos---//& Verificar

            productos.forEach(producto => {
                const card = document.createElement('div');
                card.id = `card-${producto.id}`; // Id de producto
                card.className = 'col-md-4 mb-4';
                card.innerHTML = `
                <div class="card categoria-${producto.categoria} nivel-${producto.nivel} edad-${producto.edad}" style="width: 18rem;">
                <img src="${producto.imagen}" class="imagen-card" alt="${producto.titulo}">
                <div class="card-body">
                <h5 class="card-title">${producto.titulo}</h5>
                <p class="card-text">${producto.descripcion}</p>
                <h3 class="card-price">Precio $ ${producto.precio.toLocaleString()}</h3>
                            <a href="#" class="btn btn-primary">Comprar</a>
                        </div>
                        </div>
                        `;
                container.appendChild(card);//Agregar card al contenedor
            });
        });
    }
});
