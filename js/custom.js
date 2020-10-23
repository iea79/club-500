$(document).ready(function(){

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

});