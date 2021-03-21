// import inicia_afd from './automato'

/* Funções de customização da página */
$(function () {
    // Handler for .ready() called.
    $('.nav-link').on("click", function () {
        let nav_itens = $('.nav-link')

        for (let i = 0; i < nav_itens.length; i++) {
            $(nav_itens[i]).removeClass('active');
        }

        $(this).addClass('active')
    });
});

function resize_afd_plot() {
    let window_size = $(window).width(),
        afd = $('#afd_plot'),
        size = ""

    if (window_size < 400) {
        size = '240pt'
    } else if (window_size < 470) {
        size = '300pt'
    } else if (window_size < 530) {
        size = '320pt'
    } else if (window_size < 766) {
        size = '368pt'
    } else if (window_size < 982) {
        size = '468pt'
    }
    afd.attr('width', size)
}

$(window).resize(function () {
    resize_afd_plot();
});

$(document).ready(function () {
    resize_afd_plot();
});
