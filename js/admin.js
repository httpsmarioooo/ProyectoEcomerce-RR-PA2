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
        const edadRecomendada = document.getElementById('edad').value;
        const imagen = document.getElementById('imagen');
        const archivo = imagen.files[0];

        if (!archivo) {
            alert("Por favor, sube una imagen.");
            return;
        }

        const data = {
            titulo,
            descripcion,
            precio,
            categoria,
            nivel,
            edadRecomendada,
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

    
    document.getElementById('btn-editarBD').addEventListener('click', function (event) {
    event.preventDefault();

    const id = document.getElementById('id').value;

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
            const imagenNombre = document.getElementById('imagenEdit').value.trim();

            // Si no se ingresó un nuevo nombre, mantener el anterior
            const imagenUrl = imagenNombre !== ""
                ? `/assets/imgProductos/${nivel}/${imagenNombre}`
                : data.imagenUrl;

            const dataFinal = {
                titulo: titulo,
                descripcion: descripcion,
                precio: precio,
                categoria: categoria,
                nivel: nivel,
                edadRecomendada: edad,
                imagenUrl: imagenUrl
            };

            fetch(`https://jatprpnjb2.us-east-1.awsapprunner.com/productos/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataFinal)
            })
            .then(res => res.text())
            .then(response => {
                console.log("Producto editado:", response);
                alert("Producto actualizado correctamente.");
                cargarProductos();
            })
            .catch(error => {
                console.error("Error al editar producto:", error);
            });
        })
        .catch(error => {
            console.error("Error al obtener producto:", error);
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
});
