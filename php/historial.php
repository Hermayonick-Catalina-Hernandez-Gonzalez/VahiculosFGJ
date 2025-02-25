<?php
require '../php/conexion.php'; // Asegúrate de conectar a la BD

// Verificar si se reciben los datos por POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recibir datos del formulario
    $fecha = $_POST['fecha'];
    $municipio = $_POST['municipio'];
    $FGJRM = $_POST['FGJRM'];
    $resguardante_id = $_POST['resguardante_id'];
    $licencia = $_POST['licencia'];
    $vigencia_licencia = $_POST['vigencia'];
    $resguardante_interno_id = $_POST['resguardante_interno'];
    $licencia_interna = $_POST['licencia_interna'];
    $vigencia_licencia_interna = $_POST['vigencia_interna'];
    $vehiculo_numeroEconomico = $_POST['numero_economico'];
    $tipo = $_POST['tipo'];
    $kilometraje = $_POST['km'];

    // Preparar la consulta SQL para insertar en la tabla Historial
    $sql = "INSERT INTO Historial (fecha, municipio, FGJRM, resguardante_id, licencia, vigencia_licencia, 
            resguardante_interno_id, licencia_interno, vigencia_licencia_interno, vehiculo_numeroEconomico, tipo, kilometraje) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssssssssssi", $fecha, $municipio, $FGJRM, $resguardante_id, $licencia, $vigencia_licencia, 
                      $resguardante_interno_id, $licencia_interna, $vigencia_licencia_interna, 
                      $vehiculo_numeroEconomico, $tipo, $kilometraje);

    if ($stmt->execute()) {
        echo json_encode(["success" => "Datos guardados correctamente"]);
    } else {
        echo json_encode(["error" => "Error al guardar datos: " . $stmt->error]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["error" => "Método no permitido"]);
}
?>
