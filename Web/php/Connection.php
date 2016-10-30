<?php
// Name of instance to connect to.
$ServerName = "DESKTOP-MG2NQ84\SQLSMJM";

// Parameters to connect to database.
$ConnectionInfo = array("Database" => "ItWacho", "UID" => "UsuarioItWacho", "PWD" => "UsuarioItWacho");

// Execute database connection.
$Con = sqlsrv_connect($ServerName, $ConnectionInfo);

// Error handling.
if ($Con) {
} else {
    echo "Database connection error.<br>";
    die(print_r(sqlsrv_errors(), true));
}
?>
