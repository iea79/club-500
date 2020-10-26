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

    $('.major__video-close').click(function(){
        $('.major').removeClass('hide');
        $('.header').removeClass('effect');
    });

    $('.media__logo').click(function(){
        $(this).next('.media__modal').addClass('open');
        $('body').addClass('no-scroll');
        $(document).mousedown(function (e){
            var modal = $('.media__modal-block'); 
            if (!modal.is(e.target)
            && modal.has(e.target).length === 0) {
                $('.media__modal').removeClass('open');
                $('body').removeClass('no-scroll');
            }
        });
    });

    $('.media__modal-close').click(function(){
        $('.media__modal').removeClass('open');
        $('body').removeClass('no-scroll');
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

    $('.tab__item').click(function() {
        var tab_id = $(this).attr('data-tab'),
        $container = $(this).closest('.tab');
        $container.find('.tab__item').removeClass('active');
        $container.find('.tab__mass').removeClass('open');

        $(this).addClass('active');
        $("#" + tab_id).addClass('open');
    });

    $('.residents__picture').click(function(){
        $(this).parents('.residents__box').find('.residents__modal').fadeIn('500', function() {
            $('body').addClass('no-scroll');
        });
    });

    $('.residents__modal-close').click(function(){
        $('.residents__modal').fadeOut('500', function() {
            $('body').removeClass('no-scroll');
        });
    });

});