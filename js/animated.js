import LocomotiveScroll from 'locomotive-scroll';
import { gsap, TweenLite, TweenMax, TimelineLite, TimelineMax } from "gsap";

let container = document.querySelector('[data-scroll-container]'),
    // elem = document.querySelector('[data-scroll]'),
    soc = document.querySelector('.major__networks'),
    aTitle = document.querySelector('.about__title'),
    year = document.querySelector('.major__year'),
    cursor = document.querySelector('.cursor'),
    media = document.querySelector('.media'),
    isDesktop = $(window).width() >= 768;


const scroll = new LocomotiveScroll({
    el: container,
    smooth: true,
    smoothMobile: false,
    scrollFromAnywhere: true
});

scroll.destroy();

(function() {


    scroll.on('call', (e, i, f) => {

        console.log(e, i, f);

        // "fadeIn" === console.log(e, i, f);

        // "lazyload" === e && t.lazyLoad(i, n),
        // "updateBg" === e && t.updateBg(i, n),
        // "updateNav" === e && t.updateNav(i, n),
        // "updateSideNav" === e && t.updateSideNav(i, n),
        // "lazyload" === e && t.lazyLoad(i, n),
        // "recogInView" === e && t.recogInView(i, n),
        // "scaleImg" === e && t.scaleImg(i, n),
        // "toggleVideo" === e && t.toggleVideo(i, n)

    });

    $('.media__logo').click(function(){
        let id = $(this).attr('data-modal-id'),
            modal = $('#' + id);

        // console.log($(window).height());
        console.log($('body').offset().top);
        modal
            .height($(window).height())
            .addClass('open');
        // $('body').addClass('no-scroll');
        scroll.stop();
        $(document).mousedown(function (e){
            var modalContent = $('.media__modal-block');
            if (!modalContent.is(e.target)
            && modalContent.has(e.target).length === 0) {
                $('.media__modal').removeClass('open');
                $('body').removeClass('no-scroll');
                scroll.start();
                scroll.update();
            }
        });
    });

    $('.media__modal-close').click(function(){
        $('.media__modal').removeClass('open');
        $('body').removeClass('no-scroll');
        scroll.start();
        scroll.update();
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
                showCoursor(".residents__picture", 'Подробнее');
            }
        } else {
            $(cursor).removeAttr('style');
        }
    }

    $(document).ready(function() {
        if (isDesktop) {
            scroll.init();
        } else {
            scroll.destroy();
            $('[data-scroll-section]').removeAttr('style');
            return false;
        }
        initCursors();
    });

    $(window).resize(function() {
        if ($(window).width() >= 768) {
            // scroll.init();
            scroll.update();
            console.log($(cursor).attr('style'));
        } else {
            scroll.destroy();
            $('[data-scroll-section]').removeAttr('style');
            return false;
        }
        initCursors();
    });


})();










