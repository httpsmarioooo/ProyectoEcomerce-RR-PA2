const signupForm = document.querySelector('#signupForm');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.querySelector('#nameg').value.trim();
    const email = document.querySelector('#emailg').value.trim();
    const password = document.querySelector('#passwordg').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const isUserRegistered = users.find(user => user.email === email);
    if (isUserRegistered) {
        alert('El usuario ya está registrado!');
        return;
    }

    // Asignar un id único incremental
    const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;

    users.push({ id: newId, name: name, email: email, password: password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registro Exitoso!');
    window.location.href = '/html/logGoogle/loging.html';
});


//comentario entrega tarea 9
//comentario entrega tarea 10