import { API_URL } from '../api.js';
// Función para registrar un usuario con Google en el backend
async function registrarGoogleUsuario(nombre, correo, contrasena) {
    try {
        // Registrar directamente al usuario con Google
        const checkResponse = await fetch(`${API_URL}/auth/usuarios/registro`, { 
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
        if (!checkResponse.ok) {
            // Si el servidor devuelve un error (por ejemplo, correo duplicado)
            const errorData = await checkResponse.text();
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
document.addEventListener('DOMContentLoaded', function() {
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
    })
});
