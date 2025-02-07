<?php
require "../php/conexion.php";

// Comprobar si se envió el formulario para iniciar sesión
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $correo = $_POST['correo'];
    $contra = $_POST['contra'];

    // Consulta para verificar las credenciales
    $sql = "SELECT * FROM usuarios WHERE correo = ? LIMIT 1";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $correo);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $usuario = $result->fetch_assoc();
        // Verificar si la contraseña es correcta
        if (password_verify($contra, $usuario['contra'])) {
            // Iniciar sesión, puedes guardar los datos del usuario en una variable de sesión
            session_start();
            $_SESSION['usuario_id'] = $usuario['id'];
            $_SESSION['correo'] = $usuario['correo'];
            header("Location: ../vistas/inicio.php"); // Redirigir a la página principal
        } else {
            echo "Contraseña incorrecta";
        }
    } else {
        echo "No se encontró un usuario con ese correo.";
    }
}
$conn->close();
?>
