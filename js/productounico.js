document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("DOMContentLoaded", () => {
  // Elementos
  const fechaBtn = document.getElementById("fecha-envio-btn");
  const fechaInput = document.getElementById("fecha-envio-input");
  const carousel = document.getElementById("productos-carousel");
  const verMasBtn = document.getElementById("ver-mas-btn");

  // Ocultar input fecha al inicio
  fechaInput.style.display = "none";

  // Configurar minDate flatpickr (hoy + 3 días)
  const today = new Date();
  today.setDate(today.getDate() + 3);

  const fp = flatpickr(fechaInput, {
    minDate: today,
    dateFormat: "Y-m-d",
onClose(selectedDates, dateStr) {
  if (dateStr) {
    // Mostrar la fecha en el botón
    fechaBtn.textContent = dateStr;

    // Opcional: cambiar estilo para que se vea distinto
    fechaBtn.style.backgroundColor = "#4c9fd4";
    fechaBtn.style.color = "white";

    fechaInput.style.display = "none";
      }
    },
  });

  // Abrir calendario al click en botón
  fechaBtn.addEventListener("click", () => {
    fechaInput.style.display = "inline-block";
    fp.open();
  }