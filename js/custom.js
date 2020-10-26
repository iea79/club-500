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

});

document.addEventListener('DOMContentLoaded', function(){
    // начало Модалки секции тарифы
    const tarrifModalOpen = () => {
        let modalOpen = document.getElementById('wrap-modal'),
        modal__item = modalOpen.querySelectorAll('.tarrifs-modal__open'),
        modal__column = document.querySelectorAll('.tarrifs__column'),
        modal__close = document.querySelector('.tarrifs__title');

        modalOpen.onclick = () => {
            event.preventDefault();

            let click = event.target;

            if (click.classList.contains('tarrifs-modal__open')) {

                let clickAttr = click.getAttribute('data-open');

                switch (clickAttr) {
                    case 'start':
                    modalActiveClose(modal__column, 'start')
                    break;
                    case 'vip':
                    modalActiveClose(modal__column, 'vip')
                    break;
                    case 'member':
                    modalActiveClose(modal__column, 'member')

                    break;
                }
            }
        }

    }

    let modalActiveClose = (arr, attr) => {
        let clos,
        item;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].getAttribute('data-tarrifs') == attr) {
                arr[i].classList.add('active');
                item = arr[i];
                clos = arr[i].querySelector('.tarrifs__column-close');
            }
        }
        clos.onclick = () => {
            item.classList.remove('active');
        }
    }
    tarrifModalOpen();
    // конец Модалки секции тарифы
})
