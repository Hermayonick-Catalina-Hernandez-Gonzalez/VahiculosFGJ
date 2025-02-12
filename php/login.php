<?php
require "../php/conexion.php";
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $correo = $_POST['correo'];
    $contra = $_POST['contra'];

    $sql = "SELECT * FROM usuarios WHERE correo = ? LIMIT 1";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $correo);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $usuario = $result->fetch_assoc();
        if (password_verify($contra, $usuario['contra'])) {
            $_SESSION['usuario_id'] = $usuario['id'];
            $_SESSION['correo'] = $usuario['correo'];
            header("Location: ../vistas/inicio.php"); // Redirigir a la página principal
            exit();
        } else {
            $_SESSION['error'] = "Contraseña incorrecta"; // Guardar mensaje de error
        }
    } else {
        $_SESSION['error'] = "No se encontró un usuario con ese correo";
    }
    header("Location: ../vistas/index.php"); // Redirigir de vuelta al login
    exit();
}
?>
