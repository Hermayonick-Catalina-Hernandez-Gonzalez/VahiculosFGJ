let videoStream;
let imagenDestino;

function abrirCamara(idImagen) {
    imagenDestino = document.getElementById(idImagen);
    const modal = document.getElementById("modalCamara");
    const video = document.getElementById("video");

    // Mostrar modal
    modal.style.display = "flex";

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("Tu navegador no soporta acceso a la cámara.");
        return;
    }
    
    // Acceder a la cámara
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

    // Ajustar el tamaño del canvas al video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Dibujar la imagen del video en el canvas
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convertir la imagen a URL y asignarla
    const imagenBase64 = canvas.toDataURL("image/png");
    imagenDestino.src = imagenBase64;

    // Guardar la imagen en localStorage para que persista
    localStorage.setItem(imagenDestino.id, imagenBase64);

    // Cerrar la cámara
    cerrarCamara();
}

function cerrarCamara() {
    const modal = document.getElementById("modalCamara");

    // Detener el stream de la cámara
    if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
    }

    // Ocultar el modal
    modal.style.display = "none";
}

// Al cargar la página, recuperar las imágenes desde localStorage
window.onload = function () {
    const imagenes = ["foto-frontal", "foto-posterior", "foto-derecho", "foto-izquierdo"];
    imagenes.forEach(fotoId => {
        const fotoBase64 = localStorage.getItem(fotoId);
        if (fotoBase64) {
            document.getElementById(fotoId).src = fotoBase64;
        }
    });
}

function finalizarFormulario() {
    // Limpiar localStorage
    localStorage.clear();

    // Resetear el formulario
    document.getElementById("Verificacion").reset();

    // Borrar imágenes almacenadas en localStorage y en la página
    const imagenes = ["foto-frontal", "foto-posterior", "foto-derecho", "foto-izquierdo"];
    imagenes.forEach(fotoId => {
        localStorage.removeItem(fotoId);
        let imgElement = document.getElementById(fotoId);
        if (imgElement) {
            imgElement.src = "";
        }
    });

    // Limpiar los iframes de vista previa
    document.getElementById("preview1").src = "";
    document.getElementById("preview2").src = "";

    // Mostrar mensaje de éxito
    Swal.fire({
        title: "Good job!",
        text: "Datos enviados correctamente.",
        icon: "success"
    }).then(() => {
        window.location.href = "../vistas/formulario/pdfs.html"; // Redirige después de aceptar
    });
}
