const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

var timeout;

function MouseSqueeze() {

    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function (dets) {

        clearTimeout(timeout);

        xscale = gsap.utils.clamp(.8, 1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(.8, 1.2, dets.clientY - yprev);


        xprev = dets.clientX;
        yprev = dets.clientY;

        CircleMouseFollows(xscale, yscale);

        timeout = setTimeout(function () {
            document.querySelector("#mini-circle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
        }, 100);

    });
}

MouseSqueeze();

function FirstPageAnimation() {
    var tl = gsap.timeline();

    tl.from("#nav", {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo,
    })
        .to(".bounding-elem", {
            y: "0",
            ease: Expo.easeInOut,
            duration: 2,
            delay: -1,
            stagger: .2

        })
        .from("#hero-footer", {
            y: -10,
            opacity: 0,
            duration: 1.5,
            delay: -1,
            ease: Expo.easeInOut
        })
}


function CircleMouseFollows(xscale, yscale) {
    window.addEventListener("mousemove", function (dets) {
        document.querySelector("#mini-circle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    })
}

CircleMouseFollows();

FirstPageAnimation();

document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mouseleave", function () {
        var img = elem.querySelector("img");
        gsap.to(img, {
            opacity: 0,
            ease: "power5.inOut",
            duration: .5,
        });
    });

    elem.addEventListener("mousemove", function (details) {
        var img = elem.querySelector("img");

        // Calculate the center of the image
        var imgCenterX = img.offsetWidth / 2;
        var imgCenterY = img.offsetHeight / 2;

        // Calculate the position of the image relative to the mouse cursor
        var diffX = details.clientX - elem.getBoundingClientRect().left - imgCenterX;
        var diffY = details.clientY - elem.getBoundingClientRect().top - imgCenterY;

        diffrot = details.clientX - rotate;
        rotate = details.clientX;

        // Use Math.min and Math.max to clamp the rotation value
        var rotation = gsap.utils.clamp(-20, 20, diffrot * 0.9);

        gsap.to(img, {
            opacity: 1,
            ease: "power5.inOut",
            x: diffX,
            y: diffY,
            rotation: rotation,
        });
    });
});


