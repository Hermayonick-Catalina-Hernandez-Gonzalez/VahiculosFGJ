function buscarVehiculo() {
    let numeroEconomico = document.getElementById("numero_economico").value.trim();

    if (numeroEconomico === "") {
        Swal.fire({
            title: "Oops...",
            text: "Por favor, ingrese un número económico.",
            icon: "error",
            backdrop: false
        });
        return;
    }

    fetch(`http://localhost/xampp/VehiculosFGJ/php/buscarVehiculo.php?numero_economico=${numeroEconomico}`)
        .then(response => response.json())
        .then(data => {
            console.log("Respuesta del servidor:", data);

            if (data.error) {
                Swal.fire({
                    title: "Oops...",
                    text: data.error,
                    icon: "error",
                    backdrop: false
                });
            } else {
                document.getElementById("placa").value = data.placa || "";
                document.getElementById("serie").value = data.serie || "";
                document.getElementById("color").value = data.color || "";
                document.getElementById("clase_vehiculo").value = data.clase_vehiculo || "";
                document.getElementById("marca_vehiculo").value = data.marca_vehiculo || "";
                document.getElementById("submarca").value = data.submarca || "";
                document.getElementById("modelo_vehiculo").value = data.modelo_vehiculo || "";

                // Guardar datos en localStorage
                localStorage.setItem("placa", data.placa || "");
                localStorage.setItem("serie", data.serie || "");
                localStorage.setItem("color", data.color || "");
                localStorage.setItem("clase_vehiculo", data.clase_vehiculo || "");
                localStorage.setItem("marca_vehiculo", data.marca_vehiculo || "");
                localStorage.setItem("submarca", data.submarca || "");
                localStorage.setItem("modelo_vehiculo", data.modelo_vehiculo || "");

                Swal.fire({
                    title: "Good job!",
                    text: "Vehículo encontrado.",
                    icon: "success",
                    backdrop: false
                });
            }
        })
        .catch(error => {
            console.error("Error en fetch:", error);
            Swal.fire({
                title: "Oops...",
                text: "Error en la solicitud.",
                icon: "error",
                backdrop: false
            });
        });
}

// Recuperar datos guardados al cargar la página
document.addEventListener("DOMContentLoaded", function () {
    let inputs = document.querySelectorAll("input");
    inputs.forEach(input => {
        let savedValue = localStorage.getItem(input.id);
        if (savedValue) {
            input.value = savedValue;
        }

        // Guardar cada cambio en localStorage
        input.addEventListener("input", function () {
            localStorage.setItem(input.id, input.value);
        });
    });
});

// Limpiar localStorage solo cuando el usuario presiona "Aceptar"
function finalizarFormulario() {
    localStorage.clear();
    Swal.fire({
        title: "Good job!",
        text: "Datos enviados correctamente.",
        icon: "success"
    }).then(() => {
        window.location.href = "../vistas/formulario/pdfs.html"; // Redirige después de aceptar
    });
}

