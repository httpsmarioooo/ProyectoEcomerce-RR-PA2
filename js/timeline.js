
  // Efecto fade al hacer scroll
  const items = document.querySelectorAll(".timeline-content");

  const observer = new IntersectionObserver( entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.transform = "translateY(0)";
        entry.target.style.opacity = "1";
      }
    });
  }, { threshold: 0.3 });

  items.forEach(item => {
    item.style.transform = "translateY(50px)";
    item.style.opacity = "0";
    observer.observe(item);
  });
