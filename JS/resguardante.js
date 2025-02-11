document.addEventListener("DOMContentLoaded", function () {
    // Obtener y asignar la fecha actual al input de tipo 'date'
    var fechaInput = document.getElementById('fecha');
    var today = new Date();
    var formattedDate = today.toISOString().split('T')[0];
    fechaInput.value = formattedDate;

    // Recuperar datos guardados en localStorage
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

// Redirigir a la siguiente página
function siguiente() {
    window.location.href = "../../vistas/formulario/unidadVehicular.html";
}

// Buscar empleados y guardar datos obtenidos
function buscarEmpleados() {
    let resguardante = document.getElementById("resguardante").value.trim();
    let resguardanteInterno = document.getElementById("resguardante_interno").value.trim();

    if (resguardante === "" && resguardanteInterno === "") {
        return;
    }

    let url = `http://localhost/xampp/VehiculosFGJ/php/buscarEmpleado.php?nombre=${resguardante || resguardanteInterno}`;

    fetch(url)
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
                if (resguardante) {
                    document.getElementById("cargo").value = data.cargo || "";
                    localStorage.setItem("cargo", data.cargo || "");  // Guardar en localStorage
                }

                if (resguardanteInterno) {
                    document.getElementById("cargo_interno").value = data.cargo || "";
                    document.getElementById("numero_empleado").value = data.numero_empleado || "";
                    document.getElementById("celular").value = data.celular || "";

                    localStorage.setItem("cargo_interno", data.cargo || "");
                    localStorage.setItem("numero_empleado", data.numero_empleado || "");
                    localStorage.setItem("celular", data.celular || "");
                }

                Swal.fire({
                    title: "Good job!",
                    text: "Empleado encontrado.",
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
