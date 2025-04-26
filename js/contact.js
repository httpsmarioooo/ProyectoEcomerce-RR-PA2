document.getElementById('formulario').addEventListener('submit', function (e) {
    e.preventDefault();
  
    // Puedes validar los campos si quieres
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const asunto = document.getElementById('asunto').value;
    const mensaje = document.getElementById('mensaje').value;
  
    if (nombre && correo && asunto && mensaje) {
        // Mostrar alerta de verificacion y (MJ-Gabi) modificar con CSS usando las clases
        Swal.fire({
            title: '¡Bien hecho!',
            text: 'Tu mensaje fue enviado, Pronto nos contáctaremos contigo.',
            imageUrl: '/assets/images/BLUET.png', //Imagen BlueT
            imageWidth: 120,
            imageHeight: 120,
            imageAlt: 'Ícono personalizado',
            confirmButtonText: 'Aceptar',
            customClass: {
                popup: 'mi-popup', //Clase del cuadro de la alerta
                title: 'mi-titulo', //Clase del titulo de la alerta
                htmlContainer: 'mi-subtitulo', //Clase del subtitulo de la alerta
                confirmButton: 'mi-boton' //Boton de confirmar
            } //?--------------en el CSS dejo un ejemplo
        });

        // Limpiar formulario
        document.getElementById('formulario').reset();
    } else {
        // Mostrar alerta de error
        Swal.fire({
            title: 'Email inválido',
            text: 'Por favor revisa que el correo esté bien escrito.',
            imageUrl: '/assets/images/bluet_advertencia.png', //Imagen BlueT
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

/*
document.getElementById('formulario').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const email = document.getElementById('correo').value;
    const apiKey = 'bc73d1ffeaa828185b20fcd2a54177de';
  
    fetch(`https://apilayer.net/api/check?access_key=${apiKey}&email=${email}&smtp=1&format=1`)
    .then(response => response.json())
    .then(data => {
        if (data.format_valid && data.smtp_check) {
            // Mostrar alerta de verificacion y (MJ-Gabi) modificar con CSS usando las clases
            Swal.fire({
                title: '¡Bien hecho!',
                text: 'Tu mensaje fue enviado, Pronto nos contáctaremos contigo.',
                imageUrl: '../Images/BLUET.png', //Imagen BlueT
                imageWidth: 80,
                imageHeight: 80,
                imageAlt: 'Ícono personalizado',
                confirmButtonText: 'Aceptar',
                customClass: {
                    popup: 'mi-popup', //Clase del cuadro de la alerta
                    title: 'mi-titulo', //Clase del titulo de la alerta
                    htmlContainer: 'mi-subtitulo', //Clase del subtitulo de la alerta
                    confirmButton: 'mi-boton' //Boton de confirmar
                } //?--------------en el CSS dejo un ejemplo
            });
  
            // Limpiar formulario
            document.getElementById('formulario').reset();
  
        } else {
            // Mostrar alerta de error
            Swal.fire({
                title: 'Email inválido',
                text: 'Por favor revisa que el correo esté bien escrito.',
                imageUrl: '../Images/BlueT-triste.png', //Imagen BlueT
                imageWidth: 80,
                imageHeight: 80,
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
    })
    .catch(error => {
        console.error('Error al verificar el email:', error);
        // Mostrar alerta de error de red
        Swal.fire({
            title: 'Error de conexión',
            text: 'Hubo un problema al verificar el correo. Intenta más tarde.',
            imageUrl: '../Images/BlueT-Preocupada.png', //Imagen BlueT
            imageWidth: 80,
            imageHeight: 80,
            imageAlt: 'Ícono personalizado',
            confirmButtonText: 'Aceptar',
            customClass: {
                popup: 'mi-popup', //Clase del cuadro de la alerta
                title: 'mi-titulo', //Clase del titulo de la alerta
                htmlContainer: 'mi-subtitulo', //Clase del subtitulo de la alerta
                confirmButton: 'mi-boton' //Boton de confirmar
            }
        });
    });
});*/
