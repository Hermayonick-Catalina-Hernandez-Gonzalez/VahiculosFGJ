<?php
require '../php/conexion.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

if (!isset($_GET['nombre'])) {
    echo json_encode(["error" => "Falta el parámetro 'nombre'"]);
    exit;
}

$nombre = $_GET['nombre'];

// Consulta con los nombres de columna correctos
$sql = "SELECT nombre, cargo, numero_empleado, celular, 
               fiscalia_general, fiscalia_especializada_en, vicefiscalia_en, 
               direccion_general, departamento_area 
        FROM empleados 
        WHERE nombre = ?";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(["error" => "Error en la preparación de la consulta"]);
    exit;
}

$stmt->bind_param("s", $nombre);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $empleado = $result->fetch_assoc();
    echo json_encode($empleado);
} else {
    echo json_encode(["error" => "Empleado no encontrado"]);
}

$stmt->close();
$conn->close();
?>