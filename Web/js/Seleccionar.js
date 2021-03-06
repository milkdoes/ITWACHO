$(document).ready(function() {

    // Elemento de lista elegido.
    var elementoLista;

    $("#Nombre, #ApellidoPaterno, #ApellidoMaterno").keyup(function() {
        var nombre = $("#Nombre").val();
        var apellidoPaterno = $("#ApellidoPaterno").val();
        var apellidoMaterno = $("#ApellidoMaterno").val();

        // Llamada ajax para llenar entes.
        $.ajax({
            type: "GET",
            url: "/ITWACHO/Web/php/SeleccionarEnte.php",
            data: {
                Nombre: nombre
                , ApellidoPaterno: apellidoPaterno
                , ApellidoMaterno: apellidoMaterno
            }, success: function (data) {
                $("#Personas").html(data);
            }
        });
    });

    $("#Personas").on("click", "li", function() {
        // Remover color al elemento anterior elegido.
        $(elementoLista).removeClass("w3-blue");

        // Guardar el elemento elegido.
        elementoLista = $(this);

        // Agregar color al elemento para que se vea que es el elemento elegido.
        $(this).addClass("w3-blue");

        // Obtener valor de id del ente seleccionado.
        let id = $(this).data("id");

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

    $("#Perfil").click(function() {
        // Capturar el id de la persona actualmente seleccionada.
        let id = $("#Personas").find(".w3-blue").data("id");

        if (id) {
            window.location.href = "Perfil.html?id=" + id;
        }
    });
});
