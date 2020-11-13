import LocomotiveScroll from 'locomotive-scroll';
import { gsap, TweenLite, TweenMax, TimelineLite, TimelineMax } from "gsap";


let container = document.querySelector('[data-scroll-container]'),
    // elem = document.querySelector('[data-scroll]'),
    soc = document.querySelector('.major__networks'),
    aTitle = document.querySelector('.about__title'),
    year = document.querySelector('.major__year'),
    cursor = document.querySelector('.cursor'),
    media = document.querySelector('.media'),
    isDesktop = $(window).width() >= 768,
    dom = false,
    domEnd = false,
    domScreen = false,
    domScreenImg = false,
    screenHeight = window.innerHeight,
    domTop,
    tpos,
    scaledImg = 1,
    slider = $('.dom'),
    domImg500 = $('.domScreen__block_img'),
    domImg = $('.domScreen__img'),
    domScreenText = $('.domScreen'),
    domSliderContent,
    domVisibled = true;

const pageScroll = new LocomotiveScroll({
    el: container,
    smooth: true,
    smoothMobile: false,
    getDirection: true,
    // scrollFromAnywhere: true
    repeat: true
});


pageScroll.on('scroll', (obj) => {
    // $(document).trigger(obj);
    // console.log(obj);
    // console.log(obj.scroll.y);
    // toffset = window.offset().top;
    // console.log(obj, a, b);
    domSliderContent = $('.dom__slider__top__convert, .dom__slider_map, .dom .slick-arrow, .dom__slider__bottom, .dom__counter'),
    tpos = obj.scroll.y;
    let scale,
        opacity,
        currentTop;

    if (domScreen) {
        // $('.domScreen').css({
        //     top: tpos - currentTop,
        // });
        // $('.domScreen__block_img').css({
        //     transform: 'scale('+scale+')'
        // });

        console.log(domScreen);
    }

    if (domScreenImg) {
        // console.log('domScreenImg in');
    // } else {
        // console.log('domScreenImg out');
    }

    if (dom) {
        // console.log(domTop);
        // console.log(tpos);

        scale = -( domTop - tpos - screenHeight )/screenHeight;
        opacity = -scale+2;
        // console.log(scale);
        // console.log(opacity);
        domSliderContent.css('opacity', '0');

        if (scale >= 1) {
            // scale = scale*1.1;
            scaledImg = scale*(scale**scale);
            // console.log(scale);
            console.log(scaledImg);
            // console.log(domVisibled);
            // console.log(obj.direction);
            // console.log(tpos);
            console.log('opacity', opacity);
            console.log('opacity *', opacity*scale*scale*scale+1.5);
            console.log('');
            currentTop = tpos;
            $('.dom').css({
                transform: 'translate(0, '+(tpos - domTop)+'px)',
            });
            domScreenText.css({
                transform: 'translate(0, '+(tpos - domTop)+'px)',
            });
            domScreenText.css('opacity', '0');
            domImg.css({
                transform: 'translate(0, '+(tpos - domTop)+'px) scale('+scaledImg+')',
                opacity: opacity*scale*scale*scale+1.5
            });

            if (scaledImg > 12) {
                domSliderContent.css('opacity', '1');
                slider.css('zIndex', 15);

            } else {
                domSliderContent.css('opacity', '0');
                slider.css('zIndex', 10);
            }
        } else {
            domScreenText.css('opacity', '1');
        }

    }

    if (domEnd) {
    } else {

    }
});

