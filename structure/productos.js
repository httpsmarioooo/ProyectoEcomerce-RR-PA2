//Crear Card
document.addEventListener('DOMContentLoaded', function() {
    fetch('productos.json')
        .then(response => response.json())
        .then(productos => {
            const container = document.getElementById('productos-container');//ID contenedor productos---//& Verificar
            
            productos.forEach(producto => {
                const card = document.createElement('div');
                card.id = `card-${producto.id}`; // Id de producto
                card.className = 'col-md-4 mb-4';
                card.innerHTML = `
                    <div class="card categoria-${producto.categoria} nivel-${producto.nivel} edad-${producto.edad}" style="width: 18rem; background-color: #DCEFED; border-radius: 25px; border: none; margin: 5px 5px 0; padding: 15px 15px 5px;">
                        <img src="${producto.imagen}" class="imagen-card" alt="${producto.titulo}">
                        <div class="card-body" style="margin-bottom: 0;padding-bottom: 0;">
                            <h5 class="card-title" style="color: #02537D;">${producto.titulo}</h5>
                            <h3 class="card-price"><strong>$ ${producto.precio.toLocaleString()}</strong></h3>
                            <div class="botones">
                            <a href="#" class="btn-carrito-card"><img src="../assets/images/BLUET.png" class="imagen-carrito" alt="BlueT.Carrito"></a>
                            <a href="../producto${producto.id}.html" target="_blank" id="${producto.id}" class="btn-verMas"><strong>Ver mas</strong></a>
                            </div>
                        </div>
                    </div>
                `;
                container.appendChild(card);//Agregar card al contenedor
            });
        });
});//<p class="card-text">${producto.descripcion}</p>