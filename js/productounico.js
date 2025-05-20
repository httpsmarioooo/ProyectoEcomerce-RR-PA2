document.addEventListener("DOMContentLoaded", () => {
  // ================= CALENDARIO =====================
  const fechaBtn = document.getElementById("fecha-envio-btn");
  const fechaInput = document.getElementById("fecha-envio-input");

  fechaInput.style.display = "none";

  const hoy = new Date();
  hoy.setDate(hoy.getDate() + 3);

  const fp = flatpickr(fechaInput, {
    minDate: hoy,
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
});
