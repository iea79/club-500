$(document).ready(function(){

    $('img[src*=".svg"]').each(function(index, el) {
        let img = $(el),
        path = img.attr('src');

        $.get(path, function(data) {
            $(img).hide();
            $(img).parent().append($(data));
        }, 'text');

        console.log( $('img[src*=".svg"]').length );

    });

    $('.header__toggle').click(function(){
        $('.menu').addClass('open');
        $('.header').addClass('active');
        $(document).mousedown(function (e){
            var menu = $('.menu'); 
            if (!menu.is(e.target)
            && menu.has(e.target).length === 0) {
                $(menu).removeClass('open');
            	$('.header').removeClass('active')
            }
        });
    });

    $('.menu__close').click(function(){
        $('.menu').removeClass('open');
        $('.header').removeClass('active');
    });

    $('.menu__link').hover(function(){
        $('.menu__listsub').removeClass('open');
        $('.menu__link').removeClass('active');
        $(this).next().addClass('open');
        $(this).addClass('active');
    });

    $('.major__play').click(function(){
        $('.major').addClass('hide');
        $('.header').addClass('effect');
    });

    $('.header__close').click(function(){
        $('.major').removeClass('hide');
        $('.header').removeClass('effect');
    });

    $('.media__link').click(function(){
        $(this).next('.media__modal').fadeIn(500);
        $(document).mousedown(function (e){
            var modal = $('.media__modal'); 
            if (!modal.is(e.target)
            && modal.has(e.target).length === 0) {
                $(modal).fadeOut(500);
            }
        });
    });

    $('.media__modal-close').click(function(){
        $('.media__modal').fadeOut(500);
    });

});