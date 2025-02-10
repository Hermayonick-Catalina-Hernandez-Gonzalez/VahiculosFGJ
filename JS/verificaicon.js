
document.getElementById('formularioVerificacion').addEventListener('submit', function(event) {
    event.preventDefault(); // Previene que la página se recargue
});

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    // Ocultar todas las pestañas
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Eliminar la clase "active" de todas las pestañas
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Mostrar la pestaña seleccionada
    document.getElementById(tabName).style.display = "block";

    // Añadir la clase "active" al botón de la pestaña
    evt.currentTarget.className += " active";
}

// Al cargar la página, mostrar la primera pestaña por defecto
document.getElementById("exterior").click();


function openTab(evt, tabName) {
    // Ocultar todas las pestañas
    const tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Eliminar la clase "active" de todos los botones de pestañas
    const tablinks = document.getElementsByClassName("tablink");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Mostrar la pestaña actual y agregar una clase "active" al botón que abrió la pestaña
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Función para manejar el botón "Siguiente"
function nextTab() {
    const tabs = ["Exterior", "Interior", "Accesorios"];
    let currentTab = tabs.findIndex(tab => document.getElementById(tab).style.display === "block");

    if (currentTab < tabs.length - 1) {
        // Mostrar la siguiente pestaña
        openTab({ currentTarget: document.getElementById(tabs[currentTab + 1].toLowerCase()) }, tabs[currentTab + 1]);
    } else {
        // Redirigir a la página de fotografías
        window.location.href = "../formulario/fotografias.html";
    }
}

// Inicializar la primera pestaña como activa
document.addEventListener("DOMContentLoaded", function() {
    openTab({ currentTarget: document.getElementById("exterior") }, "Exterior");
});
document.addEventListener("DOMContentLoaded", function () {
    const inputs = document.querySelectorAll("input");
    const textareas = document.querySelectorAll("textarea");

    // Cargar valores almacenados en localStorage
    inputs.forEach(input => {
        const savedValue = localStorage.getItem(input.name);
        if (savedValue) {
            if (input.type === 'radio' && input.value === savedValue) {
                input.checked = true;
            } else if (input.type !== 'radio') {
                input.value = savedValue;
            }
        }

        // Guardar cambios en localStorage cuando se escriba en los campos
        input.addEventListener("input", function () {
            if (input.type === 'radio') {
                const selectedRadio = document.querySelector(`input[name="${input.name}"]:checked`);
                if (selectedRadio) {
                    localStorage.setItem(input.name, selectedRadio.value);
                }
            } else {
                localStorage.setItem(input.name, input.value);
            }
        });
    });

    // Guardar cambios para los textareas también
    textareas.forEach(textarea => {
        const savedValue = localStorage.getItem(textarea.id);
        if (savedValue) {
            textarea.value = savedValue;
        }

        // Guardar cambios cuando se escriba en el textarea
        textarea.addEventListener("input", function () {
            localStorage.setItem(textarea.id, textarea.value);
        });
    });
});

// Función para limpiar el almacenamiento local (opcional)
function limpiarFormulario() {
    localStorage.clear();
    document.querySelectorAll("input").forEach(input => input.value = "");
    document.querySelectorAll("textarea").forEach(textarea => textarea.value = "");
    document.querySelectorAll("input[type='radio']").forEach(input => input.checked = false);
}