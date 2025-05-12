document.addEventListener('DOMContentLoaded', function () {
    const btn = document.querySelector('.boton-registrarse');
    if (!btn) return;

    btn.addEventListener('click', function (e) {
        e.preventDefault();

        // Obtener valores
        const usuario = document.getElementById('usuario').value.trim();
        const nombre = document.getElementById('nombre').value.trim();
        const correo = document.getElementById('correo').value.trim();
        const contrasena = document.getElementById('contrasena').value;
        const confirmar = document.getElementById('confirmar').value;

        // Validaciones básicas
        if (!usuario || !nombre || !correo || !contrasena || !confirmar) {
            alert('Por favor, completa todos los campos.');
            return;
        }
        if (contrasena !== confirmar) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        // Obtener usuarios existentes
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        // Verificar si el usuario o correo ya existe
        const existe = usuarios.some(u => u.usuario === usuario || u.correo === correo);
        if (existe) {
            alert('El usuario o correo ya está registrado.');
            return;
        }

        // Guardar nuevo usuario
        usuarios.push({ usuario, nombre, correo, contrasena });
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
        window.location.href = 'login.html';
    });
});