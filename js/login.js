document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const btnIngresar = document.querySelectorAll('.social-btn')[0];
 
    btnIngresar.addEventListener('click', function (e) {
        e.preventDefault();
 
        const correo = document.getElementById('email').value.trim();
        const contrasena = document.getElementById('password').value;
 
        if (!correo || !contrasena) {
            alert('Por favor, completa todos los campos.');
            return;
        }
 
        // Usar la misma clave del registro
        const usuarios = JSON.parse(localStorage.getItem('listaUsuarios')) || [];
        const usuario = usuarios.find(u => u.correo === correo && u.contrasena === contrasena);
 
        if (usuario) {
            sessionStorage.setItem('usuarioActivo', JSON.stringify(usuario));
            alert('¡Inicio de sesión exitoso!');
            window.location.href = 'index.html';
        } else {
            alert('Correo o contraseña incorrectos.');
        }
    });
});