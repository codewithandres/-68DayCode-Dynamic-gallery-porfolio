const grid = new Muuri(".grid", {
  layout: {
    rounding: false,
  },
});

window.addEventListener("load", () => {
  grid.refreshItems().layout();
  document.getElementById("grid").classList.add("imagenes-cargadas");

  const enlaces = document.querySelectorAll("#categorias a");
  enlaces.forEach((elemento) => {
    elemento.addEventListener("click", (event) => {
      event.preventDefault();

      enlaces.forEach((enlaces) => enlaces.classList.remove("activo"));
      event.target.classList.add("activo");

      const categorias = event.target.textContent.toLowerCase();

      categorias === "todos"
        ? grid.filter("[data-categoria]")
        : grid.filter(`[data-categoria="${categorias}"]`);
    });
  });
});
