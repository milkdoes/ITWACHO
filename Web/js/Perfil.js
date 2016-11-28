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
    var enteId = getParameterByName("id");

    // Llamada ajax para obtener nombre completo del ente.
    $.ajax({
        type: "GET",
        url: "/ITWACHO/Web/php/SeleccionarEnteWhereId.php",
        data: { Id: enteId
        }, success: function (jsonData) {
            // Procesar variable de tipo json.
            let json = JSON.parse(jsonData);

            // Captura de datos del ente.
            let nombre = json[0].nombre;
            let apellidoPaterno = json[0].apellidoPaterno;
            let apellidoMaterno = json[0].apellidoMaterno;

            $("#Nombre").val(nombre);
            $("#ApellidoPaterno").val(apellidoPaterno);
            $("#ApellidoMaterno").val(apellidoMaterno);
        }
    });

    // Llamada ajax para llenar ultimo lugar.
    $.ajax({
        type: "GET",
        url: "/ITWACHO/Web/php/SelectRastrear.php",
        data: { Id: enteId
        }, success: function (data) {
            $("#UltimoLugar").val(data);
        }, error: function (data) {
        }
    });

    // Llamada ajax para llenar lugares.
    $.ajax({
        type: "GET",
        url: "/ITWACHO/Web/php/SeleccionarLugar.php",
        data: { Id: enteId
        }, success: function (data) {
            $("#Lugares").html(data);
        }, error: function (data) {
        }
    });

    // Llamada ajax para llenar actividades.
    $.ajax({
        type: "GET",
        url: "/ITWACHO/Web/php/SeleccionarActividad.php",
        data: { Id: enteId
        }, success: function (data) {
            $("#Actividades").html(data);
        }, error: function (data) {
        }
    });

    // Evento para preguntar la localizacion de un individuo.
    $("#PreguntarLocalizacion").click(function(e) {
        // Llamada ajax para pedir busqueda de persona.
        $.ajax({
            type: "GET",
            url: "/ITWACHO/Web/php/ModificarRastrear.php",
            data: {
                EnteId: enteId
                , Buscado: 1
            }, success: function (data) {
                $("#UltimoLugar").val("");
                alert("Pedido de busqueda exitosa.");
            }, error: function (data) {
            }
        });
    });

    // Evento para llenar otro lugar para un ente.
    $("#AgregarLugar").click(function(e) {
        // Llamada ajax para pedir busqueda de persona.
        $.ajax({
            type: "GET",
            url: "/ITWACHO/Web/php/InsertLugar.php",
            data: { EnteId: enteId
            }, success: function (data) {
                $("#UltimoLugar").val("");
                alert("Pedido de busqueda exitosa.");
            }, error: function (data) {
            }
        });
    });
});
