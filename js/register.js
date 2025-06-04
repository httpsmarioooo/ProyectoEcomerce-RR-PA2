const formulario = document.querySelector("#formulario");
 
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
 
    const usuario = document.querySelector("#usuario").value;
    const nombre = document.querySelector("#nombre").value;
    const correo = document.querySelector("#correo").value;
    const telefono = document.querySelector("#telefono").value;
    const contrasena = document.querySelector("#contrasena").value;
    const confirmar = document.querySelector("#confirmar").value;
 
    // Validación de campos vacíos
    if (!usuario || !nombre || !correo || !telefono || !contrasena || !confirmar) {
        // alert("Completa todos los campos.");
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
 
    // Validación del teléfono colombiano
    const regexTelefonoColombia = /^(?:\+57\s?)?(3\d{2}|60[1-8])[-\s]?\d{3}[-\s]?\d{4}$/;
    if (!regexTelefonoColombia.test(telefono)) {
        // alert("Introduce un número de teléfono válido. Ej: 3001234567 o +57 604 123 4567");
        // Mostrar alerta de error
            Swal.fire({
                title: 'Error al ingresar número de teléfono',
                text: 'Introduce un número de teléfono válido. Ej: 3001234567 o +57 604 123 4567',
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
 
    // Confirmar contraseñas
    if (contrasena !== confirmar) {
        // alert("Las contraseñas no coinciden");
        // Mostrar alerta de error
            Swal.fire({
                title: 'Las contraseñas no coinciden',
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
 
    // Verificación del correo
    const listaUsuarios = JSON.parse(localStorage.getItem('listaUsuarios')) || [];
    const usuarioCreado = listaUsuarios.find(user => user.email === correo);
    if (usuarioCreado) {
        // return alert("El usuario ya está registrado");
        // Mostrar alerta de error
            Swal.fire({
                title: 'Error!',
                text: 'El usuario ya está registrado!',
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
 
    // Agregar a la lista y al localStorage
    listaUsuarios.push({
        usuario: usuario,
        nombre: nombre,
        correo: correo,
        telefono: telefono,
        contrasena: contrasena
    });
 
    localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios));
    // alert("Registro completado");
    Swal.fire({
            title: 'Registro Exitoso!',
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
            window.location.href = '../HTML/login.html';
        })
        
});