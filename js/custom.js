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


    $('.tab__item').click(function() {
        var tab_id = $(this).attr('data-tab'),
        $container = $(this).closest('.tab');
        $container.find('.tab__item').removeClass('active');
        $container.find('.tab__mass').removeClass('open');

        $(this).addClass('active');
        $("#" + tab_id).addClass('open');
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

    $('.dom__counter__all').text($('.dom__slider__block').length)
    $('.dom__counter__num').text($('.slick-active').index())

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
         focusOnSelect: true
    });

});
