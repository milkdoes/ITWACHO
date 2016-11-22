$(document).ready(function(e) {
    // Llamada ajax para llenar coordenadas en mapa.
    $.ajax({
        type: "GET",
        url: "/ITWACHO/Web/img/MapaIttCoordenadas.html",
        success: function (data) {
            $("#MapaItt").html(data);
            $('img[usemap]').rwdImageMaps();
        }, error: function (data) {
        }
    });
});
