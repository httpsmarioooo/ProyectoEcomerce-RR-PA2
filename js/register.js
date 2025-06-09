
//registrar un usuario en el backend
async function registrarUsuario(usuario, nombre, correo, telefono, contrasena) {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre,
                correo: correo,
                contrasena: contrasena,
                telefono: telefono,
                rol: 'cliente',
                proveedor: 'local'
            })
        });

        if (!response.ok) {
            // Si el servidor devuelve un error (por ejemplo, correo duplicado)
            const errorData = await response.text();
            return mostrarAlertaError('Error al registrar', errorData || 'El usuario ya está registrado!');
        }

        // Registro exitoso
        Swal.fire({
            title: 'Registro Exitoso!',
            imageUrl: '../assets/images/BLUET.png',
            imageWidth: 120,
            imageHeight: 120,
            imageAlt: 'Ícono personalizado',
            confirmButtonText: 'Aceptar',
            customClass: {
                popup: 'mi-popup',
                title: 'mi-titulo',
                htmlContainer: 'mi-subtitulo',
                confirmButton: 'mi-boton'
            }
        }).then(() => {
            window.location.href = '../HTML/login.html';
        });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        mostrarAlertaError('Error de conexión', 'No se pudo conectar con el servidor. Intenta nuevamente más tarde.');
    }
}

function mostrarAlertaError(titulo, texto) {
    Swal.fire({
        title: titulo,
        text: texto,
        imageUrl: '../assets/images/bluet_advertencia.png',
        imageWidth: 120,
        imageHeight: 120,
        imageAlt: 'Ícono personalizado',
        confirmButtonText: 'Corregir',
        customClass: {
            popup: 'mi-popup',
            title: 'mi-titulo',
            htmlContainer: 'mi-subtitulo',
            confirmButton: 'mi-boton'
        }
    });
}
document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.querySelector("#formulario");

    formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const usuario = document.querySelector("#usuario").value;
    const nombre = document.querySelector("#nombre").value;
    const correo = document.querySelector("#correo").value;
    const telefono = document.querySelector("#telefono").value;
    const contrasena = document.querySelector("#contrasena").value;
    const confirmar = document.querySelector("#confirmar").value;

    // Validación de campos vacíos
    if (!usuario || !nombre || !correo || !telefono || !contrasena || !confirmar) {
        // alert("Completa todos los campos.");
        return mostrarAlertaError('Error al ingresar datos', 'Por favor completa todos los campos requeridos!');
    }

    // Validación del teléfono colombiano
    const regexTelefonoColombia = /^(?:\+57\s?)?(3\d{2}|60[1-8])[-\s]?\d{3}[-\s]?\d{4}$/;
    if (!regexTelefonoColombia.test(telefono)) {
        // alert("Introduce un número de teléfono válido. Ej: 3001234567 o +57 604 123 4567");
        return mostrarAlertaError('Error al ingresar número de teléfono', 'Introduce un número válido. Ej: 3001234567 o +57 604 123 4567');
    }

    // Confirmar contraseñas
    if (contrasena !== confirmar) {
        // alert("Las contraseñas no coinciden");
        return mostrarAlertaError('Las contraseñas no coinciden', '');
    }
    // Registrar usuario en el backend
    registrarUsuario(usuario, nombre, correo, telefono, contrasena);

    // codigo comentado ---
    })
});



// // Verificación del correo
//     const usuarios = JSON.parse(localStorage.getItem('listaUsuarios')) || [];
//     const usuarioCreado = usuarios.find(user => user.correo === correo);
//     if (usuarioCreado) {
//         // return alert("El usuario ya está registrado");
//         return mostrarAlertaError('Error!', 'El usuario ya está registrado!');
//     }
    
//     const nuevoId = usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1;
//     // Agregar a la lista y al localStorage
//     usuarios.push({
//         id: nuevoId,
//         usuario: usuario,
//         nombre: nombre,
//         correo: correo,
//         telefono: telefono,
//         contrasena: contrasena,
//         rol: 'cliente',
//         registradoPor: 'local'
//     });

//     localStorage.setItem('listaUsuarios', JSON.stringify(usuarios));
//     // alert("Registro completado");
//     Swal.fire({
//             title: 'Registro Exitoso!',
//             imageUrl: '../assets/images/BLUET.png', //% Imagen BlueT ingreso exitoso
//             imageWidth: 120,
//             imageHeight: 120,
//             imageAlt: 'Ícono personalizado',
//             confirmButtonText: 'Aceptar',
//             customClass: {
//                 popup: 'mi-popup', //Clase del cuadro de la alerta
//                 title: 'mi-titulo', //Clase del titulo de la alerta
//                 htmlContainer: 'mi-subtitulo', //Clase del subtitulo de la alerta
//                 confirmButton: 'mi-boton' //Boton de confirmar
//             }
//         }).then(() => {
//             window.location.href = '../HTML/login.html';
//         })