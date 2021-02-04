// All jquery here
$(function() {
    // Handler for .ready() called.
    $('.nav-link').on("click", function() {
        let nav_itens = $('.nav-link')

        for (let i = 0; i < nav_itens.length; i++) {
            $(nav_itens[i]).removeClass('active');
        }

        $(this).addClass('active')
    });
});