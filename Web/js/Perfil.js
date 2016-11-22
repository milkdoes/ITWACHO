$(document).ready(function() {

    // Funcion para obtener el valor de un paramtero dentro de la URL.
    function getParameterByName(name) {
        let url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    // Obtener el identificador del ente a buscar.
    var id = getParameterByName("id");

    // Llamada ajax para obtener nombre completo del ente.
    $.ajax({
        type: "GET",
        url: "/ITWACHO/Web/php/SeleccionarEnteWhereId.php",
        data: { Id: id
        }, success: function (data) {
            $("#Nombre").val(data);
        }
    });

    // Llamada ajax para llenar actividades.
    $.ajax({
        type: "GET",
        url: "/ITWACHO/Web/php/SeleccionarActividad.php",
        data: { Id: id
        }, success: function (data) {
            $("#Actividades").html(data);
        }, error: function (data) {
        }
    });

    // Llamada ajax para llenar lugares.
    $.ajax({
        type: "GET",
        url: "/ITWACHO/Web/php/SeleccionarLugar.php",
        data: { Id: id
        }, success: function (data) {
            $("#Lugares").html(data);
        }, error: function (data) {
        }
    });
});