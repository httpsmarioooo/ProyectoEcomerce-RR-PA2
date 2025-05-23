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
        alert("Completa todos los campos.");
        return;
    }
 
    // Validación del teléfono colombiano
    const regexTelefonoColombia = /^(?:\+57\s?)?(3\d{2}|60[1-8])[-\s]?\d{3}[-\s]?\d{4}$/;
    if (!regexTelefonoColombia.test(telefono)) {
        alert("Introduce un número de teléfono colombiano válido. Ej: 3001234567 o +57 604 123 4567");
        return;
    }
 
    // Confirmar contraseñas
    if (contrasena !== confirmar) {
        alert("Las contraseñas no coinciden");
        return;
    }
 
    // Verificación del correo
    const listaUsuarios = JSON.parse(localStorage.getItem('listaUsuarios')) || [];
    const usuarioCreado = listaUsuarios.find(user => user.email === correo);
    if (usuarioCreado) {
        return alert("El usuario ya está registrado");
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
    alert("Registro completado");
    window.location.href = 'login.html';
});