<?php
require "../php/conexion.php";
// Consulta SQL
$sql = "SELECT * FROM vehiculos";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resguardo Vehicular</title>
    <link rel="shortcut icon" href="../img/Icono.png" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="../css/stylesInicio.css">
</head>

<body>
    <!-- Sección de encabezado y boton de salir-->
    <header class="head">
        <div class="esquina-container">
            <button class="btn-salir" onclick="salir()">
                <img src="../img/Salir.png" alt="Salir" />
            </button>
            <div class="esquina">
                <img src="../img/Esquina.png" alt="Imagen de Esquina" />
            </div>
        </div>
        <div class="titulo">
            <h1>Resguardo Vehicular</h1>
        </div>
        <div class="logo">
            <img src="../img/Logo.png" alt="Logo FGJ">
        </div>
    </header>

    <!-- Barra de busqueda-->
    <div class="barra-busqueda">
        <input type="text" name="texto_busqueda" id="search" placeholder="Buscar..." oninput="buscar()">
        <img src="../img/Buscador.png" alt="Buscar" class="icono-buscar">
    </div>

    <!--Tabla-->
    <table>
        <thead>
            <tr>
                <th>N° Economico</th>
                <th>Placa</th>
                <th>Serie</th>
                <th>Clase</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Acciónes</th>
            </tr>
        </thead>
        <tbody id="vehiculos">
            <?php
            // Verificar si la consulta devuelve resultados
            if ($result->num_rows > 0) {
                // Mostrar los datos de cada vehículo
                while ($row = $result->fetch_assoc()) {
                    echo "<tr>";
                    echo "<td>" . $row["numero_economico"] . "</td>";
                    echo "<td>" . $row["placa"] . "</td>";
                    echo "<td>" . $row["serie"] . "</td>";
                    echo "<td>" . $row["clase_vehiculo"] . "</td>";
                    echo "<td>" . $row["marca_vehiculo"] . "</td>";
                    echo "<td>" . $row["modelo_vehiculo"] . "</td>";
                    echo "<td>
                        <button onclick=\"editar()\"><i class=\"fa fa-pencil\"></i> Editar</button>
                        <button onclick=\"ver('" . $row['numero_economico'] . "')\"><i class=\"fa fa-eye\"></i> Ver</button>
                    </td>";
                    echo "</tr>";
                }
            } else {
                echo "<tr><td colspan='7'>No hay vehículos registrados</td></tr>";
            }

            // Cerrar la conexión
            $conn->close();
            ?>
        </tbody>
    </table>

    <script src="../JS/acciones.js"></script>
</body>

</html>
