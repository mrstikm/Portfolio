(function ($) {

    // BURGER MENU
    let slide = $(".hidden");

    $("#nav-toggle").on("click", function (event) {
        event.preventDefault();
        if (slide.hasClass("hidden")) {
            slide.stop().slideDown().toggleClass("hidden");
        } else {
            slide.stop().slideUp().toggleClass("hidden");
        }
    });

    slide.on("click", "a", function (event) {
        event.preventDefault();

        let targetElement = $(event.target).attr("href"),
            offset = $(targetElement).offset().top - slide.height(),
            body = $("html, body");

        body.stop().animate({ scrollTop: offset }, 500);
        slide.stop().slideUp().toggleClass("hidden");
    });

    // LIGHTBOX + loading
    let overlay = $(".overlay"),
        cross = $('<div id="cross">×</div>'),
        loading = $('#loading');

    $(".gallery-item").children("a").on("click", function (event) {
        event.preventDefault();
        overlay.html(loading).fadeIn().css({ display: 'flex' });

        let figure = $('<figure/>');
        let title = $('<figcaption/>');
        let img = $('<img/>').attr("src", $(this).attr("href"));

        title.html($(this).attr("title"));
        title.appendTo(figure);
        img.appendTo(figure);

        img.on("load", function () {
            overlay.html(figure);
            cross.appendTo(overlay);
        })

    });


    overlay.on("click", function () {
        overlay.fadeOut();
    });

    $(document).on("keyup", function (event) {
        if (event.code === "Escape") {
            overlay.fadeOut();
        };
    });

    // BACK-TO-TOP
    let backtop = $("#backtop");

    backtop.hide();

    $(window).on("scroll", function (event) {
        if ($(this).scrollTop() >= 170) {
            backtop.stop().fadeIn();
        } else {
            backtop.stop().fadeOut();
        };
    });

    document.fonts.ready.then(function () {
        overlay.fadeOut().removeClass("first-load");
    })


})(jQuery);