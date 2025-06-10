document.addEventListener('DOMContentLoaded', function () {
    const agregarForm = document.getElementById('agregarForm');
    const editarForm = document.getElementById('editarForm')
    const tablaProductos = document.getElementById('tablaProductos')
 
    if (!agregarForm) {
        console.error("Formulario no encontrado.");
        return;
    }
 
    cargarProductos();
 
    agregarForm.addEventListener('submit', function (event) {
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
                const data = {
                titulo: titulo,
                descripcion: descripcion,
                precio: precio,
                categoria: categoria,
                nivel: nivel,
                edadRecomendada: edad,
                imagenUrl: `/assets/imgProductos/${nivel}/${archivo.name}`
            };
            fetch("https://jatprpnjb2.us-east-1.awsapprunner.com/productos/guardarNuevoProducto", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
            .then(res => res.text())
            .then(response => {
                console.log("Respuesta del servidor:", response);
                alert("Producto agregado correctamente.");
                agregarForm.reset();
            })
            .catch(error => {
                console.error("Error en la solicitud:", error);
            });
        });
        function cargarProductos() {
            fetch("https://jatprpnjb2.us-east-1.awsapprunner.com/productos/ObtenerProductos")
                .then(response => response.json())  
                .then(data => {
                    tablaProductos.innerHTML = '';
                    data.forEach(producto => {
                        const row = tablaProductos.insertRow();
                        row.innerHTML = `
                            <td>${producto.id}</td>
                            <td>${producto.titulo}</td>
                            <td class="descripcionProdu">${producto.descripcion}</td>
                            <td>${producto.precio}</td>
                            <td>${producto.categoria}</td>
                            <td>${producto.nivel}</td>
                            <td>${producto.edadRecomendada}</td>
                            <td>${producto.imagenUrl}</td>
                        `;
                    });
                })
                .catch(error => console.error('Error al cargar productos:', error));
        }
    });
 
 
 document.getElementById('btn-editarBD').addEventListener('click', function (event) {
    event.preventDefault();
 
    const id = document.getElementById('id').value;
    const imagenInput = document.getElementById('imagenEdit');
   
 
    fetch(`https://jatprpnjb2.us-east-1.awsapprunner.com/productos/${id}`)
        .then(response => response.json())
        .then(data => {
            const titulo = document.getElementById('tituloEdit').value.trim() || data.titulo;
            const descripcion = document.getElementById('descripcionEdit').value.trim() || data.descripcion;
            const precioInput = document.getElementById('precioEdit').value.trim();
            const precio = precioInput !== "" ? parseFloat(precioInput) : data.precio;
            const categoria = document.getElementById('categoriaEdit').value.trim() || data.categoria;
            const nivel = document.getElementById('nivelEdit').value.trim() || data.nivel;
            const edad = document.getElementById('edadEdit').value.trim() || data.edadRecomendada;
            const imagen = document.getElementById('imagenEdit'); // input de tipo file
            const archivo = imagen.files[0]; // puede ser imagen o cualquier archivo
            let imagenUrl = data.imagenUrl; // valor por defecto, si no se sube nada

        if (archivo) {
            const esImagen = archivo.type.startsWith('image/');
            imagenUrl = esImagen ? 'Imagen' : 'Archivo'; 
            

        const dataFinal = {
            titulo: titulo,
            descripcion: descripcion,
            precio: precio,
            categoria: categoria,
            nivel: nivel,
            edadRecomendada: edad,
            imagenUrl: imagenUrl, 
        };
 
            fetch(`https://jatprpnjb2.us-east-1.awsapprunner.com/productos/editar/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataFinal)
            })
                .then(res => res.text())
                .then(response => {
                    console.log("Respuesta del servidor:", response);
                    alert("Producto actualizado correctamente.");
                    editarForm.reset();
                })
                .catch(error => {
                    console.error("Error en la solicitud:", error);
                });
        });
});
 
    document.getElementById('btn-eliminarBD').addEventListener('click', function (event) {
        event.preventDefault();
        const id = document.getElementById('id').value.trim();
 
        fetch(`https://jatprpnjb2.us-east-1.awsapprunner.com/productos/borrar/${id}`, {
            method: "DELETE"
        })
        .then(res => res.text())
        .then(response => {
            console.log("Respuesta del servidor:", response);
            alert("Producto eliminado correctamente.");
            editarForm.reset();
        })
        .catch(error => {
            console.error("Error en la solicitud:", error);
    });
});
