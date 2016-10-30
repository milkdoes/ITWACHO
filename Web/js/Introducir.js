$(document).ready(function() {
    $("button").click(function() {
        let nombre = $("#Nombre").val();
        let apellidoPaterno = $("#ApellidoPaterno").val();
        let apellidoMaterno = $("#ApellidoMaterno").val();

        // Ajax call to insert values to database.
        $.ajax({
            type: "POST",
            url: "/ITWACHO/Web/php/InsertarEnte.php",
            data: {Nombre: nombre
                , ApellidoPaterno: apellidoPaterno
                , ApellidoMaterno: apellidoMaterno
            }, success: function (data) {
                alert(data);
            }, error: function (data) {
                alert("Error");
            }
        });
    });
});
