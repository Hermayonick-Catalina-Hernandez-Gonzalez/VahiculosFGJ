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

