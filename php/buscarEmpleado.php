<?php
include '../php/conexion.php'; // Tu conexión a la base de datos
header('Content-Type: application/json');
if (!isset($_GET['nombre'])) {
    echo json_encode(["error" => "Nombre no proporcionado"]);
    exit;
}

$nombre = $_GET['nombre'];
$query = "SELECT cargo, numero_empleado, celular FROM empleados WHERE nombre = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $nombre);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    echo json_encode($row);
} else {
    echo json_encode(["error" => "Empleado no encontrado"]);
}

$stmt->close();
$conn->close();
?>
