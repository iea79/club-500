import { gsap, TweenLite, TweenMax, TimelineLite, TimelineMax } from "gsap";
// import { EaselPlugin } from "gsap/EaselPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
// import { PixiPlugin } from "gsap/PixiPlugin";
// import { TextPlugin } from "gsap/TextPlugin";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(MotionPathPlugin, ScrollToPlugin, ScrollTrigger);
// gsap.registerPlugin(EaselPlugin, MotionPathPlugin, PixiPlugin, TextPlugin, ScrollToPlugin, ScrollTrigger);

gsap.config({
    autoSleep: 60,
    force3D: 'auto',
    nullTargetWarn: false,
    units: {
        left: "px",
        top: "px",
        rotation: "rad"
    }
});

var html = document.documentElement;
var body = document.body;

var scroller = {
    target: document.querySelector("#scroll-container"),
    ease: 0.07, // <= scroll speed
    endY: 0,
    y: 0,
    resizeRequest: 1,
    scrollRequest: 0,
};

var requestId = null;

gsap.set(scroller.target, {
    rotation: 0.1,
    force3D: true
});

window.addEventListener("load", onLoad);

function onLoad() {
    updateScroller();
    window.focus();
    window.addEventListener("resize", onResize);
    document.addEventListener("scroll", onScroll);
}

function updateScroller() {

    var resized = scroller.resizeRequest > 0;

    if (resized) {
        var height = scroller.target.clientHeight;
        body.style.height = height + "px";
        scroller.resizeRequest = 0;
    }

    var scrollY = window.pageYOffset || html.scrollTop || body.scrollTop || 0;

    scroller.endY = scrollY;
    scroller.y += (scrollY - scroller.y) * scroller.ease;

    if (Math.abs(scrollY - scroller.y) < 0.05 || resized) {
        scroller.y = scrollY;
        scroller.scrollRequest = 0;
    }

    gsap.set(scroller.target, {
        y: -scroller.y
    });

    requestId = scroller.scrollRequest > 0 ? requestAnimationFrame(updateScroller) : null;
}

function onScroll() {
    scroller.scrollRequest++;
    if (!requestId) {
        requestId = requestAnimationFrame(updateScroller);
    }
}

function onResize() {
    scroller.resizeRequest++;
    if (!requestId) {
        requestId = requestAnimationFrame(updateScroller);
    }
}

// CURSOR
var cursor = $(".cursor"),
    follower = $(".cursor-follower");

var posX = 0,
    posY = 0;

var mouseX = 0,
    mouseY = 0;

TweenMax.to({}, 0.0016, {
    repeat: -1,
    onRepeat: function() {
        posX += (mouseX - posX) / 9;
        posY += (mouseY - posY) / 9;

        TweenMax.set(follower, {
            css: {
                left: posX - 12,
                top: posY - 12
            }
        });

        TweenMax.set(cursor, {
            css: {
                left: mouseX,
                top: mouseY
            }
        });
    }
});

$(document).on("mousemove", function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
});
// yellow circle
$(".major__stencil").on("mouseenter", function() {
    cursor.addClass("active");
    // follower.addClass("active");
    cursor.html('Смотреть видео');
});
$(".major__stencil").on("mouseleave", function() {
    cursor.removeClass("active");
    // follower.removeClass("active");
    cursor.html('');
});
$(".major__stencil").on("mousedown", function() {
    cursor.addClass("pressed");
    // follower.addClass("pressed");
});
$(".major__stencil").on("mouseup", function() {
    cursor.removeClass("pressed");
    // follower.removeClass("pressed");
});


function initParallax(wrap, el) {
    const box = gsap.timeline({
        scrollTrigger: {
            trigger: wrap,
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    gsap.utils.toArray(el).forEach(layer => {
        const depth = layer.dataset.depth*5;
        const movement = -(layer.offsetHeight * depth);
        console.log(depth);
        console.log(movement);
        box.to(layer, {y: movement, ease: "none"}, 0);
    });
}

initParallax('.about', '.about__circle');
initParallax('.speakers', '.speakers__circle');
initParallax('.residents', '.residents__circle');
initParallax('.media', '.media__circle');
