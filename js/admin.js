const productos = [
    { 
        id: 1,
        titulo: "Cubos de Apilamiento Sensoriales de Madera",
        descripcion: "Estos cubos ofrecen experiencias sensoriales variadas mediante texturas (lisa, rugosa, tela suave), colores vibrantes y sonidos suaves como cascabeles. Fomentan la exploración táctil y visual, la coordinación ojo-mano y la comprensión de tamaños y orden. Son ideales para juegos compartidos y construcción de torres.",
        precio: 85000,
        categoria: "motricidad",
        nivel: "leve",
        edad: "3-5",
        imagen: "../assets/imgProductos/leve-Cubos.png"
    }
];

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