pageScroll.on('call', (func, state, obj) => {
    // $(document).trigger(obj);
    // console.log(func);
    switch (func) {
        case 'about':
            // console.log(func, state, obj);
            if (state === 'enter') {
                // console.log();
                // console.log(obj);
                // console.log(obj.top);
                // let p = $(obj.el).find('[data-scroll-speed]');
            } else {
                // pageScroll.update();
            }
            return ;
        case 'domImg':
            // console.log(func, state, obj);
            if (state === 'enter') {
                // console.log();
                // console.log('domImg', state);
                domScreenImg = true;
                // console.log(obj.top);
                // let p = $(obj.el).find('[data-scroll-speed]');
            } else {
                // console.log('domImg', state);
                domScreenImg = false;
                // pageScroll.update();
            }
            return ;
        case 'domScreen':
            if (state === 'enter') {
                domScreen = false;
                console.log('domScreen', state);

                // domImg500.addClass('scaled');
                // domScreenText.fadeOut();
                // setTimeout(function () {
                //     if (domImg500.hasClass('scaled')) {
                //         domImg.fadeOut(500);
                //         domVisibled = false;
                //         domSliderContent.fadeIn(500);
                //     }
                // }, 1500);
            } else {
                domScreen = true;
                console.log('domScreen', state);

                // domImg500.removeClass('scaled');
                // domScreenText.fadeIn();
                // domVisibled = true;
                // if (!domImg500.hasClass('scaled')) {
                //     domImg.show();
                // }
            }
            return ;
        case 'dom':
            if (state === 'enter') {
                console.log(obj.top);
                console.log('dom', state);
                // pageScroll.stop();
                // pageScroll.update();
                dom = true;
                domTop = obj.top;
            } else {
                console.log('dom', state);
                console.log(obj.top);
                $('.domScreen').removeAttr('style');

                // pageScroll.start();
                // pageScroll.update();
                dom = false;
            }
            return ;
        case 'dom-end':
            if (state === 'enter') {
                domEnd = true;
            } else {
                domScreen = false;
                domEnd = false;
            }
            return;
        default:
        return;
    }
});
if (isXsWidth()) {
    pageScroll.destroy();
    $('[data-scroll]').removeAttr('style');

}


