$(document).ready(function() {

    $("#Informacion").click(function() {
        let nombre = $("#Nombre").val();
        let apellidoPaterno = $("#ApellidoPaterno").val();
        let apellidoMaterno = $("#ApellidoMaterno").val();

        // Llamada ajax para llenar entes.
        $.ajax({
            type: "POST",
            url: "/ITWACHO/Web/php/InsertarEnte.php",
            data: {Nombre: nombre
                , ApellidoPaterno: apellidoPaterno
                , ApellidoMaterno: apellidoMaterno
            }, success: function (data) {
                alert("Gracias por denunciar a " + nombre + " " + apellidoPaterno + " " + apellidoMaterno);
            }, error: function (data) {
                console.log("Error conectandose a la base de datos.");
            }
        });
    });
});
