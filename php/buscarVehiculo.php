<?php
require "../php/conexion.php";

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *"); 

// Obtener el número económico desde la URL
if (isset($_GET["numero_economico"])) {
    $numero_economico = $_GET["numero_economico"];

    // Prevenir inyección SQL con prepared statements
    $stmt = $conn->prepare("SELECT * FROM vehiculos WHERE numero_economico = ?");
    $stmt->bind_param("i", $numero_economico);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $vehiculo = $result->fetch_assoc();
        echo json_encode($vehiculo); // Enviar datos en formato JSON
    } else {
        echo json_encode(["error" => "Vehículo no encontrado"]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Número económico no proporcionado"]);
}

$conn->close();
?>