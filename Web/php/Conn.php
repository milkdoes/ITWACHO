<?php
// Nombre de la direccion a la cual conectarse.
$nombreServidor = "localhost";
// Usuario con el cual acceder a la base de datos.
$nombreUsuario = "UsuarioItWacho";
// Contrasena del usuario.
$contrasena = "UsuarioItWacho";
// Base de datos a la cual conectarse.
$nombreBaseDatos = "it_wacho";

// Conectarse a la base de datos.
// Conectarse a traves de PDO.
$dsn = 'mysql:dbname=' . $nombreBaseDatos . ";host=" . $nombreServidor;

try {
    $con = new PDO($dsn, $nombreUsuario, $contrasena);
} catch(PDOException $e) {
    echo 'Fallo de conexion.' . $e->getMessage();
}

?>
