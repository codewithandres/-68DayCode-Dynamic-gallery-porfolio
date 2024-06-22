
const grid = new Muuri(".grid", {
    layout: {
        rounding: false,
    },
});

window.addEventListener("load", () => {
    grid.refreshItems().layout();
    document.getElementById("grid").classList.add("imagenes-cargadas");
    // agregamos los listener para filtrar por categorias
    const enlaces = document.querySelectorAll("#categorias a");
    enlaces.forEach((elemento) => {
        elemento.addEventListener("click", event => {
            event.preventDefault();

            enlaces.forEach(enlaces => enlaces.classList.remove("activo"));
            event.target.classList.add("activo");

            const categorias = event.target.textContent.toLowerCase();

            categorias === 'todos'
                ? grid.filter('[data-categoria]')
                : grid.filter(`[data-categoria='${categorias}']`);
        });
    });
    // agregamos llistener para la barra de busqueda
    document
        .querySelector("#barra-busqueda")
        .addEventListener("input", (event) => {
            const busqueda = event.target.value;

            grid.filter((iten) =>
                iten.getElement().dataset.etiquetas.includes(busqueda)
            );
        });

    // agremos listener para el overlay
    const overlay = document.getElementById("overlay");
    document.querySelectorAll(".grid .item img").forEach((elemento) => {
        elemento.addEventListener("click", () => {
            const ruta = elemento.getAttribute("src");
            const descripcion = elemento.parentNode.parentNode.dataset.descripcion;

            overlay.classList.add("activo");

            document.querySelector("#overlay img").src = ruta;
            document.querySelector("#overlay .descripcion").textContent =  descripcion;
        });
    });
    // listener para cerrar el botton
    document.querySelector("#btn-cerrar-popup")
        .addEventListener("click", () =>  overlay.classList.remove("activo"));

    // eventListener del overlay 
    document.querySelector('#overlay')
        .addEventListener('click', event => {
            event.target.id === 'overlay'
                ? overlay.classList.remove('activo')
                : '';
        });
});
