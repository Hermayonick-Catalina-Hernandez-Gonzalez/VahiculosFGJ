<?php
$host = "localhost";
$user = "root"; // Cambia si usas otro usuario en MySQL
$password = ""; // Cambia si tienes contraseña en MySQL
$database = "prueba_vehiculosFGJ";

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}
?>
