let productos = [];

fetch('./productos.json')
    .then(response => response.json())
    .then(data => {
        productos = data;
    });

document.getElementById('toyForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value;
    const precio = parseFloat(document.getElementById('precio').value);
    const categoria = document.getElementById('categoria').value;
    const nivel = document.getElementById('nivel').value;
    const edad = document.getElementById('edad').value;
    const imagen = document.getElementById('imagen');
    const archivo = imagen.files[0];

    if (!archivo) {
        alert("Por favor, sube una imagen.");
        return;
    }

    const reader = new FileReader();

    reader.onload = function(e) {
        const nuevoProducto = {
            id: productos.length + 1,
            titulo: titulo,
            descripcion: descripcion,
            precio: precio,
            categoria: categoria,
            nivel: nivel,
            edad: edad,
            imagen: e.target.result 
        };

        productos.push(nuevoProducto);

        localStorage.setItem('productosAct', JSON.stringify(productos));

        alert("Producto agregado correctamente");
        document.getElementById('toyForm').reset();
    };

    reader.readAsDataURL(archivo);
});

