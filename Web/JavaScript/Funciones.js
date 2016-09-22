// Cargar Jquery local si fuera de linea.
if (!window.jQuery) { document.write('<script src="JavaScript/jquery.min.js"></script>'); }

// Cargar hoja de estilo si esta fuera de linea.
/*
(function($) {
    $(function() {
        if ($('body').css('font-size') !== '15px') {
            $('head').prepend('<link rel="stylesheet" href="Partes/w3.css">');
        }
    });
})(window.jQuery);
*/

function w3_open() {
    document.getElementById("mySidenav").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
}
function w3_close() {
    document.getElementById("mySidenav").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
}

$(document).ready(function() {
    $('#Navegacion').load('Partes/Navegacion.html');
});
