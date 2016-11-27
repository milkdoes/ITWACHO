$(document).ready(function(e) {
    // Declaracion de constantes.
    const CLASE_DESABILITADA = "w3-disabled";

    // Variable para guardar la localizacion elegida.
    var localizacion = "";

    // Llamada ajax para llenar coordenadas en mapa.
    $.ajax({
        type: "GET",
        url: "/ITWACHO/Web/img/MapaIttCoordenadas.html",
        success: function (data) {
            $("#MapaItt").html(data);
            $('img[usemap]').rwdImageMaps();

            // Evento para confirmar localizacion.
            $("#CoordenadasItt").on("click", "area", function (e) {
                // Quitar clase desabilitada al boton para actualizar localizacion.
                $("#ConfirmarLocalizacion").removeClass(CLASE_DESABILITADA);

                // Capturar localizacion utilizada.
                localizacion = $(this).prop("title");

                $("#LocalizacionActual").val(localizacion);
            });

            // Evento para confirmar la localizacion elegida.
            $("#ConfirmarLocalizacion").click(function (e) {
                // Continuar si el elemento no esta desabilitado.
                if ($(this).hasClass(CLASE_DESABILITADA) == false) {
                    alert();
                }
            });
        }, error: function (data) {
        }
    });
});
