document.addEventListener("DOMContentLoaded", function() {
    function guardarHistorial() {
        let fechaElem = document.getElementById("fecha");
        if (!fechaElem) {
            console.error("No se encontró el campo de fecha");
            return;
        }
        const datos = {
            fecha: fechaElem.value,
            municipio: document.getElementById("municipio")?.value || "",
            FGJRM: document.getElementById("FGJRM")?.value || "",
            resguardante_id: document.getElementById("resguardante")?.value || "",
            licencia: document.getElementById("licencia")?.value || "",
            vigencia: document.getElementById("vigencia")?.value || "",
            resguardante_interno: document.getElementById("resguardante_interno")?.value || "",
            licencia_interna: document.getElementById("licencia_interna")?.value || "",
            vigencia_interna: document.getElementById("vigencia_interna")?.value || "",
            numero_economico: document.getElementById("numero_economico")?.value || "",
            tipo: document.querySelector('input[name="condicion"]:checked')?.value || "",
            km: document.getElementById("km")?.value || ""
        };

        fetch("../php/guardar_historial.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams(datos).toString()
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                Swal.fire("Éxito", data.success, "success");
            } else {
                Swal.fire("Error", data.error, "error");
            }
        })
        .catch(error => console.error("Error:", error));
    }

    document.querySelector(".btn").addEventListener("click", function(event) {
        event.preventDefault();
        guardarHistorial();
    });
});
