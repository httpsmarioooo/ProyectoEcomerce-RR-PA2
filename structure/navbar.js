fetch("/components/navbar.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("navbar").innerHTML = data;
    });

// Espera a que el navbar esté en el DOM
document.addEventListener('DOMContentLoaded', function () {
    // Si el navbar se carga por AJAX/fetch, pon este código en el callback de carga exitosa
    setTimeout(function() {
        const usuarioActivo = sessionStorage.getItem('usuarioActivo');
        // Navbar principal
        const loginBtn = document.querySelector('.btn-ingresar');
        // Offcanvas
        const offLoginBtn = document.querySelector('.btnoff-ingresar');
        
        // Crear botón cerrar sesión para navbar principal
        if (usuarioActivo && loginBtn) {
            // Oculta botón ingresar
            loginBtn.style.display = 'none';
            // Si no existe el botón cerrar sesión, lo agrega
            if (!document.getElementById('logout-btn')) {
                const li = document.createElement('li');
                li.className = 'nav-item';
                li.innerHTML = `
                    <button id="logout-btn" class="btn-ingresar d-flex align-items-center" style="background:none;border:none;cursor:pointer;">
                        <strong>Cerrar sesión</strong>
                        <box-icon name="log-out" type="solid" color="#0184A9" class="ms-2"></box-icon>
                    </button>
                `;
                loginBtn.parentNode.parentNode.appendChild(li);
                document.getElementById('logout-btn').addEventListener('click', function () {
                    sessionStorage.removeItem('usuarioActivo');
                    window.location.href = '/html/index.html';
                });
            }
        }

        // Offcanvas cerrar sesión
        if (usuarioActivo && offLoginBtn) {
            offLoginBtn.style.display = 'none';
            // Busca el contenedor d-flex
            const offcanvasMenu = offLoginBtn.closest('.d-flex');
            if (offcanvasMenu && !document.getElementById('logout-btn-off')) {
                const li = document.createElement('li');
                li.className = 'nav-item';
                li.innerHTML = `
                    <button id="logout-btn-off" class="btnoff-ingresar d-flex align-items-center" style="background:none;border:none;cursor:pointer;">
                        <strong>Cerrar sesión</strong>
                        <box-icon name="log-out" type="solid" color="#ffffff" class="ms-2"></box-icon>
                    </button>
                `;
                offcanvasMenu.appendChild(li);
                document.getElementById('logout-btn-off').addEventListener('click', function () {
                    sessionStorage.removeItem('usuarioActivo');
                    window.location.href = '/index.html';
                });
            }
        }
    }, 200); // Espera breve para asegurar que el navbar esté en el DOM
});