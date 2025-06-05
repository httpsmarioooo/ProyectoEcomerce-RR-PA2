const loginForm = document.querySelector('#loginForm');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#emailg').value.trim();
    const password = document.querySelector('#passwordg').value;
    const users = JSON.parse(localStorage.getItem('listaUsuarios')) || [];
    const validUser = users.find(user => user.correo === email && user.contrasena === password);
    if (!validUser) {
        // alert('Usuario y/o contraseña incorrectos!');
        // Mostrar alerta de error
        Swal.fire({
            title: 'Ingreso de sesión inválido',
            text: 'Correo y/o contraseña incorrectos!',
            imageUrl: '../../assets/images/bluet_advertencia.png', //% Imagen BlueT ingreso invalido
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
    // Mostrar alerta éxitosa
        Swal.fire({
            title: 'Ingreso de sesión éxitoso!',
            text: `Bienvenid@ ${validUser.nombre || validUser.correo}`,
            imageUrl: '../../assets/images/BLUET.png', //% Imagen BlueT ingreso exitoso
            imageWidth: 120,
            imageHeight: 120,
            imageAlt: 'Ícono personalizado',
            timer: 3000,
            confirmButtonText: 'Aceptar',
            customClass: {
                popup: 'mi-popup', //Clase del cuadro de la alerta
                title: 'mi-titulo', //Clase del titulo de la alerta
                htmlContainer: 'mi-subtitulo', //Clase del subtitulo de la alerta
                confirmButton: 'mi-boton' //Boton de confirmar
            }
        }).then(() => {
            // alert(`Bienvenido ${validUser.name || validUser.email}`);
            sessionStorage.setItem('usuarioActivo', JSON.stringify(validUser));
            if (validUser.rol === 'admin') {
                window.location.href = '../../HTML/admin.html';
            } else {
                window.location.href = '../../index.html';
            }
        })
});