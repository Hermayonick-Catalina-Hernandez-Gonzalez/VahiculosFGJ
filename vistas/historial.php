<?php
require "../php/conexion.php";

// Obtener el numero economico del vehículo
$numero_economico = $_GET['numero_economico'];

// Consulta SQL para obtener los detalles del vehículo
$sql = "SELECT * FROM vehiculos WHERE numero_economico = '$numero_economico'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Mostrar los detalles del vehículo
    $row = $result->fetch_assoc();
} else {
    echo "No se encontró el vehículo.";
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Historial Vehicular</title>
    <link rel="stylesheet" href="../css/styleshistorial.css">
</head>
<body>
    <!-- Sección de encabezado y boton de regresar-->
    <header class="head">
        <div class="esquina-container">
            <button class="btn-regresar" onclick="window.history.back()">
                <img src="../img/Regresar.png" alt="Regresar" />
            </button>
            <div class="esquina">
                <img src="../img/Esquina.png" alt="Imagen de Esquina" />
            </div>
        </div>
        <div class="titulo">
            <h1>Historial Vehicular</h1>
        </div>
        <div class="logo">
            <img src="../img/Logo.png" alt="Logo FGJ">
        </div>
    </header>

    <div class="container">
        <!-- Recuadro 1: Información del vehículo -->
        <div class="profile-section">
            <img src="../img/Vehiculo.png" alt="Foto de perfil" class="profile-picture">
            <div class="profile-info">
                <p><strong>Número Económico:</strong> <?php echo $row["numero_economico"]; ?></p>
                <p><strong>Placa:</strong> <?php echo $row["placa"]; ?></p>
                <p><strong>Serie:</strong> <?php echo $row["serie"]; ?></p>
                <p><strong>Color:</strong> <?php echo $row["color"]; ?></p>
                <p><strong>Clase:</strong> <?php echo $row["clase_vehiculo"]; ?></p>
                <p><strong>Marca:</strong> <?php echo $row["marca_vehiculo"]; ?></p>
                <p><strong>Submarca:</strong> <?php echo $row["submarca"]; ?></p>
                <p><strong>Modelo:</strong> <?php echo $row["modelo_vehiculo"]; ?></p>
            </div>
        </div>

         <!-- Barra de busqueda-->
         <div class="barra-busqueda">
                <input type="text" name="texto_busqueda" id="search"
                    placeholder="Buscar..." oninput="buscarHistorial()">
                <img src="../img/Buscador.png" alt="Buscar"
                    class="icono-buscar">
            </div>

            <div class="history-section" id="history-section">
                <div class="history-card">
                    <div>
                        <p><strong>Fecha:</strong> 25 de enero 2023</p>
                        <p><strong>Municipio: </strong>Reynosa</p>
                        <p><strong>Resguardante: </strong>Juan lopez</p>
                        <p><strong>Resguardante Interno: </strong> Jose Luis</p>
                        <p><strong>N° Empleado: </strong>34 </p>
                        <p><strong>Observaciones: </strong>golpes en la puerta de lado Derecho </p>
                    </div>
                    <button class="download-button" onclick="generarPDF()">
                        <img src="../img/descargar.png" alt="Descargar">
                    </button>
                </div>
            </div>
    </div>

    <script src="../JS/acciones.js"></script>
</body>
</html>
