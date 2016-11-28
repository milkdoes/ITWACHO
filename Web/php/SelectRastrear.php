<?php
// Posiciones en procedimiento de base de datos.
define("NOM", "NombreEnte");
define("LUG", "NombreLugar");

include_once "Conn.php";

// Si cualquier nombre esta asignado, continuar con la insercion a la base de datos.
if ( isset($_REQUEST["Id"]) && !empty($_REQUEST["Id"]) ) {
    // Asignacion de valores a los parametros.
    $Id = $_REQUEST["Id"];

    // Llamada al procedimiento almacenado.
    $Procedimiento = $con->prepare("CALL SP_SelectRastrear(?)");

    // Pasar los parametros el procedimiento almacenado.
    $Procedimiento->bindParam(1, $Id, PDO::PARAM_INT);

    // Ejecutar la consulta.
    if ($Procedimiento->execute()) {
        // Desplegar los entes obtenidos.
        while ($reg = $Procedimiento->fetch(PDO::FETCH_ASSOC)) {
            echo $reg[LUG];
        }
    }
}
?>
