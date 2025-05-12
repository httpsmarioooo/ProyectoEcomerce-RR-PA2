const formulario = document.querySelector("#formulario")
formulario.addEventListener('submit',(e)=>{
    e.preventDefault()
    const usuario = document.querySelector("#usuario").value;
    const nombre = document.querySelector("#nombre").value;
    const correo = document.querySelector("#correo").value;
    const contrasena = document.querySelector("#contrasena").value;

    const listaUsuarios = JSON.parse(localStorage.getItem('listaUsuarios')) || [];
    const usuarioCreado = listaUsuarios.find(user => user.email === correo)
    if(usuarioCreado){
        return alert("El usuario ya está registrado")
    }

    listaUsuarios.push({
        usuario: usuario, 
        nombre: nombre,
        correo: correo,
        constraseña:contrasena
    })

    localStorage.setItem('listaUsuarios',JSON.stringify(listaUsuarios))
    alert("Registro completado")
    window.location.href='login.html'

})