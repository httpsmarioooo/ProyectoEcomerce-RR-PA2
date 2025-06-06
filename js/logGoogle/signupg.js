const signupForm = document.querySelector('#signupForm');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.querySelector('#nameg').value.trim();
    const email = document.querySelector('#emailg').value.trim();
    const password = document.querySelector('#passwordg').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const isUserRegistered = users.find(user => user.email === email);
    if (isUserRegistered) {
        // alert('El usuario ya está registrado!');
        // Mostrar alerta de error
            Swal.fire({
                title: 'Error!',
                text: 'El usuario ya está registrado!',
                imageUrl: '../../assets/images/bluet_advertencia.png', //% Imagen BlueT ingresar datos
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

    // Asignar un id único incremental
    const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;

    users.push({ id: newId, name: name, email: email, password: password });
    localStorage.setItem('users', JSON.stringify(users));
    // alert('Registro Exitoso!');
    // Mostrar alerta éxitosa
        Swal.fire({
            title: 'Registro Exitoso!',
            imageUrl: '../../assets/images/BLUET.png', //% Imagen BlueT ingreso exitoso
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
            window.location.href = '../../HTML/logGoogle/loging.html';
        })
});

//comentario entrega tarea 9
//comentario entrega tarea 10