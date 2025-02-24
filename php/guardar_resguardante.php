<?php
require '../php/conexion.php'; // Asegúrate de que este archivo contiene la conexión a la BD

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fecha = $_POST['fecha'];
    $municipio = $_POST['municipio'];
    $FGJRM = $_POST['FGJRM'];
    $resguardante_id = $_POST['resguardante_id'];
    $licencia = $_POST['licencia'];
    $vigencia_licencia = $_POST['vigencia_licencia'];
    $resguardante_interno_id = $_POST['resguardante_interno_id'];
    $licencia_interna = $_POST['licencia_interna'];
    $vigencia_licencia_interna = $_POST['vigencia_interna'];

    // Insertar datos en la tabla Historial
    $sql = "INSERT INTO Historial (fecha, municipio, FGJRM, resguardante_id, licencia, vigencia_licencia, resguardante_interno_id, licencia_interno, vigencia_licencia_interno)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("sssississ", $fecha, $municipio, $FGJRM, $resguardante_id, $licencia, $vigencia_licencia, $resguardante_interno_id, $licencia_interna, $vigencia_licencia_interna);
        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Datos guardados correctamente"]);
        } else {
            echo json_encode(["success" => false, "message" => "Error al guardar datos"]);
        }
        $stmt->close();
    } else {
        echo json_encode(["success" => false, "message" => "Error en la preparación de la consulta"]);
    }

    $conn->close();
}
?>
 
