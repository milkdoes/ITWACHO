function w3_open() {
    document.getElementById("mySidenav").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
}

function w3_close() {
    document.getElementById("mySidenav").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
}

$(document).ready(function() {
    $('#Navegacion').load('/ITWACHO/Web/Partes/Navegacion.html');
});

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
    var idEnte = getParameterByName("id");

    // Llamada ajax para obtener nombre completo del ente.
    $.ajax({
        type: "GET",
        url: "/ITWACHO/Web/php/SeleccionarEnteWhereId.php",
        data: { Id: idEnte
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
        data: { Id: idEnte
        }, success: function (data) {
            $("#UltimoLugar").val(data);
        }, error: function (data) {
        }
    });

    // Llamada ajax para llenar lugares.
    $.ajax({
        type: "GET",
        url: "/ITWACHO/Web/php/SeleccionarLugar.php",
        data: { Id: idEnte
        }, success: function (data) {
            $("#Lugares").html(data);
        }, error: function (data) {
        }
    });

    // Llamada ajax para llenar actividades.
    $.ajax({
        type: "GET",
        url: "/ITWACHO/Web/php/SeleccionarActividad.php",
        data: { Id: idEnte
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
                EnteId: idEnte
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
        // Obtener el lugar a insertar.
        let nombreLugar = $("#NombreLugar").val();

        // Llamada ajax para insertar lugar al ente.
        $.ajax({
            type: "GET",
            url: "/ITWACHO/Web/php/InsertEnteLugar.php",
            data: {
                IdEnte: idEnte
                , NombreLugar: nombreLugar
            }, success: function (data) {
                // Agregar nuevo elemento al elemento padre.
                $("#Lugares").append("<li>" + nombreLugar + "</li>");
            }, error: function (data) {
            }
        });
    });

    // Evento para llenar otra actividad para un ente.
    $("#AgregarActividad").click(function(e) {
        // Obtener la actividad a insertar.
        let nombreActividad = $("#NombreActividad").val();

        // Llamada ajax para insertar actividad al ente.
        $.ajax({
            type: "GET",
            url: "/ITWACHO/Web/php/InsertEnteActividad.php",
            data: {
                IdEnte: idEnte
                , NombreActividad: nombreActividad
            }, success: function (data) {
                // Agregar nuevo elemento al elemento padre.
                $("#Actividades").append("<li>" + nombreActividad + "</li>");
            }, error: function (data) {
            }
        });
    });
});