(function() {

    $('.media__logo').click(function(){
        let id = $(this).attr('data-modal-id'),
            modal = $('#' + id);

        // console.log($(window).height());
        console.log($('body').offset().top);
        modal
            .height($(window).height())
            .addClass('open');
        // $('body').addClass('no-scroll');
        if (isDesktop) {
            pageScroll.stop();
        }
        $(document).mousedown(function (e){
            var modalContent = $('.media__modal-block');
            if (!modalContent.is(e.target)
            && modalContent.has(e.target).length === 0) {
                $('.media__modal').removeClass('open');
                $('body').removeClass('no-scroll');
                if (isDesktop) {
                    pageScroll.update();
                    pageScroll.start();
                }
            }
        });
    });

    $('.media__modal-close').click(function(){
        $('.media__modal').removeClass('open');
        $('body').removeClass('no-scroll');
        if (isDesktop) {
            pageScroll.update();
            pageScroll.start();
        }
    });

    if (isXsWidth()) {
        $('.media__box').each(function( index, element ) {
            if ($(this).children('.media__logo').length == 1)  {
                $(this).css('display', 'block');
            } else {
                $(this).css('display', 'none');
            }
        });
    }

    $('.residents__picture').click(function(){

        let id = $(this).attr('data-modal-id'),
            modal = $('#' + id);

        modal.fadeIn('500', function() {
            $('body').addClass('no-scroll');
        });

        if (isXsWidth()) {
            modal.find('.residents__modal-post').after(modal.find(".residents__modal-img"));
        }
    });

    $('.residents__modal-close').click(function(){
        $('.residents__modal').fadeOut('500', function() {
            $('body').removeClass('no-scroll');
        });
    });

    $('.js_action').click(function(){
        $('.steps__modal').addClass('open');
        $('body').addClass('no-scroll');
        if (isDesktop) {
            pageScroll.stop();
        }
        $(document).mousedown(function (e){
            var modal = $(this).find('.modal__block');
            if (!modal.is(e.target)
            && modal.has(e.target).length === 0) {
                $('.modal').removeClass('open');
                $('body').removeClass('no-scroll');

                if (isDesktop) {
                    pageScroll.update();
                    pageScroll.start();
                }
            }
        });
    });

    $('.modal__close').click(function(){
        $('.modal').removeClass('open');
        $('body').removeClass('no-scroll');
        if (isDesktop) {
            pageScroll.update();
            pageScroll.start();
        }
    });


    // CURSOR
    function showCoursor(el, text) {
        let posX = 0,
            posY = 0,
            mouseX = 0,
            mouseY = 0;

        TweenMax.to({}, 0.016, {
            repeat: -1,
            onRepeat: function() {
                posX += (mouseX - posX) / 9;
                posY += (mouseY - posY) / 9;

                TweenMax.set(cursor, {
                    css: {
                        left: mouseX,
                        top: mouseY
                    }
                });
            }
        });

        $(document).on("mousemove", function(e) {
            mouseX = e.pageX;
            mouseY = e.pageY;
        });

        $(el).on("mouseenter", function() {
            $(cursor).addClass("active");
            $(cursor).html(text);
        });
        $(el).on("mouseleave", function() {
            $(cursor).removeClass("active");
            $(cursor).html('');
        });
        $(el).on("mousedown", function() {
            $(cursor).addClass("pressed");
        });
        $(el).on("mouseup", function() {
            $(cursor).removeClass("pressed");
        });
    }

    // console.log($(cursor).attr('style'));
    function initCursors() {
        if (isDesktop) {
            if ($(cursor).attr('style') == undefined) {
                showCoursor(".major__stencil", 'Смотреть видео');
                showCoursor(".media__logo", 'Читать');
                showCoursor(".poster__descr", 'Подробнее');
                showCoursor(".travel__item_any", 'Подробнее');
                // showCoursor(".residents__picture", 'Подробнее');
            }
        } else {
            $(cursor).removeAttr('style');
        }
    }


    $(document).ready(function() {
        if (isDesktop) {
            initSlider();
            setTimeout(function () {
                pageScroll.update();
            }, 3000);
        } else {
            pageScroll.destroy();
            $('[data-scroll-section]').removeAttr('style');
            return false;
        }
        initCursors();
    });

    $(window).resize(function() {
        if (isDesktop) {
            // scroll.init();
            // pageScroll.update();
            // console.log($(cursor).attr('style'));
        } else {
            pageScroll.destroy();
            $('[data-scroll-section]').removeAttr('style');
            return false;
        }
        initCursors();
    });

    function initSlider() {
        $('.dom__counter__all').text($('.dom__slider__block').length)

        $(".dom__slider__bottom").on('afterChange', function(event, slick, currentSlide){
            (currentSlide+1>9)?$('.dom__counter__null').hide():$('.dom__counter__null').show()

            $(".dom__counter__num").text(currentSlide + 1);
        });

        $(".dom__slider__top, .dom__slider__bottom").on('init', function(event, slick, currentSlide){
            if (isDesktop) {
                // pageScroll.update();
                pageScroll.start();
            }
        });

        $('.dom').on('click', '[data-slide]', function() {
            let i = $(this).data('slide');

            $('[data-slide]').removeClass('active');
            $(this).addClass('active');
            $('.dom__slider__top').slick('slickGoTo', i);
        });

        $('.dom__slider__top').on('beforeChange', function(event, slick, currentSlide, nextSlide){
            $('[data-slide]').removeClass('active');
            $('[data-slide="'+nextSlide+'"]').addClass('active');
        });

        $('.dom__slider__top').slick({
             slidesToShow: 1,
             slidesToScroll: 1,
             nextArrow: '<button class="slick-next"></button>',
             prevArrow: '<button class="slick-prev"></button>',
             arrows: true,
             lazyLoad: false,
             draggable: false,
             infinite: true,
             asNavFor: '.dom__slider__bottom'
        });

        $('.dom__slider__bottom').slick({
             slidesToShow: 5,
             slidesToScroll: 1,
             arrows: false,
             infinite: true,
             lazyLoad: false,
             draggable: false,
             asNavFor: '.dom__slider__top',
             centerMode: true,
             focusOnSelect: true,
             responsive: [
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 3,
                  centerMode: false
                }
              }
            ]
        });
    }

    $('.major__stencil').click(function(){
        $('.major').addClass('hide');
        $('.header').addClass('effect');
        if (isDesktop) {
            pageScroll.stop();
        }
    });

    $('.major__video-close').click(function(){
        $('.major').removeClass('hide');
        $('.header').removeClass('effect');
        $('#majorVideo').trigger('play');
        if (isDesktop) {
            // pageScroll.update();
            pageScroll.start();
        }
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

    $('body').on('click', () => {
        // updateScroll();
    });


    function updateScroll() {
        console.log('updateScroll');
        if (isDesktop) {
            // pageScroll.update();
        } else {
            // pageScroll.destroy();
        }

    }


})();
