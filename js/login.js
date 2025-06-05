// Crear cuenta admin quemada si no existe
(function(){
    let usuarios = JSON.parse(localStorage.getItem('listaUsuarios')) || [];
    if (!usuarios.find(u => u.correo === 'admin')) {
        usuarios.push({ correo: 'admin', contrasena: '123', rol: 'admin' });
        localStorage.setItem('listaUsuarios', JSON.stringify(usuarios));
    }
})();

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const btnIngresar = document.querySelectorAll('.social-btn')[0];
 
    btnIngresar.addEventListener('click', function (e) {
        e.preventDefault();
 
        const correo = document.getElementById('email').value.trim();
        const contrasena = document.getElementById('password').value;
 
        if (!correo || !contrasena) {
            // alert('Por favor, completa todos los campos.');
            // Mostrar alerta de error
            Swal.fire({
                title: 'Error al ingresar datos',
                text: 'Por favor completa todos los campos requeridos!',
                imageUrl: '../assets/images/bluet_advertencia.png', //% Imagen BlueT ingresar datos
                imageWidth: 120,
                imageHeight: 120,
                imageAlt: 'Ícono personalizado',
                confirmButtonText: 'Corregir',
                customClass: {
                    popup: 'mi-popup', //Clase del cuadro de la alerta
                    title: 'mi-titulo', //Clase del titulo de la alerta
                    htmlContainer: 'mi-subtitulo', //Clase del subtitulo de la alerta
                    confirmButton: 'mi-boton' //Boton de confirmar
                }
            });
            return;
        }
 
        const usuarios = JSON.parse(localStorage.getItem('listaUsuarios')) || [];
        const usuario = usuarios.find(u => u.correo === correo && u.contrasena === contrasena);
 
        if (usuario) {
            sessionStorage.setItem('usuarioActivo', JSON.stringify(usuario));
            // alert('¡Inicio de sesión exitoso!');
            // Mostrar alerta éxitosa
            Swal.fire({
                title: 'Ingreso de sesión éxitoso!',
                imageUrl: '../assets/images/BLUET.png', //% Imagen BlueT ingreso exitoso
                imageWidth: 120,
                imageHeight: 120,
                imageAlt: 'Ícono personalizado',
                confirmButtonText: 'Aceptar',
                customClass: {
                    popup: 'mi-popup', //Clase del cuadro de la alerta
                    title: 'mi-titulo', //Clase del titulo de la alerta
                    htmlContainer: 'mi-subtitulo', //Clase del subtitulo de la alerta
                    confirmButton: 'mi-boton' //Boton de confirmar
                }
            }).then(() => {
                if (usuario.rol === 'admin') {
                    window.location.href = '../HTML/admin.html';
                } else {
                    window.location.href = '../index.html';
            }})
        } else {
            // alert('Correo o contraseña incorrectos.');
            // Mostrar alerta de error
            Swal.fire({
                title: 'Ingreso de sesión inválido',
                text: 'Correo y/o contraseña incorrectos!',
                imageUrl: '../assets/images/bluet_advertencia.png', //% Imagen BlueT ingreso ivalido
                imageWidth: 120,
                imageHeight: 120,
                imageAlt: 'Ícono personalizado',
                confirmButtonText: 'Corregir',
                customClass: {
                    popup: 'mi-popup', //Clase del cuadro de la alerta
                    title: 'mi-titulo', //Clase del titulo de la alerta
                    htmlContainer: 'mi-subtitulo', //Clase del subtitulo de la alerta
                    confirmButton: 'mi-boton' //Boton de confirmar
                }
            });
        }
    });
});