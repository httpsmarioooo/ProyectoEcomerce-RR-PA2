let productos = [];

fetch('./productos.json')
    .then(response => response.json())
    .then(data => {
        productos = data;
    })

document.getElementById('toyForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value;
    const precio = parseFloat(document.getElementById('precio').value);
    const categoria = document.getElementById('categoria').value;
    const nivel = document.getElementById('nivel').value;
    const edad = document.getElementById('edad').value;

    const nuevoProducto = {
        id: productos.length + 1,
        titulo: titulo,
        descripcion: descripcion,
        precio: precio,
        categoria: categoria, 
        nivel: nivel,
        edad: edad,
        imagen: "" 
    };
    alert("Producto agregado correctamente");

    productos.push(nuevoProducto);

    console.clear();
    console.log(JSON.stringify(productos, null, 2));

    document.getElementById('toyForm').reset();
});
