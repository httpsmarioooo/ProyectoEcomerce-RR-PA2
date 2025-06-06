const signupForm = document.querySelector('#signupForm');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.querySelector('#nameg').value.trim();
    const email = document.querySelector('#emailg').value.trim();
    const password = document.querySelector('#passwordg').value;

    if (!name || !email || !password) {
        return mostrarAlertaError('Error al ingresar datos', 'Por favor completa todos los campos requeridos!');
    }
    // Registrar usuario con Google en el backend
    registrarGoogleUsuario(name, email, password);

    // codigo comentado ---
});
// Función para registrar un usuario con Google en el backend
async function registrarGoogleUsuario(nombre, correo, contrasena) {
    try {
        // Registrar directamente al usuario con Google
        const checkResponse = await fetch(`${API_URL}/usuarios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre,
                correo: correo,
                contrasena: contrasena,
                telefono: "0000000000",
                rol: 'cliente',
                proveedor: 'google'
            })
        });
        if (!response.ok) {
            // Si el servidor devuelve un error (por ejemplo, correo duplicado)
            const errorData = await response.text();
            return mostrarAlertaError('Error al registrar', errorData || 'El usuario ya está registrado!');
        }
        // Mostrar alerta de éxito
        Swal.fire({
            title: 'Registro Exitoso!',
            imageUrl: '../../assets/images/BLUET.png',
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
            window.location.href = '../../HTML/logGoogle/loging.html';
        });
    } catch (error) {
        console.error('Error al registrar usuario con Google:', error);
        mostrarAlertaError('Error de conexión', 'No se pudo conectar con el servidor. Intenta nuevamente más tarde.');
    }
}

function mostrarAlertaError(titulo, texto) {
    Swal.fire({
        title: titulo,
        text: texto,
        imageUrl: '../../assets/images/bluet_advertencia.png',
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

// const usuarios = JSON.parse(localStorage.getItem('listaUsuarios')) || [];
// const isUserRegistered = usuarios.find(user => user.correo === email);
// if (isUserRegistered) {
//     // alert('El usuario ya está registrado!');
//     return mostrarAlertaError('Error!', 'El usuario ya está registrado!');
// }

// // Asignar un id único incremental
// const nuevoId  = usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1;

// usuarios.push({
//     id: nuevoId,
//     usuario: (name.slice(0, 3) + nuevoId),
//     nombre: name,
//     correo: email,
//     contrasena: password,
//     rol: 'cliente',
//     registradoPor: 'google'
// });

// localStorage.setItem('listaUsuarios', JSON.stringify(usuarios));
// // alert('Registro Exitoso!');
// // Mostrar alerta éxitosa
//     Swal.fire({
//         title: 'Registro Exitoso!',
//         imageUrl: '../../assets/images/BLUET.png', //% Imagen BlueT ingreso exitoso
//         imageWidth: 120,
//         imageHeight: 120,
//         imageAlt: 'Ícono personalizado',
//         confirmButtonText: 'Aceptar',
//         customClass: {
//             popup: 'mi-popup', //Clase del cuadro de la alerta
//             title: 'mi-titulo', //Clase del titulo de la alerta
//             htmlContainer: 'mi-subtitulo', //Clase del subtitulo de la alerta
//             confirmButton: 'mi-boton' //Boton de confirmar
//         }
//     }).then(() => {
//         window.location.href = '../../HTML/logGoogle/loging.html';
//     })
