<?php
// Incluir el archivo de conexion.
include_once "Conn.php";

// Si esta asignado el id del ente y el nombre del actividad, continuar.
if (
    (isset($_REQUEST["IdEnte"]) && !empty($_REQUEST["IdEnte"]))
    && (isset($_REQUEST["NombreActividad"]) && !empty($_REQUEST["NombreActividad"]))
) {
    // Asignacion de valores a los parametros.
    $idEnte = $_REQUEST["IdEnte"];
    $idActividad = NULL;
    $nombreActividad = $_REQUEST["NombreActividad"];

    // Llamada al procedimiento almacenado.
    $Procedimiento = $con->prepare("CALL SP_InsertEnteActividad(?, ?, ?)");

    // Pasar los parametros el procedimiento almacenado.
    $Procedimiento->bindParam(1, $idEnte, PDO::PARAM_INT);
    $Procedimiento->bindParam(2, $idActividad, PDO::PARAM_INT);
    $Procedimiento->bindParam(3, $nombreActividad, PDO::PARAM_STR);

    // Ejecutar la consulta.
    $Procedimiento->execute();
}
?>
