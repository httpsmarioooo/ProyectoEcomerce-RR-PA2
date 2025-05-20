document.addEventListener("DOMContentLoaded", () => {
  // ================= CALENDARIO =====================
  const fechaBtn = document.getElementById("fecha-envio-btn");
  const fechaInput = document.getElementById("fecha-envio-input");

  fechaInput.style.display = "none";

  const today = new Date();
  today.setDate(today.getDate() + 3);

  const fp = flatpickr(fechaInput, {
    minDate: today,
    dateFormat: "Y-m-d",
    onClose: (selectedDates, dateStr) => {
      if (dateStr) {
        fechaBtn.textContent = dateStr;
        fechaBtn.style.backgroundColor = "#4c9fd4";
        fechaBtn.style.color = "white";
        fechaInput.style.display = "none";
      }
    },
  });

  fechaBtn.addEventListener("click", () => {
    fechaInput.style.display = "inline-block";
    fp.open();
  });

  // ================= CARRUSEL =====================
  const carrusel = document.querySelector(".carrusel");
  const imagenes = document.querySelectorAll(".carrusel-img");
  const btnIzq = document.querySelector(".carrusel-btn.izquierda");
  const btnDer = document.querySelector(".carrusel-btn.derecha");

  const imagenesVisibles = 3;
  const totalSlides = Math.ceil(imagenes.length / imagenesVisibles);
  let index = 0;

  function actualizarCarrusel() {
    const porcentaje = (index * 100) / imagenesVisibles;
    carrusel.style.transform = `translateX(-${porcentaje}%)`;
  }

  btnDer.addEventListener("click", () => {
    index = (index + 1) % totalSlides;
    actualizarCarrusel();
  });

  btnIzq.addEventListener("click", () => {
    index = (index - 1 + totalSlides) % totalSlides;
    actualizarCarrusel();
  });

  setInterval(() => {
    index = (index + 1) % totalSlides;
    actualizarCarrusel();
  }, 4000);

  // ================= CARRITO =====================
  const btnAgregarCarrito = document.getElementById("btn-agregarcarrito");

  btnAgregarCarrito.addEventListener("click", () => {
    const productoUnico = {
      titulo: document.getElementById("nombre-producto").textContent,
      precio: document.getElementById("precio").textContent,
    };
    agregarAlCarrito(productoUnico);
  });

  function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarToast("Producto agregado al carrito");
  }

  function mostrarToast(mensaje) {
    const container = document.getElementById("toast-container");
    if (!container) return;
    const toast = document.createElement("div");
    toast.className = "toast align-items-center border-0 show";
    toast.style.minWidth = "220px";
    toast.style.marginBottom = "10px";
    toast.innerHTML = `
      <div class="toast d-flex">
        <div class="toast-body">
          ${mensaje}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
      </div>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove("show");
      toast.classList.add("hide");
      setTimeout(() => toast.remove(), 300);
    }, 1500);

    toast.querySelector(".btn-close").onclick = () => toast.remove();
  }
});
