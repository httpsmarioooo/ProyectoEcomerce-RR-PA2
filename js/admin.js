document.addEventListener('DOMContentLoaded', function () {
    const agregarForm = document.getElementById('agregarForm');
    const editarForm = document.getElementById('editarForm');

    if (!agregarForm) {
        console.error("Formulario no encontrado.");
        return;
    }

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
            fetch("http://localhost:8080/productos/guardarNuevoProducto", {
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
    });

    document.getElementById('btn-editarBD').addEventListener('click', function (event) {
        event.preventDefault();
        const id = document.getElementById('id').value;
        const titulo = document.getElementById('tituloEdit').value;
        const descripcion = document.getElementById('descripcionEdit').value;
        const precio = parseFloat(document.getElementById('precioEdit').value);
        const categoria = document.getElementById('categoriaEdit').value;
        const nivel = document.getElementById('nivelEdit').value;
        const edad = document.getElementById('edadEdit').value;
        const imagen = document.getElementById('imagenEdit');
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
            fetch(`http://localhost:8080/productos/editar/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
            .then(res => res.text())
            .then(response => {
                console.log("Respuesta del servidor:", response);
                alert("Producto actualizado correctamente.");
                agregarForm.reset();
            })
            .catch(error => {
                console.error("Error en la solicitud:", error);
        });
    });

    document.getElementById('btn-eliminarBD').addEventListener('click', function (event) {
        event.preventDefault();
        const id = document.getElementById('id').value.trim();

        fetch(`http://localhost:8080/productos/borrar/${id}`, {
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