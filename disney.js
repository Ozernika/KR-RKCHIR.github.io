$(document).ready(function () {
    resizeImage();

    $(window).resize(function () {
        resizeImage();
    });

    function resizeImage() {
        var windowHeight = $(window).height();
        $('.image img').css('max-height', windowHeight);
    }
});

