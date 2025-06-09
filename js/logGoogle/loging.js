
// Función para iniciar sesión con Google en el backend
async function loginGoogleUsuario(correo, contrasena) {
    try {
        // Primero intentamos iniciar sesión con las credenciales proporcionadas
        const response = await fetch(`${API_URL}/auth/login-google`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                correo, 
                nombre: correo.split('@')[0], //nombre por defecto
                contrasena: contrasena
            })
        });

        if (!response.ok) {
            if (response.status === 401) {
                return mostrarAlertaError('Ingreso de sesión inválido', 'Correo y/o contraseña incorrectos!');
            }
            throw new Error(`Error HTTP: ${response.status}`);
        }
        // Obtener el token como texto
        const data = await response.text();
        console.log('Token recibido:', data);
        // Guardar el token JWT
        saveToken(data);
        
        // Guardar información del usuario en localStorage
        saveUserInfo({
            orreo: correo,
            nombre: correo.split('@')[0],
            rol: 'cliente',
            proveedor: 'google'
        });
        
        
        // Mostrar alerta de éxito
        Swal.fire({
            title: 'Ingreso de sesión éxitoso!',
            text: `Bienvenid@ ${data.nombre || data.correo}`,
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
            window.location.href = '../../index.html';
        });
    } catch (error) {
        console.error('Error al iniciar sesión con Google:', error);
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
document.addEventListener('DOMContentLoaded', function() {
const loginForm = document.querySelector('#loginForm');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.querySelector('#emailg').value.trim();
    const password = document.querySelector('#passwordg').value;

    if (!email || !password) {
        return mostrarAlertaError('Error al ingresar datos', 'Por favor completa todos los campos requeridos!');
    }
    
    // Llamada a la API para iniciar sesión con Google
    loginGoogleUsuario(email, password);

    // codigo comentado ---
    });
});



// const users = JSON.parse(localStorage.getItem('listaUsuarios')) || [];
// const validUser = users.find(user => user.correo === email && user.contrasena === password);
// if (!validUser) {
//     // alert('Usuario y/o contraseña incorrectos!');
//     // Mostrar alerta de error
//     Swal.fire({
//         title: 'Ingreso de sesión inválido',
//         text: 'Correo y/o contraseña incorrectos!',
//         imageUrl: '../../assets/images/bluet_advertencia.png', //% Imagen BlueT ingreso invalido
//         imageWidth: 120,
//         imageHeight: 120,
//         imageAlt: 'Ícono personalizado',
//         confirmButtonText: 'Corregir',
//         customClass: {
//             popup: 'mi-popup', //Clase del cuadro de la alerta
//             title: 'mi-titulo', //Clase del titulo de la alerta
//             htmlContainer: 'mi-subtitulo', //Clase del subtitulo de la alerta
//             confirmButton: 'mi-boton' //Boton de confirmar
//         }
//     });
//     return;
// }
// // Mostrar alerta éxitosa
//     Swal.fire({
//         title: 'Ingreso de sesión éxitoso!',
//         text: `Bienvenid@ ${validUser.nombre || validUser.correo}`,
//         imageUrl: '../../assets/images/BLUET.png', //% Imagen BlueT ingreso exitoso
//         imageWidth: 120,
//         imageHeight: 120,
//         imageAlt: 'Ícono personalizado',
//         timer: 3000,
//         confirmButtonText: 'Aceptar',
//         customClass: {
//             popup: 'mi-popup', //Clase del cuadro de la alerta
//             title: 'mi-titulo', //Clase del titulo de la alerta
//             htmlContainer: 'mi-subtitulo', //Clase del subtitulo de la alerta
//             confirmButton: 'mi-boton' //Boton de confirmar
//         }
//     }).then(() => {
//         // alert(`Bienvenido ${validUser.name || validUser.email}`);
//         sessionStorage.setItem('usuarioActivo', JSON.stringify(validUser));
//         if (validUser.rol === 'admin') {
//             window.location.href = '../../HTML/admin.html';
//         } else {
//             window.location.href = '../../index.html';
//         }
//     })