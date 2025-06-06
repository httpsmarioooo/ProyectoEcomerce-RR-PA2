fetch("/components/navbar.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("navbar").innerHTML = data;

        setTimeout(function() {
            // const usuarioActivo = sessionStorage.getItem('usuarioActivo');
            const isUserAuthenticated = isAuthenticated();
            const userInfo = getUserInfo();

            // Elimina el <li> del botón ingresar principal si hay sesión
            if (isUserAuthenticated) {
                const loginLi = document.querySelector('.btn-ingresar')?.closest('li');
                if (loginLi) loginLi.remove();

                const offLoginLi = document.querySelector('.btn-off-login')?.closest('li');
                if (offLoginLi) offLoginLi.remove();
            }

            // Navbar principal: botón cerrar sesión
            const navList = document.querySelector('.navbar-nav.align-items-center');
            if (isUserAuthenticated && navList && !document.getElementById('logout-btn')) {
                const li = document.createElement('li');
                li.className = 'nav-item';
                li.innerHTML = `
                    <button id="logout-btn" class="btn-ingresar d-flex align-items-center" style="background:#E3FCF9;border:none;cursor:pointer;">
                        <strong>Cerrar sesión</strong>
                        <box-icon name="log-out" type="solid" color="#0184A9" class="ms-2"></box-icon>
                    </button>
                `;
                navList.appendChild(li);
                document.getElementById('logout-btn').addEventListener('click', function () {
                    // sessionStorage.removeItem('usuarioActivo');
                    // window.location.href = '/index.html';

                    // Usar las funciones de api.js para cerrar sesión
                    removeToken();
                    removeUserInfo();
                    window.location.href = '../index.html';
                });
            }

            // Offcanvas cerrar sesión
            const offcanvasMenu = document.querySelector('.offcanvas-body .d-flex');
            if (isUserAuthenticated && offcanvasMenu && !document.getElementById('logout-btn-off')) {
                const li = document.createElement('li');
                li.className = 'nav-item';
                li.innerHTML = `
                    <button id="logout-btn-off"
                        class="btnoff-ingresar d-flex align-items-center justify-content-center w-100"
                        style="background:#0184A9;color:#fff;border:none;cursor:pointer;padding:12px 0;border-radius:8px;font-weight:bold;font-size:1.1em;">
                        <strong style="color:#fff;">Cerrar sesión</strong>
                        <box-icon name="log-out" type="solid" color="#fff" class="ms-2"></box-icon>
                    </button>
                `;
                offcanvasMenu.appendChild(li);
                document.getElementById('logout-btn-off').addEventListener('click', function () {
                    // sessionStorage.removeItem('usuarioActivo');
                    // window.location.href = '/html/index.html';

                    // Usar las funciones de api.js para cerrar sesión
                    removeToken();
                    removeUserInfo();
                    window.location.href = '/index.html';
                });
            }
        }, 300);
    });