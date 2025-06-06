// URL base de la API
const API_URL = 'http://localhost:8080'; // verificar la ruta segun el backend

//manejar errores de respuesta HTTP
function handleResponse(response) {
    return response.json().then(data => {
        if (!response.ok) {
            const error = data || { message: `Error HTTP: ${response.status}` };
            throw error;
        }
        return data;
    });
}

//guardar el token JWT en localStorage
function saveToken(token) {
    localStorage.setItem('authToken', token);
}

//obtener el token JWT de localStorage
function getToken() {
    return localStorage.getItem('authToken');
}

//eliminar el token JWT de localStorage (logout)
function removeToken() {
    localStorage.removeItem('authToken');
}

//verificar si el usuario está autenticado
function isAuthenticated() {
    return getToken() !== null;
}

//guardar la información del usuario en localStorage
function saveUserInfo(userData) {
    localStorage.setItem('usuarioActivo', JSON.stringify(userData));
}

//obtener la información del usuario de localStorage
function getUserInfo() {
    const userInfo = localStorage.getItem('usuarioActivo');
    return userInfo ? JSON.parse(userInfo) : null;
}

//eliminar la información del usuario de localStorage
function removeUserInfo() {
    localStorage.removeItem('usuarioActivo');
}