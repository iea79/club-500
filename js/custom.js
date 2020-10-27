var app = {
    pageScroll: '',
    lgWidth: 1200,
    mdWidth: 992,
    smWidth: 768,
    resized: false,
    iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    touchDevice: function() { return navigator.userAgent.match(/iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i); }
};

function isLgWidth() { return $(window).width() >= app.lgWidth; } // >= 1200
function isMdWidth() { return $(window).width() >= app.mdWidth && $(window).width() < app.lgWidth; } //  >= 992 && < 1200
function isSmWidth() { return $(window).width() >= app.smWidth && $(window).width() < app.mdWidth; } // >= 768 && < 992
function isXsWidth() { return $(window).width() < app.smWidth; } // < 768
function isIOS() { return app.iOS(); } // for iPhone iPad iPod
function isTouch() { return app.touchDevice(); } // for touch device

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

    $('.major__stencil').click(function(){
        $('.major').addClass('hide');
        $('.header').addClass('effect');
    });

    $('.header__close').click(function(){
        $('.major').removeClass('hide');
        $('.header').removeClass('effect');
    });

    $('.media__logo').click(function(){
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

    if (isXsWidth()) {
        $('.media__box').each(function( index, element ) {
            if ($(this).children('.media__logo').length > 0)  {
                $(this).css('display', 'block');
            } else {
                $(this).css('display', 'none');
            }
        });
    }

    $('.dom__counter__all').text($('.dom__slider__block').length)

    $('.dom__slider__top').slick({
         slidesToShow: 1,
         slidesToScroll: 1,
         fade: true,
         draggable: false,
         infinite: true,
         asNavFor: '.dom__slider__bottom'
    });

    $('.dom__slider__bottom').slick({
         slidesToShow: 5,
         slidesToScroll: 1,
         arrows: true,
         infinite: true,
         draggable: false,
         asNavFor: '.dom__slider__top',
         centerMode: true,
         focusOnSelect: true,
         responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 4,
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
              centerMode: false
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              centerMode: false
            }
          }
        ]
    });

	$(".dom__slider__bottom").on('afterChange', function(event, slick, currentSlide){
        (currentSlide+1>9)?$('.dom__counter__null').hide():$('.dom__counter__null').show()

	     $(".dom__counter__num").text(currentSlide + 1);
	});
});
