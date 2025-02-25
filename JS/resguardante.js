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

    let url = `http://localhost/xampp/VehiculosFGJ/php/buscarEmpleado.php?nombre=${encodeURIComponent(resguardante || resguardanteInterno)}`;

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
                    console.log("Datos recibidos:", data);

                    document.getElementById("cargo").value = data.cargo || "";
                    document.getElementById("fiscalia_general").value = data.fiscalia_general || "";
                    document.getElementById("fiscalia_especializada_en").value = data.fiscalia_especializada_en || "";
                    document.getElementById("vicefiscalia_en").value = data.vicefiscalia_en || "";
                    document.getElementById("direccion_general").value = data.direccion_general || "";
                    document.getElementById("departamento_area").value = data.departamento_area || "";
                    // Guardar en localStorage
                    localStorage.setItem("cargo", data.cargo || "");
                    localStorage.setItem("fiscalia_general", data.fiscalia_general || "");
                    localStorage.setItem("fiscalia_especializada_en", data.fiscalia_especializada_en || "");
                    localStorage.setItem("vicefiscalia_en", data.vicefiscalia_en || "");
                    localStorage.setItem("direccion_general", data.direccion_general || "");
                    localStorage.setItem("departamento_area", data.departamento_area || "");
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
}


document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".btn").addEventListener("click", function(event) {
        event.preventDefault(); // Evita que se recargue la página

        let formData = new FormData();
        formData.append("fecha", document.getElementById("fecha").value);
        formData.append("municipio", document.getElementById("municipio").value);
        formData.append("FGJRM", document.getElementById("FGJRM").value);
        formData.append("resguardante_id", document.getElementById("resguardante").value);
        formData.append("licencia", document.getElementById("licencia").value);
        formData.append("vigencia_licencia", document.getElementById("vigencia").value);
        formData.append("resguardante_interno_id", document.getElementById("resguardante_interno").value);
        formData.append("licencia_interna", document.getElementById("licencia_interna").value);
        formData.append("vigencia_interna", document.getElementById("vigencia_interna").value);

        fetch("../../PHP/guardar_resguardante.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                Swal.fire({
                    icon: "success",
                    title: "Good job!",
                    text: "Datos guardados correctamente"
                }).then(() => {
                    window.location.href = "../formulario/unidadVehicular.html"; // Redirigir al siguiente formulario
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops... Something went wrong!",
                    text: data.message
                });
            }
        })
        .catch(error => {
            Swal.fire({
                icon: "error",
                title: "Oops... Something went wrong!",
                text: "Error en la conexión con el servidor"
            });
            console.error("Error:", error);
        });
    });
});
