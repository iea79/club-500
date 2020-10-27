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
        $('#majorVideo').trigger('play');
    });

    $('#majorVideo').on('click', function() {
        if (!$(this).hasClass('play')) {
            $(this).addClass('play');
            $(this).trigger('pause');
            $('.major__video-status').html('ВОСПРОИЗВЕСТИ');
        } else {
            $(this).removeClass('play');
            $(this).trigger('play');
            $('.major__video-status').html('ПАУЗА');
        }
    });

    var majorVideo = document.getElementById('majorVideo');
    majorVideo.addEventListener("timeupdate", function() {
        var currentTime = majorVideo.currentTime;
        var duration = majorVideo.duration;
        $('.major__video-current').stop(true,true).animate({'width':(currentTime +.25)/duration*100+'%'},250,'linear');
    });


    $('.tab__item').click(function() {
        var tab_id = $(this).attr('data-tab'),
        $container = $(this).closest('.tab');
        $container.find('.tab__item').removeClass('active');
        $container.find('.tab__mass').removeClass('open');

        $(this).addClass('active');
        $("#" + tab_id).addClass('open');
    });

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



    let step = -1;

    setInterval(function($items) {
        $items.eq(step).removeClass('active');
        step = (step + 1) % $items.length;
        $items.eq(step).addClass('active');
    }, 400, $('.steps__action-arrow'));

    $('.poster__month').on('click', function() {
        if (isXsWidth()) {
            let events = $(this).data('events-month');
            $('.poster__img').hide();
            $('[data-events-month="'+events+'"]').show();
        }
    });

    $(".dom__slider__bottom").on('afterChange', function(event, slick, currentSlide){
        (currentSlide+1>9)?$('.dom__counter__null').hide():$('.dom__counter__null').show()

         $(".dom__counter__num").text(currentSlide + 1);
    });

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
