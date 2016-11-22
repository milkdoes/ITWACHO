<?php
// Definir constantes para nombre de columnas en la base de datos.
define("NOM", "Nombre");
define("AP", "Apellido Paterno");
define("AM", "Apellido Materno");

include_once "Conn.php";

// Si el id esta asignado, continuar con la busqueda del ente elegido.
if (isset($_REQUEST["Id"]) && !empty($_REQUEST["Id"])) {
    // Asignacion de valores a los parametros.
    $Id = NULL;

    // Asignar variable id si esta asignado.
    if (isset($_REQUEST["Id"]) && !empty($_REQUEST["Id"])) {
        $Id = $_REQUEST["Id"];
    }

    // Llamada al procedimiento almacenado.
    $Procedimiento = $con->prepare("CALL SP_SelectEnteWhereId(?)");

    // Pasar los parametros a el procedimiento almacenado.
    // Definir parametros.
    $Procedimiento->bindParam(1, $Id, PDO::PARAM_INT);

    // Ejecutar la consulta.
    if ($Procedimiento->execute()) {
        // Desplegar los entes obtenidos.
        while($reg = $Procedimiento->fetch(PDO::FETCH_ASSOC)) {
            echo $reg[NOM] . " " . $reg[AP] . " " . $reg[AM];
        }
    }
}
?>
