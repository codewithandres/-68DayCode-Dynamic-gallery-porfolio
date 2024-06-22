// Inicializamos Muuri con la clase "grid" y desactivamos el redondeo en el layout
const grid = new Muuri(".grid", {
    layout: {
        rounding: false,
    },
});

// Esperamos a que la ventana cargue completamente
window.addEventListener("load", () => {
    // Refrescamos los ítems del grid y aplicamos el layout
    grid.refreshItems().layout();
    // Añadimos la clase "imagenes-cargadas" al elemento con id "grid"
    document.getElementById("grid").classList.add("imagenes-cargadas");

    // Seleccionamos todos los enlaces dentro del elemento con id "categorias"
    const enlaces = document.querySelectorAll("#categorias a");
    // Añadimos un listener de click a cada enlace
    enlaces.forEach((elemento) => {
        elemento.addEventListener("click", event => {
            event.preventDefault(); // Prevenimos el comportamiento por defecto del enlace

            // Removemos la clase "activo" de todos los enlaces
            enlaces.forEach(enlace => enlace.classList.remove("activo"));
            // Añadimos la clase "activo" al enlace clicado
            event.target.classList.add("activo");

            // Obtenemos la categoría del texto del enlace clicado
            const categorias = event.target.textContent.toLowerCase();

            // Filtramos los ítems del grid según la categoría seleccionada
            categorias === 'todos'
                ? grid.filter('[data-categoria]')
                : grid.filter(`[data-categoria='${categorias}']`);
        });
    });

    // Añadimos un listener de input a la barra de búsqueda
    document.querySelector("#barra-busqueda").addEventListener("input", (event) => {
        const busqueda = event.target.value; // Obtenemos el valor de búsqueda

        // Filtramos los ítems del grid según las etiquetas que coincidan con la búsqueda
        grid.filter((item) =>
            item.getElement().dataset.etiquetas.includes(busqueda)
        );
    });

    // Seleccionamos el overlay
    const overlay = document.getElementById("overlay");
    // Añadimos un listener de click a cada imagen dentro de los ítems del grid
    document.querySelectorAll(".grid .item img").forEach((elemento) => {
        elemento.addEventListener("click", () => {
            const ruta = elemento.getAttribute("src"); // Obtenemos la ruta de la imagen
            const descripcion = elemento.parentNode.parentNode.dataset.descripcion; // Obtenemos la descripción

            overlay.classList.add("activo"); // Añadimos la clase "activo" al overlay

            // Actualizamos la imagen y la descripción del overlay
            document.querySelector("#overlay img").src = ruta;
            document.querySelector("#overlay .descripcion").textContent = descripcion;
        });
    });

    // Añadimos un listener de click al botón de cerrar el popup
    document.querySelector("#btn-cerrar-popup").addEventListener("click", () => {
        overlay.classList.remove("activo"); // Removemos la clase "activo" del overlay
    });

    // Añadimos un listener de click al overlay
    document.querySelector('#overlay').addEventListener('click', event => {
        // Si el elemento clicado es el overlay, removemos la clase "activo"
        event.target.id === 'overlay' ? overlay.classList.remove('activo') : '';
    });
});
