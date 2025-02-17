document.addEventListener("DOMContentLoaded", function () {
    // Ocultar todas las pestañas
    document.querySelectorAll(".tabcontent").forEach(tab => {
        tab.style.display = "none";
    });

    // Mostrar la pestaña "Exterior" por defecto
    const defaultTab = document.getElementById("Exterior");
    const defaultButton = document.getElementById("exterior");

    if (defaultTab && defaultButton) {
        defaultTab.style.display = "block"; // Mostrar pestaña
        defaultButton.classList.add("active"); // Marcar botón como activo
    }

    // Cargar valores de los radios desde localStorage
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
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

    // Eliminar la clase "active" de todos los botones
    document.querySelectorAll(".tablink").forEach(btn => {
        btn.classList.remove("active");
    });

    // Mostrar la pestaña seleccionada y activar el botón correspondiente
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.style.display = "block";
    }
    
    if (evt && evt.currentTarget) {
        evt.currentTarget.classList.add("active");
    }
}

// Función para manejar el botón "Siguiente"
function nextTab() {
    const tabs = ["Exterior", "Interior", "Accesorios"];
    let currentTabIndex = tabs.findIndex(tab => document.getElementById(tab).style.display === "block");

    if (currentTabIndex < tabs.length - 1) {
        // Mover a la siguiente pestaña
        document.getElementById(tabs[currentTabIndex + 1]).style.display = "block";
        document.getElementById(tabs[currentTabIndex]).style.display = "none";

        // Activar el botón de la nueva pestaña
        document.querySelectorAll(".tablink").forEach(btn => btn.classList.remove("active"));
        document.getElementById(tabs[currentTabIndex + 1].toLowerCase()).classList.add("active");
    } else {
        // Redirigir a la página de fotografías
        window.location.href = "../formulario/fotografias.html";
    }
}
