<?php
// Incluir el archivo de conexion.
include_once "Conn.php";

// Si esta asignado el id del ente y el nombre del lugar, continuar.
if (
    (isset($_REQUEST["IdEnte"]) && !empty($_REQUEST["IdEnte"]))
    && (isset($_REQUEST["NombreLugar"]) && !empty($_REQUEST["NombreLugar"]))
) {
    // Asignacion de valores a los parametros.
    $idEnte = $_REQUEST["IdEnte"];
    $idLugar = NULL;
    $nombreLugar = $_REQUEST["NombreLugar"];

    // Llamada al procedimiento almacenado.
    $Procedimiento = $con->prepare("CALL SP_InsertEnteLugar(?, ?, ?)");

    // Pasar los parametros el procedimiento almacenado.
    $Procedimiento->bindParam(1, $idEnte, PDO::PARAM_INT);
    $Procedimiento->bindParam(2, $idLugar, PDO::PARAM_INT);
    $Procedimiento->bindParam(3, $nombreLugar, PDO::PARAM_STR);

    // Ejecutar la consulta.
    $Procedimiento->execute();
}
?>
