$(document).ready(function(e) {
    // Declaracion de constantes.
    const CLASE_DESABILITADA = "w3-disabled";
    const TIEMPO_MENSAJE = 2000; // Millisegundos.
    const COLOR_ALERTA = "w3-lime";

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

    // Obtener el identificador del ente actual.
    var enteId = getParameterByName("id");

    // Variable para guardar la localizacion elegida.
    var localizacion = "";

    // Llamada ajax para llenar coordenadas en mapa.
    $.ajax({
        type: "GET",
        url: "img/MapaIttCoordenadas.html",
        success: function (data) {
            $("#MapaItt").html(data);
            $('img[usemap]').rwdImageMaps();

            // Evento para confirmar localizacion.
            $("#CoordenadasItt").on("click", "area", function (e) {
                // Quitar clase desabilitada al boton para actualizar localizacion.
                $("#ConfirmarLocalizacion").removeClass(CLASE_DESABILITADA);

                // Capturar localizacion utilizada.
                localizacion = $(this).prop("title");

                // Actualizar la localizacion en el elemento.
                $("#LocalizacionActual").val(localizacion);
            });

            // Evento para confirmar la localizacion elegida.
            $("#ConfirmarLocalizacion").click(function (e) {
                // Continuar si el elemento no esta desabilitado.
                if ($(this).hasClass(CLASE_DESABILITADA) == false) {
                    // Llamada ajax para actualizar la localizacion del ente.
                    $.ajax({
                        type: "GET",
                        url: "/ITWACHO/Web/php/ModificarRastrear.php",
                        data: {
                            EnteId: enteId
                            , Buscado: 0
                            , LugarNombre: localizacion
                        }, success: function (data) {
                            // Agregar clase desabilitada al boton para actualizar localizacion.
                            $("#ConfirmarLocalizacion").addClass(CLASE_DESABILITADA);

                            // Borrar la localizacion en el elemento.
                            $("#LocalizacionActual").val("");

                            // Agradecer al usuario por la informacion.
                            alert("Gracias por descubrir! Recargando...");

                            // Recargar pagina.
                            window.location.reload();
                        }
                    });
                }
            });
        }, error: function (data) {
        }
    });
});
