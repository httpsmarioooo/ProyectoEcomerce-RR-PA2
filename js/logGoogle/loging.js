const loginForm = document.querySelector('#loginForm');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#emailg').value.trim();
    const password = document.querySelector('#passwordg').value;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const validUser = users.find(user => user.email === email && user.password === password);
    if (!validUser) {
        alert('Usuario y/o contraseña incorrectos!');
        return;
    }
    alert(`Bienvenido ${validUser.name || validUser.email}`);
    localStorage.setItem('login_success', JSON.stringify(validUser));
    window.location.href = '/html/index.html';
});