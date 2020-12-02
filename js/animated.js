// import './custom.js';
import LocomotiveScroll from 'locomotive-scroll';
import { TweenMax } from "gsap";


let container = document.querySelector('[data-scroll-container]'),
    cursor = document.querySelector('.cursor'),
    isDesktop = $(window).width() >= 768,
    dom = false,
    innumber = false,
    screenHeight = window.innerHeight,
    sectionTop,
    tpos,
    scaledImg = 1,
    slider = $('.dom'),
    domImg = $('.domScreen__img'),
    domScreenText = $('.domScreen'),
    domSliderContent;

function getCallOnScroll() {
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
            opacity;

        if (innumber) {
            scale = -( sectionTop - tpos - screenHeight )/screenHeight;
            opacity = scale*scale*scale-0.5;

            $('.innumber__bg img').css('opacity', opacity);
        }

        if (dom) {
            // console.log(sectionTop);
            // console.log(tpos);

            scale = -( sectionTop - tpos - screenHeight )/screenHeight;
            opacity = -scale+2;
            // console.log(scale);
            // console.log(opacity);
            domSliderContent.css('opacity', '0');

            if (scale >= 1) {
                // scale = scale*1.1;
                scaledImg = scale*(scale**scale);
                // console.log(scale);
                // console.log(scaledImg);
                // console.log(domVisibled);
                // console.log(obj.direction);
                // console.log(tpos);
                // console.log('opacity', opacity);
                // console.log('opacity *', opacity*scale*scale*scale+1.5);
                // console.log('');
                $('.dom').css({
                    transform: 'translate3d(0px, '+(tpos - sectionTop)+'px, 0px)',
                });
                domScreenText.css({
                    transform: 'translate3d(0px, '+(tpos - sectionTop)+'px, 0px)',
                });
                domScreenText.css('opacity', '0');
                domImg.css({
                    transform: 'translate3d(0px, '+(tpos - sectionTop)+'px, 0px) scale('+scaledImg+')',
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

    });

    pageScroll.on('call', (func, state, obj) => {
        // $(document).trigger(obj);
        // console.log(func);
        switch (func) {
            case 'innumber':
                if (state === 'enter') {
                    console.log(obj.top);
                    console.log('innumber', state);
                    // pageScroll.stop();
                    // pageScroll.update();
                    innumber = true;
                    sectionTop = obj.top;
                } else {
                    console.log('innumber', state);
                    console.log(obj.top);

                    // pageScroll.start();
                    // pageScroll.update();
                    innumber = false;
                }
                return ;
            case 'dom':
                if (state === 'enter') {
                    console.log(obj.top);
                    console.log('dom', state);
                    // pageScroll.stop();
                    // pageScroll.update();
                    dom = true;
                    sectionTop = obj.top;
                } else {
                    console.log('dom', state);
                    console.log(obj.top);
                    $('.domScreen').removeAttr('style');

                    // pageScroll.start();
                    // pageScroll.update();
                    dom = false;
                }
                return ;
            default:
                return;
        }
    });

    if (isXsWidth()) {
        pageScroll.destroy();
        $('[data-scroll]').removeAttr('style');
    }

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
        $('.media__box').each(function() {
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

        modal.addClass('open');
        $('body').addClass('no-scroll');

        if (isXsWidth()) {
            modal.find('.residents__modal-post').after(modal.find(".residents__modal-img"));
        }
    });

    $('.residents__modal-close').click(function(){
        $('.residents__modal').removeClass('open')
        $('body').removeClass('no-scroll');
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

    function initCursors() {
        if (isDesktop) {
            if ($(cursor).attr('style') == undefined) {
                showCoursor(".major__stencil", 'Смотреть видео');
                showCoursor(".media__logo", 'Читать');
                showCoursor(".poster__descr", 'Подробнее');
                showCoursor(".travel__item_any", 'Подробнее');
                showCoursor(".residents__picture", 'Подробнее');
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

        $('.menu__link, .menu__linksub').on('click', function(e) {
            e.preventDefault();
            let id = $(this).attr('href');

            console.log(id);

            $('.menu').removeClass('open');
            $('.header').removeClass('active');
            pageScroll.scrollTo(id);
        })
    });

    $(window).resize(function() {
        if (isDesktop) {
            // scroll.init();
            // pageScroll.update();
            // console.log($(cursor).attr('style'));
        } else {
            pageScroll.destroy();
            $('[data-scroll-section]').removeAttr('style');
        }
        initCursors();
    });

    function initSlider() {
        let total = $('.dom__sliders_wrap').length,
            current = 0;

        $('.dom__counter__all').text(total);

        $('.dom__sliders_wrap').first().addClass('active');

        $('.slick-next').on('click', () => {
            current = $('.dom__sliders_wrap.active').data('place');
            console.log(current);
            console.log(total);
            if ((current+1) !== total) {
                current++;
                toggleSliders(current);
            // } else {
            //     current = 0;
            //     toggleSliders(current);
            }
        });

        $('.slick-prev').on('click', () => {
            current = $('.dom__sliders_wrap.active').data('place');
            console.log(current);
            if (current !== 0) {
                current--;
                toggleSliders(current);
            // } else {
            //     current = (total - 1);
            //     toggleSliders(current);
            }
        });

        $('.dom').on('click', '[data-slide]', function() {
            current = $(this).data('slide');
            toggleSliders(current);
        })

        function toggleSliders(current) {
            $('.dom__sliders_wrap').removeClass('active');
            $('[data-slide]').removeClass('active');
            $('[data-place='+current+']').addClass('active');
            $('[data-slide='+current+']').addClass('active');
            $(".dom__counter__num").text((current+1));
        }

        // $('.dom__sliders').slick({
        //      slidesToShow: 1,
        //      slidesToScroll: 1,
        //      nextArrow: '<button class="slick-next"></button>',
        //      prevArrow: '<button class="slick-prev"></button>',
        //      arrows: true,
        //      draggable: false,
        //      infinite: true
        // });

        $('.dom__slider__top').each(function(index, el) {
            $(el).slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                lazyLoad: false,
                draggable: false,
                infinite: true,
                asNavFor: $(el).siblings('.dom__slider__bottom')
            });
        });

        $('.dom__slider__bottom').each(function(index, el) {
            $(el).slick({
                slidesToShow: 5,
                slidesToScroll: 1,
                arrows: false,
                infinite: true,
                lazyLoad: false,
                draggable: false,
                centerMode: false,
                focusOnSelect: true,
                asNavFor:  $(el).siblings('.dom__slider__top'),
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
        });

        // $('.dom__sliders').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        //     let activeSlide = $('.dom__sliders_wrap[data-slick-index='+nextSlide+']');
        //     let place = activeSlide.data('place');
        //
        //     console.log('beforeChange');
        //
        //     $('[data-slide]').removeClass('active');
        //     $('[data-slide="'+place+'"]').addClass('active');
        //     $(".dom__counter__num").text(nextSlide + 1);
        // });

        // $('.dom__sliders').on('afterChange', function(event, slick, currentSlide, nextSlide){
        //     let activeSlide = $('.dom__sliders_wrap[data-slick-index='+currentSlide+']');
        //     activeSlide.find('.dom__slider__block[data-slick-index="0"], .dom__slider__bottom__block[data-slick-index="0"]').addClass('slick-current');
        //     console.log('afterChange');
        // });

        $('.dom').on('click', '[data-slide]', function() {
            let i = $(this).data('slide');
            // $('.dom__sliders').slick('slickGoTo', i);
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

}

getCallOnScroll();

let options = {
    root: document.querySelector('[data-scroll-section]'),
    rootMargin: '0px',
    threshold: 1.0
}

new IntersectionObserver(getCallOnScroll, options);
