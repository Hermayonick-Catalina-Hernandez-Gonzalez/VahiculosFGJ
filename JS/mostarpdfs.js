document.getElementById('Verificacion').addEventListener('submit', function(event) {
    event.preventDefault(); // Previene que la página se recargue
});

function openTab(evt, tabName) {
    const tabcontent = document.getElementsByClassName("tabcontent");
    const tablinks = document.getElementsByClassName("tablink");

    // Ocultar todas las pestañas
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Eliminar la clase 'active' de todos los botones de pestañas
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Mostrar la pestaña actual y agregar una clase "active" al botón que abrió la pestaña
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Inicializar la primera pestaña como activa al cargar la página
document.addEventListener("DOMContentLoaded", function () {
    // Verificar si ya tiene la clase 'active' al cargar
    const reglasTab = document.getElementById("reglas");
    if (!reglasTab.classList.contains("active")) {
        openTab({ currentTarget: reglasTab }, "Reglas");
    }
});

//funciones par ala firma 
function abrirFirma() {
    document.getElementById("modalFirma").style.display = "flex";
}

function cerrarFirma() {
    document.getElementById("modalFirma").style.display = "none";
}

// Funciones para capturar la firma en canvas
let canvas = document.getElementById("canvasFirma");
let ctx = canvas.getContext("2d");
let pintando = false;

canvas.addEventListener("mousedown", iniciarDibujo);
canvas.addEventListener("mouseup", detenerDibujo);
canvas.addEventListener("mousemove", dibujar);

function iniciarDibujo(event) {
    pintando = true;
    dibujar(event);
}

function detenerDibujo() {
    pintando = false;
    ctx.beginPath();
}

function dibujar(event) {
    if (!pintando) return;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";

    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function limpiarFirma() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function guardarFirma() {
    let canvas = document.getElementById("canvasFirma");
    let imagenFirma = canvas.toDataURL("image/png"); // Convertir firma a imagen

    // Mostrar alerta de éxito
    Swal.fire({
        icon: "success",
        title: "Firma Guardada",
        text: "La firma ha sido registrada correctamente.",
    });

    // Cerrar el modal de firma
    cerrarFirma();

    // Llamar a generarPDF1() con la firma y descargarlo
    descargarPDFConFirma(imagenFirma);
}
