const formulario = document.querySelector("#formulario")
formulario.addEventListener('submit',(e)=>{
    e.preventDefault()
    const usuario = document.querySelector("#usuario").value;
    const nombre = document.querySelector("#nombre").value;
    const correo = document.querySelector("#correo").value;
    const contrasena = document.querySelector("#contrasena").value;
    const confirmar = document.querySelector("#confirmar").value

    // Validacion de los campos
    if (!usuario || !nombre || !correo || !contrasena || !confirmar) {
        alert("Completa todos los campos.");
        return;
    }
    
    // Confirmar contraseñas
    if(confirmar !== contrasena){
        alert("Las contraseñas no coinciden");
        return;
    }

    //Verificacion del correo para el usuario
    const listaUsuarios = JSON.parse(localStorage.getItem('listaUsuarios')) || [];
    const usuarioCreado = listaUsuarios.find(user => user.email === correo)
    if(usuarioCreado){
        return alert("El usuario ya está registrado");
    }
    
    //Agregar a la lista y al localStorage
    listaUsuarios.push({
        usuario: usuario, 
        nombre: nombre,
        correo: correo,
        constrasena:contrasena
    })

    localStorage.setItem('listaUsuarios',JSON.stringify(listaUsuarios))
    alert("Registro completado")
    window.location.href='login.html'

})