document.addEventListener("DOMContentLoaded", function () {
    // Ocultar todas las pestañas
    const tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Mostrar la pestaña "Exterior" por defecto
    const defaultTab = document.getElementById("Exterior");
    const defaultButton = document.getElementById("exterior");

    if (defaultTab && defaultButton) {
        defaultTab.style.display = "block"; // Mostrar pestaña
        defaultButton.classList.add("active"); // Marcar botón como activo
    }

    // Evento para cambiar de pestaña
    document.querySelectorAll(".tablink").forEach(button => {
        button.addEventListener("click", function (event) {
            openTab(event, this.getAttribute("data-tab"));
        });
    });

    // Cargar valores de los radios desde localStorage
    const radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach(radio => {
        const savedValue = localStorage.getItem(radio.name);
        if (savedValue && radio.value === savedValue) {
            radio.checked = true;
        }
        radio.addEventListener("change", function () {
            localStorage.setItem(radio.name, this.value);
        });
    });
});

function openTab(evt, tabName) {
    // Ocultar todas las pestañas
    document.querySelectorAll(".tabcontent").forEach(tab => {
        tab.style.display = "none";
    });

    // Eliminar clase "active" de todos los botones
    document.querySelectorAll(".tablink").forEach(btn => {
        btn.classList.remove("active");
    });

    // Mostrar la pestaña seleccionada y activar el botón correspondiente
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("active");
}

// Función para manejar el botón "Siguiente"
function nextTab() {
    const tabs = ["Exterior", "Interior", "Accesorios"];
    let currentTabIndex = tabs.findIndex(tab => document.getElementById(tab).style.display === "block");

    if (currentTabIndex < tabs.length - 1) {
        // Mover a la siguiente pestaña
        document.getElementById(tabs[currentTabIndex + 1].toLowerCase()).click();
    } else {
        // Redirigir a la página de fotografías
        window.location.href = "../formulario/fotografias.html";
    }
}
