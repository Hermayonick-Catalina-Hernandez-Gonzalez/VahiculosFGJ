<?php
require "../php/conexion.php";

// Obtener los datos del formulario
$fecha = $_POST['fecha'];
$municipio = $_POST['municipio'];
$FGJRM = $_POST['FGJRM'];
$resguardante = $_POST['resguardante'];
$cargo = $_POST['cargo'];
$licencia = $_POST['licencia'];
$vigencia = $_POST['vigencia'];
$fiscalia_general = $_POST['fiscalia_general'];
$fiscalia_especializada = $_POST['fiscalia_especializada'];
$vicefiscalia = $_POST['vicefiscalia'];
$direccion_general = $_POST['direccion_general'];
$departamento_area = $_POST['departamento_area'];
$resguardante_interno = $_POST['resguardante_interno'];
$cargo_interno = $_POST['cargo_interno'];
$licencia_interna = $_POST['licencia_interna'];
$vigencia_interna = $_POST['vigencia_interna'];
$numero_empleado = $_POST['numero_empleado'];
$celular = $_POST['celular'];

// Preparar la consulta SQL para insertar los datos en la tabla resguardos
$sql = "INSERT INTO resguardos (fecha, municipio, FGJRM, resguardante, cargo, licencia, vigencia, fiscalia_general, fiscalia_especializada, vicefiscalia, direccion_general, departamento_area, resguardante_interno, cargo_interno, licencia_interna, vigencia_interna, numero_empleado, celular)
VALUES ('$fecha', '$municipio', '$FGJRM', '$resguardante', '$cargo', '$licencia', '$vigencia', '$fiscalia_general', '$fiscalia_especializada', '$vicefiscalia', '$direccion_general', '$departamento_area', '$resguardante_interno', '$cargo_interno', '$licencia_interna', '$vigencia_interna', '$numero_empleado', '$celular')";

// Ejecutar la consulta
if ($conn->query($sql) === TRUE) {
    echo "Registro guardado correctamente";
} else {
    echo "Error al guardar el registro: " . $conn->error;
}

// Cerrar la conexión
$conn->close();
?>
