if (!window.jQuery) { document.write('<script src="JavaScript/jquery.min.js"></script>'); }

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
