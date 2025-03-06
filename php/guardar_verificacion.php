<?php
require '../php/conexion.php';

header('Content-Type: application/json');  
header("Access-Control-Allow-Origin: *");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Recibe los datos del POST
    $data = json_decode(file_get_contents('php://input'), true);

    // Guardar verificación
    if (isset($data['categoria'], $data['elemento'], $data['estado'])) {
        $categoria = $data['categoria'];
        $elemento = $data['elemento'];
        $estado = $data['estado'];

        $sql = "INSERT INTO verificacion (categoria, elemento, estado) VALUES (:categoria, :elemento, :estado)";
        $stmt = $conn->prepare($sql);

        // Ejecutar la consulta
        if ($stmt->execute([
            ':categoria' => $categoria, 
            ':elemento' => $elemento, 
            ':estado' => $estado
        ])) {
            // Obtener el último ID insertado
            $verificacion_id = $conn->lastInsertId();
            echo json_encode(["verificacion_id" => $verificacion_id]);
        } else {
            echo json_encode(["error" => "Error al guardar la verificación"]);
        }
    }

    // Guardar observaciones
    if (isset($data['categoria'], $data['observaciones'], $data['verificacion_id'])) {
        $categoria = $data['categoria'];
        $observaciones = $data['observaciones'];
        $verificacion_id = $data['verificacion_id'];

        $sql = "INSERT INTO Observacionesverificacion (categoria, observaciones, verificacion_id) VALUES (:categoria, :observaciones, :verificacion_id)";
        $stmt = $conn->prepare($sql);

        // Ejecutar la consulta
        if ($stmt->execute([
            ':categoria' => $categoria, 
            ':observaciones' => $observaciones, 
            ':verificacion_id' => $verificacion_id
        ])) {
            echo json_encode(["message" => "Observaciones guardadas correctamente"]);
        } else {
            echo json_encode(["error" => "Error al guardar las observaciones"]);
        }
    }
}
?>
