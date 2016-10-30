<?php
include_once "Connection.php";

// Si cualquier nombre esta asignado, continuar con la insercion a la base de datos.
if (
    (isset($_REQUEST["Nombre"]) && !empty($_REQUEST["Nombre"]))
    OR (isset($_REQUEST["ApellidoPaterno"]) && !empty($_REQUEST["ApellidoPaterno"]))
    OR (isset($_REQUEST["ApellidoMaterno"]) && !empty($_REQUEST["ApellidoMaterno"]))
) {
    // Asignacion de valores a los parametros.
    $Nombre = NULL;
    $ApellidoPaterno = NULL;
    $ApellidoMaterno = NULL;

    // Asignar nombre si esta asignado.
    if (isset($_REQUEST["Nombre"]) && !empty($_REQUEST["Nombre"])) {
        $Nombre = $_REQUEST["Nombre"];
    }

    // Asignar apellido paterno si esta asignado.
    if (isset($_REQUEST["ApellidoPaterno"]) && !empty($_REQUEST["ApellidoPaterno"])) {
        $ApellidoPaterno = $_REQUEST["ApellidoPaterno"];
    }

    // Asignar apellido materno si esta asignado.
    if (isset($_REQUEST["ApellidoMaterno"]) && !empty($_REQUEST["ApellidoMaterno"])) {
        $ApellidoMaterno = $_REQUEST["ApellidoMaterno"];
    }

    // Llamada al procedimiento almacenado.
    $Procedimiento = "{ call dbo.SP_InsertEnte (?, ?, ?) }";

    // Pasar los parametros el procedimiento almacenado.
    $Parametros = array(
        array($Nombre, SQLSRV_PARAM_IN)
        , array($ApellidoPaterno, SQLSRV_PARAM_IN)
        , array($ApellidoMaterno, SQLSRV_PARAM_IN)
    );

    // Ejecutar la consulta.
    $Sql = sqlsrv_query($Con, $Procedimiento, $Parametros);

    // Manejo de errores.
    if ($Sql == false) {
        die(print_r(sqlsrv_errors(), true));
    }
}
?>
