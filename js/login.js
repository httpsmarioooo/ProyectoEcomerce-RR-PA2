document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const btnIngresar = document.querySelectorAll('.social-btn')[0];

    btnIngresar.addEventListener('click', function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        // Puede borrar eso aunque ese es el alert de la validación
        if (!email || !password) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        // Obtener usuarios registrados
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const usuario = usuarios.find(u => u.correo === email && u.contrasena === password);

        if (usuario) {
            // Puedes guardar el usuario en sessionStorage si quieres mantener la sesión
            sessionStorage.setItem('usuarioActivo', JSON.stringify(usuario));
            alert('¡Inicio de sesión exitoso!');
            // Redirige a la página principal o dashboard
            window.location.href = 'index.html';
        } else {
            alert('Correo o contraseña incorrectos.');
        }
    });
});