<?php
require '../php/conexion.php'; // Asegúrate de conectar a la BD

$correo = "prueba@fgj.tam";
$contraseña = "prueba";

// Encriptar la contraseña con BCRYPT
$contraseña_encriptada = password_hash($contraseña, PASSWORD_BCRYPT);

// Preparar la consulta SQL para insertar el usuario
$sql = "INSERT INTO usuarios (correo, contra) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $correo, $contraseña_encriptada);

if ($stmt->execute()) {
    echo "Usuario creado con éxito.";
} else {
    echo "Error al crear usuario: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
