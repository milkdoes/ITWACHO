<?php
// Posiciones en procedimiento de base de datos.
define("NOM", "Nombre");

include_once "Connection.php";

// Si cualquier nombre esta asignado, continuar con la insercion a la base de datos.
if ( isset($_REQUEST["Id"]) && !empty($_REQUEST["Id"]) ) {
    // Asignacion de valores a los parametros.
    $Id = $_REQUEST["Id"];

    // Llamada al procedimiento almacenado.
    $Procedimiento = "{ call dbo.SP_SelectActividad (?) }";

    // Pasar los parametros el procedimiento almacenado.
    $Parametros = array(array($Id));

    // Ejecutar la consulta.
    $Sql = sqlsrv_query($Con, $Procedimiento, $Parametros);

    // Manejo de errores.
    if ($Sql == false) {
        die(print_r(sqlsrv_errors(), true));
    }

    // Desplegar los entes obtenidos.
    while ($reg = sqlsrv_fetch_array($Sql)) {
        echo "<li>"
            . $reg[NOM]
            . '<span onclick="this.parentElement.style.display=\'none\'" class="w3-closebtn w3-margin-right w3-medium">&times;</span>'
            . "</li>";
    }
}
?>
