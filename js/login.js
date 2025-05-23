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
            alert('Por favor, completa todos los campos.');
            return;
        }
 
        const usuarios = JSON.parse(localStorage.getItem('listaUsuarios')) || [];
        const usuario = usuarios.find(u => u.correo === correo && u.contrasena === contrasena);
 
        if (usuario) {
            sessionStorage.setItem('usuarioActivo', JSON.stringify(usuario));
            alert('¡Inicio de sesión exitoso!');
            if (usuario.rol === 'admin') {
                window.location.href = 'admin.html';
            } else {
                window.location.href = 'index.html';
            }
        } else {
            alert('Correo o contraseña incorrectos.');
        }
    });
});