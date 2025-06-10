document.addEventListener('DOMContentLoaded', function () {
    const agregarForm = document.getElementById('agregarForm');
    const editarForm = document.getElementById('editarForm');
    const tablaProductos = document.getElementById('tablaProductos');

    if (!agregarForm) {
        console.error("Formulario no encontrado.");
        return;
    }

    cargarProductos();

    // AGREGAR PRODUCTO (POST)
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

        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('descripcion', descripcion);
        formData.append('precio', precio);
        formData.append('categoria', categoria);
        formData.append('nivel', nivel);
        formData.append('edadRecomendada', edad);
        formData.append('imagen', archivo);

        fetch("https://jatprpnjb2.us-east-1.awsapprunner.com/productos/guardarNuevoProducto", {
            method: "POST",
            body: formData
        })
        .then(res => res.text())
        .then(response => {
            alert("Producto agregado correctamente.");
            agregarForm.reset();
            cargarProductos();
        })
        .catch(error => {
            console.error("Error en la solicitud:", error);
        });
    });

    // CARGAR PRODUCTOS (GET)
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

    // EDITAR PRODUCTO (PUT)
    document.getElementById('btn-editarBD').addEventListener('click', function (event) {
        event.preventDefault();

        const id = document.getElementById('id').value;
        const titulo = document.getElementById('tituloEdit').value.trim();
        const descripcion = document.getElementById('descripcionEdit').value.trim();
        const precioInput = document.getElementById('precioEdit').value.trim();
        const precio = precioInput !== "" ? parseFloat(precioInput) : undefined;
        const categoria = document.getElementById('categoriaEdit').value.trim();
        const nivel = document.getElementById('nivelEdit').value.trim();
        const edad = document.getElementById('edadEdit').value.trim();
        const imagenInput = document.getElementById('imagenEdit');
        const archivo = imagenInput.files && imagenInput.files[0];

        // Si hay imagen, usa FormData (para actualizar imagen)
        if (archivo) {
            const formData = new FormData();
            if (titulo) formData.append('titulo', titulo);
            if (descripcion) formData.append('descripcion', descripcion);
            if (precio) formData.append('precio', precio);
            if (categoria) formData.append('categoria', categoria);
            if (nivel) formData.append('nivel', nivel);
            if (edad) formData.append('edadRecomendada', edad);
            formData.append('imagen', archivo);

            fetch(`https://jatprpnjb2.us-east-1.awsapprunner.com/productos/editar/${id}`, {
                method: "PUT",
                body: formData
            })
            .then(res => res.text())
            .then(response => {
                alert("Producto actualizado correctamente.");
                editarForm.reset();
                cargarProductos();
            })
            .catch(error => {
                console.error("Error en la solicitud:", error);
            });
        } else {
            // Si NO hay imagen, envía JSON normal
            const dataFinal = {};
            if (titulo) dataFinal.titulo = titulo;
            if (descripcion) dataFinal.descripcion = descripcion;
            if (precio) dataFinal.precio = precio;
            if (categoria) dataFinal.categoria = categoria;
            if (nivel) dataFinal.nivel = nivel;
            if (edad) dataFinal.edadRecomendada = edad;

            fetch(`https://jatprpnjb2.us-east-1.awsapprunner.com/productos/editar/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataFinal)
            })
            .then(res => res.text())
            .then(response => {
                alert("Producto actualizado correctamente.");
                editarForm.reset();
                cargarProductos();
            })
            .catch(error => {
                console.error("Error en la solicitud:", error);
            });
        }
    });

    // ELIMINAR PRODUCTO (DELETE)
    document.getElementById('btn-eliminarBD').addEventListener('click', function (event) {
        event.preventDefault();
        const id = document.getElementById('id').value.trim();

        fetch(`https://jatprpnjb2.us-east-1.awsapprunner.com/productos/borrar/${id}`, {
            method: "DELETE"
        })
        .then(res => res.text())
        .then(response => {
            alert("Producto eliminado correctamente.");
            editarForm.reset();
            cargarProductos();
        })
        .catch(error => {
            console.error("Error en la solicitud:", error);
        });
    });
});