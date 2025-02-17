let videoStream;
let imagenDestino;
let contadorExtra = 1;

function abrirCamara(idImagen) {
    imagenDestino = document.getElementById(idImagen);
    const modal = document.getElementById("modalCamara");
    const video = document.getElementById("video");

    modal.style.display = "flex";

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("Tu navegador no soporta acceso a la cámara.");
        return;
    }
    
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            videoStream = stream;
            video.srcObject = stream;
        })
        .catch(function (error) {
            alert("No se pudo acceder a la cámara.");
            console.error(error);
        });
}

function tomarFoto() {
    const canvas = document.getElementById("canvas");
    const video = document.getElementById("video");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imagenBase64 = canvas.toDataURL("image/png");
    imagenDestino.src = imagenBase64;

    localStorage.setItem(imagenDestino.id, imagenBase64);
    cerrarCamara();
}

function cerrarCamara() {
    const modal = document.getElementById("modalCamara");

    if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
    }

    modal.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
    const imagenes = document.querySelectorAll("img");
    imagenes.forEach(imagen => {
        const imagenGuardada = localStorage.getItem(imagen.id);
        if (imagenGuardada) {
            imagen.src = imagenGuardada;
        }
    });
});

function finalizarFormulario() {
    localStorage.clear();
}

function agregarFotoExtra() {
    const contenedor = document.getElementById("extra-fotos-container");

    let filas = contenedor.getElementsByClassName("foto-apartado-container");
    let ultimaFila = filas[filas.length - 1];

    if (!ultimaFila || ultimaFila.children.length >= 2) {
        ultimaFila = document.createElement("div");
        ultimaFila.classList.add("foto-apartado-container");
        contenedor.appendChild(ultimaFila);
    }

    const nuevoApartado = document.createElement("div");
    nuevoApartado.classList.add("foto-apartado");
    const idExtra = `extra-dinamico-${contadorExtra}`;

    nuevoApartado.innerHTML = `
        <p>Extra ${contadorExtra}:</p>
        <button class="btn-remove" onclick="eliminarFotoExtra(this)"> ✖</button>
        <img src="../../img/agregar.png" alt="extra" class="foto-preview" id="${idExtra}" onclick="abrirCamara('${idExtra}')">
        <textarea id="observaciones" name="observaciones" rows="2" cols="5"  placeholder="Observaciones"></textarea>
    `;

    ultimaFila.appendChild(nuevoApartado);
    contadorExtra++;
}

function eliminarFotoExtra(boton) {
    const apartado = boton.parentElement;
    const fila = apartado.parentElement;

    apartado.remove();

    if (fila.children.length === 0) {
        fila.remove();
    }

    // Si no quedan imágenes, reiniciar el contador a 1
    const contenedor = document.getElementById("extra-fotos-container");
    if (contenedor.getElementsByClassName("foto-apartado").length === 0) {
        contadorExtra = 1;
    }
}