// import { gsap, TweenLite, TweenMax, TimelineLite, TimelineMax } from "gsap";
// import { EaselPlugin } from "gsap/EaselPlugin";
// import { MotionPathPlugin } from "gsap/MotionPathPlugin";
// // import { PixiPlugin } from "gsap/PixiPlugin";
// // import { TextPlugin } from "gsap/TextPlugin";
// import { ScrollToPlugin } from "gsap/ScrollToPlugin";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
//
// gsap.registerPlugin(EaselPlugin, MotionPathPlugin, ScrollToPlugin, ScrollTrigger);
//
// (function () {
//     // gsap.registerPlugin(EaselPlugin, MotionPathPlugin, PixiPlugin, TextPlugin, ScrollToPlugin, ScrollTrigger);
//
//     // gsap.config({
//     //     autoSleep: 60,
//     //     force3D: 'auto',
//     //     nullTargetWarn: false,
//     //     units: {
//     //         left: "px",
//     //         top: "px",
//     //         rotation: "rad"
//     //     }
//     // });
//
//     let html = document.documentElement;
//     let body = document.body;
//
//     let scroller = {
//         target: document.querySelector("#scroll-container"),
//         ease: 0.07, // <= scroll speed
//         endY: 0,
//         y: 0,
//         resizeRequest: 1,
//         scrollRequest: 0,
//     };
//
//     let requestId = null;
//
//     gsap.set(scroller.target, {
//         rotation: 0.1,
//         force3D: true
//     });
//
//     window.addEventListener("load", onLoad);
//
//     function onLoad() {
//         updateScroller();
//         window.focus();
//         window.addEventListener("resize", onResize);
//         document.addEventListener("scroll", onScroll);
//     }
//
//     function updateScroller() {
//
//         let resized = scroller.resizeRequest > 0;
//
//         if (resized) {
//             let height = scroller.target.clientHeight;
//             body.style.height = height + "px";
//             scroller.resizeRequest = 0;
//         }
//
//         let scrollY = window.pageYOffset || html.scrollTop || body.scrollTop || 0;
//
//         console.log(scrollY);
//
//         scroller.endY = scrollY;
//         scroller.y += (scrollY - scroller.y) * scroller.ease;
//
//         if (Math.abs(scrollY - scroller.y) < 0.05 || resized) {
//             scroller.y = scrollY;
//             scroller.scrollRequest = 0;
//         }
//
//         gsap.set(scroller.target, {
//             y: -scroller.y
//         });
//
//         requestId = scroller.scrollRequest > 0 ? requestAnimationFrame(updateScroller) : null;
//     }
//
//     function onScroll() {
//         scroller.scrollRequest++;
//         if (!requestId) {
//             requestId = requestAnimationFrame(updateScroller);
//         }
//     }
//
//     function onResize() {
//         scroller.resizeRequest++;
//         if (!requestId) {
//             requestId = requestAnimationFrame(updateScroller);
//         }
//     }
//
//     // CURSOR
//     function showCoursor(el, text) {
//         let cursor = $(".cursor");
//
//         let posX = 0,
//         posY = 0;
//
//         let mouseX = 0,
//         mouseY = 0;
//
//         TweenMax.to({}, 0.0016, {
//             repeat: -1,
//             onRepeat: function() {
//                 posX += (mouseX - posX) / 9;
//                 posY += (mouseY - posY) / 9;
//
//                 TweenMax.set(cursor, {
//                     css: {
//                         left: mouseX,
//                         top: mouseY
//                     }
//                 });
//             }
//         });
//
//         $(document).on("mousemove", function(e) {
//             mouseX = e.pageX;
//             mouseY = e.pageY;
//         });
//
//         $(el).on("mouseenter", function() {
//             cursor.addClass("active");
//             cursor.html(text);
//         });
//         $(el).on("mouseleave", function() {
//             cursor.removeClass("active");
//             cursor.html('');
//         });
//         $(el).on("mousedown", function() {
//             cursor.addClass("pressed");
//         });
//         $(el).on("mouseup", function() {
//             cursor.removeClass("pressed");
//         });
//     }
//
//
//     showCoursor(".major__stencil", 'Смотреть видео');
//     showCoursor(".media__logo", 'Читать');
//
//
//     function initParallax(wrap, el) {
//         const box = gsap.timeline({
//             scrollTrigger: {
//                 trigger: wrap,
//                 start: "top 150vh",
//                 end: "bottom top",
//                 scrub: true,
//             }
//         });
//
//         gsap.utils.toArray(el).forEach(layer => {
//             const depth = layer.dataset.depth*3;
//             const movement = -(layer.offsetHeight * depth);
//             console.log(movement);
//             box.to(layer, {
//                 duration: 1.5,
//                 // ease: Power2.easeNone,
//                 ease: "none",
//                 y: movement,
//             });
//         });
//     }
//
//     initParallax('.about', '.about__circle');
//     initParallax('.speakers', '.speakers__circle');
//     initParallax('.residents', '.residents__circle');
//     initParallax('.media', '.media__circle');
// })();
