<?php
// Incluir archivo de conexion.
include_once "Conn.php";

// Si el id esta asignado, continuar con la busqueda del ente elegido.
if (
    (isset($_REQUEST["EnteId"]) && !empty($_REQUEST["EnteId"]))
    && (isset($_REQUEST["Buscado"]))
) {
    // Asignacion de valores a los parametros.
    $enteId = NULL;
    $buscado = 0;
    $lugarId = NULL;
    $lugarNombre = NULL;

    // Asignar variable id si esta asignado.
    if (isset($_REQUEST["EnteId"]) && !empty($_REQUEST["EnteId"])) {
        $enteId = $_REQUEST["EnteId"];
    }

    // Asignar variable buscado si esta asignado.
    if (isset($_REQUEST["Buscado"])) {
        $buscado = $_REQUEST["Buscado"];
    }

    // Asignar variable de id lugar si esta asignado.
    if (isset($_REQUEST["LugarId"]) && !empty($_REQUEST["LugarId"])) {
        $lugarId = $_REQUEST["LugarId"];
    }

    // Asignar variable de nombre lugar si esta asignado.
    if (isset($_REQUEST["LugarNombre"]) && !empty($_REQUEST["LugarNombre"])) {
        $lugarNombre = $_REQUEST["LugarNombre"];
    }

    // Llamada al procedimiento almacenado.
    $Procedimiento = $con->prepare("CALL SP_ModifyRastrear(?, ?, ?, ?)");

    // Pasar los parametros a el procedimiento almacenado.
    // Definir parametros.
    $Procedimiento->bindParam(1, $enteId, PDO::PARAM_INT);
    $Procedimiento->bindParam(2, $buscado, PDO::PARAM_BOOL);
    $Procedimiento->bindParam(3, $lugarId, PDO::PARAM_INT);
    $Procedimiento->bindParam(4, $lugarNombre, PDO::PARAM_STR);

    // Ejecutar la consulta.
    $Procedimiento->execute();
}
?>
