// const lenis = new Lenis();

// lenis.on("scroll", ScrollTrigger.update);

// gsap.ticker.add((time) => {
//     lenis.raf(time * 1000);
// });
// gsap.ticker.lagSmoothing(0);
/*************************************************/

// header

ScrollTrigger.create({
    trigger: ".sc-showcase",
    start: "0% 0%",
    end: "100% 100%",
    onEnter: function () {
        $("header").addClass("on");
    },
    onLeaveBack: function () {
        $("header").removeClass("on");
    },
});

$(`[data-theme="header"]`).each(function () {
    ScrollTrigger.create({
        trigger: $(this)[0], // jQuery 객체에서 DOM 요소로 변환
        start: "0% 0%",
        end: "100% 0%",
        toggleClass: {
            targets: "header, header .nav-list .nav-item .link-story",
            className: "color",
        },
    });
});

$(`[data-theme="heade2"]`).each(function () {
    ScrollTrigger.create({
        trigger: $(this),
        start: "0% 50%",
        end: "100% 100%",
        toggleClass: { targets: "header", className: "dark" },
    });
});

// sc-main text

mainTextTl1 = gsap.timeline({
    scrollTrigger: {
        trigger: ".sc-main",
        start: "0% 0%",
        end: "100% 100%",
        scrub: 1,
    },
});

mainTextTl1.to($(".sc-main .text-wrap .text1"), {
    scale: 1,
});
mainTextTl1.to($(".sc-main .text-wrap .text1"), {
    xPercent: 0,
    x: 0,
    left: "0",
});
mainTextTl1.to($(".sc-main .text-wrap .text1"), {
    top: "0",
    yPercent: 0,
    y: 0,

    position: "relative",
});
mainTextTl1.to(
    $(
        ".sc-main .text-wrap .text2, .sc-main .text-wrap .text3, .sc-main .text-wrap .text4"
    ),
    {
        x: 0,
        opacity: 1,
        stagger: {
            each: 0.05,
            from: "start",
        },
    }
);
mainTextTl1.to(
    $(".sc-main .text-wrap .text1, .sc-main .text-wrap .text3"),
    {
        xPercent: 100,
        opacity: 0,
    },
    "a"
);
mainTextTl1.to(
    $(".sc-main .text-wrap .text2, .sc-main .text-wrap .text4"),
    {
        xPercent: -100,
        opacity: 0,
    },
    "a"
);
mainTextTl1.to($(".sc-main .text-wrap .naver"), {
    opacity: 1,
    y: -90,
});
mainTextTl1.to($(".sc-main .text-wrap .naver"), {
    opacity: 0,
});
mainTextTl1.to($(".sc-main .text-wrap .desc:first-child"), {
    opacity: 1,
});
mainTextTl1.to($(".sc-main .text-wrap .desc-box .desc:nth-child(2)"), {
    opacity: 1,
});
mainTextTl1.to($(".sc-main .text-wrap .desc-box .link-box"), {
    opacity: 1,
});

// sc-showcase text

showTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".sc-showcase",
        start: "0% 0%",
        end: "130% 100%",
        scrub: 0,
    },
});

showTl.to(".sc-showcase .text-box .title", {
    opacity: 1,
});
showTl.to(".sc-showcase .text-box .title", {
    scale: 15,
    opacity: 0,
});
showTl.to(".sc-showcase .show-wrap .text-box", {
    "--opacity": 1,
});

// .sc-guide

guTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".sc-guide",
        start: "5% 0%",
        end: "100% 100%",
        scrub: 0,
    },
});

guTl.to(".sc-guide .title", {
    opacity: 0,
});
guTl.to(".sc-guide .text-desc", {
    opacity: 1,
});

//.sc-guideBg

ScrollTrigger.create({
    trigger: ".sc-guideBg",
    start: "0% 0%",
    end: "100% 50%",
    toggleClass: { targets: ".canvas-area", className: "on" },
});

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1920;
canvas.height = 881;

const frameCount = 251;

const currentFrame = (idx) => {
    return `./assets/images/content/bg${idx}.jpg`;
};

const images = [];
const card = {
    frame: 0,
};

for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i + 1);
    images.push(img);
}

gsap.to(card, {
    frame: frameCount - 1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
        trigger: ".sc-guideBg",
        scrub: 1,
        start: "0% 0%",
        end: "100% 100%",
        // markers: true,
    },
    onUpdate: render,
});

images[0].onload = render;

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(images[card.frame], 0, 0);
}

//.sc-story
horiScroll = gsap.to(".sc-story .story-box", {
    scrollTrigger: {
        trigger: ".sc-story",
        start: "0% 0%",
        end: "100% 100%",
        // markers: true,
        scrub: 0,
        invalidateOnRefresh: true,
    },
    xPercent: -100,
    x: function () {
        return window.innerWidth;
    },
    ease: "none",
});
for (let i = 1; i <= $(".sc-story .inner-list").length; i++) {
    let w =
        $(`.sc-story .inner-list:nth-child(${i})`).outerWidth() -
        $(`.sc-story .inner-list:nth-child(${i}) .title`).outerWidth() -
        96;

    let w2 = $(`.sc-story .inner-list:nth-child(${i})`).outerWidth();
    gsap.to(`.sc-story .inner-list:nth-child(${i}) .title-box`, {
        ease: "none",
        x: function () {
            return w;
        },
        scrollTrigger: {
            trigger: `.sc-story .inner-list:nth-child(${i})`,
            containerAnimation: horiScroll,
            start: "0% 0%",
            end: `${w} 0%`,
            scrub: true,
            onEnter: function () {},
        },
    });

    gsap.to(`.sc-story .inner-list:nth-child(${i}) .marquee-wrap`, {
        ease: "none",
        x: function () {
            return w2;
        },
        scrollTrigger: {
            trigger: `.sc-story .inner-list:nth-child(${i})`,
            containerAnimation: horiScroll,
            start: "0% 0%",
            end: `${w2} 0%`,
            scrub: true,
            toggleAction: "play reverse play reverse",
            toggleClass: {
                targets: `.sc-story .inner-list:nth-child(${i}) .marquee-wrap .marquee-inner`,
                className: "on",
            },
        },
    });
}
