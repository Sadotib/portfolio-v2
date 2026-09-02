(function () {
    "use strict";

    /*
        ============================================================
        ROUTE CONFIGURATION

        IMPORTANT:
        Change these URLs to exactly match your Go routes.

        The array index must match data-slide.

        data-slide="0" -> "/"
        data-slide="1" -> "/about"
        data-slide="2" -> "/projects"
        etc.
        ============================================================
    */

    var routes = [
        "/",
        "/about",
        "/experience",
        "/projects",
        "/misc",
        "/tour",
        "/blog",
        "/contact",
        
    ];


    /*
        ============================================================
        FIND CURRENT PAGE / SLIDE
        ============================================================
    */

    var currentSlide = document.querySelector(".slide[data-slide]");

    /*
        If this page does not contain a slide, stop slideshow logic.

        This prevents errors on pages that might use Base()
        but do not contain a .slide.
    */
    if (!currentSlide) {
        return;
    }

    var current = parseInt(
        currentSlide.getAttribute("data-slide"),
        10
    );

    if (isNaN(current)) {
        current = 0;
    }

    var total = routes.length;


    /*
        ============================================================
        SHARED ELEMENTS
        ============================================================
    */

    var nowEl = document.querySelector(".counter .now");
    var progBar = document.getElementById("progBar");

    var menuBtn = document.getElementById("menuBtn");
    var navPop = document.getElementById("navPop");
    var navClose = document.getElementById("navClose");

    var prevBtn = document.getElementById("prevBtn");
    var nextBtn = document.getElementById("nextBtn");

    var reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    /*
        ============================================================
        BACKGROUND
        ============================================================
    */

    var stageBg = document.getElementById("stageBg");

    var rootCS = getComputedStyle(
        document.documentElement
    );

    var BGVAR = {
        "s-ink": "--ink",
        "s-orange": "--orange",
        "s-lime": "--lime",
        "s-bone": "--bone"
    };

    function slideColor(slide) {

        var key = [
            "s-ink",
            "s-orange",
            "s-lime",
            "s-bone"
        ].filter(function (c) {
            return slide.classList.contains(c);
        })[0] || "s-ink";

        return rootCS
            .getPropertyValue(BGVAR[key])
            .trim() || "#0B0B0B";
    }


    /*
        ============================================================
        HELPERS
        ============================================================
    */

    function debounce(fn, ms) {

        var timer;

        return function () {

            clearTimeout(timer);

            timer = setTimeout(
                fn,
                ms
            );
        };
    }

    function pad(n) {

        return (
            n < 8
                ? "0"
                : ""
        ) + (n + 1);
    }


    /*
        ============================================================
        COUNTER / PROGRESS / BUTTON STATE
        ============================================================
    */

    function update() {

        if (nowEl) {
            nowEl.textContent = pad(current);
        }

        if (progBar) {
            progBar.style.width =
                ((current + 1) / total * 100) + "%";
        }

        /*
            Previous is disabled only on the first route.
        */
        if (prevBtn) {
            prevBtn.disabled = (
                current <= 0
            );
        }

        /*
            Next is disabled only on the last route.
        */
        if (nextBtn) {
            nextBtn.disabled = (
                current >= total - 1
            );
        }
    }


    /*
        ============================================================
        ROUTE NAVIGATION

        This replaces the old system where JavaScript switched
        between multiple .slide elements in one document.
        ============================================================
    */

    function goTo(index) {

        index = Math.max(
            0,
            Math.min(
                total - 1,
                index
            )
        );

        /*
            Don't reload the current page.
        */
        if (index === current) {
            return;
        }

        var targetRoute = routes[index];

        if (!targetRoute) {
            return;
        }

        /*
            Navigate to the actual Go route.
        */
        window.location.href = targetRoute;
    }


    function next() {

        if (current < total - 1) {
            goTo(current + 1);
        }
    }


    function prev() {

        if (current > 0) {
            goTo(current - 1);
        }
    }


    /*
        ============================================================
        MENU
        ============================================================
    */

    function openMenu() {

        if (!navPop) {
            return;
        }

        navPop.classList.add("open");

        navPop.setAttribute(
            "aria-hidden",
            "false"
        );

        if (menuBtn) {
            menuBtn.setAttribute(
                "aria-expanded",
                "true"
            );
        }
    }


    function closeMenu() {

        if (!navPop) {
            return;
        }

        navPop.classList.remove("open");

        navPop.setAttribute(
            "aria-hidden",
            "true"
        );

        if (menuBtn) {
            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );
        }

        /*
            Return focus to the menu button.

            This also avoids the aria-hidden/focus
            accessibility warning you were seeing.
        */
        if (menuBtn) {
            menuBtn.focus();
        }
    }


    if (menuBtn) {
        menuBtn.addEventListener(
            "click",
            openMenu
        );
    }


    if (navClose) {
        navClose.addEventListener(
            "click",
            closeMenu
        );
    }


    /*
        ============================================================
        MENU data-goto NAVIGATION

        Example:

        <a href="#" data-goto="2">

        goes to:

        routes[2]
        ============================================================
    */

    document.addEventListener(
        "click",
        function (e) {

            var target = e.target.closest(
                "[data-goto]"
            );

            if (!target) {
                return;
            }

            e.preventDefault();

            var index = parseInt(
                target.getAttribute("data-goto"),
                10
            );

            if (isNaN(index)) {
                return;
            }

            if (
                navPop &&
                navPop.classList.contains("open")
            ) {
                closeMenu();
            }

            goTo(index);
        }
    );


    /*
        ============================================================
        PREVIOUS / NEXT BUTTONS
        ============================================================
    */

    if (prevBtn) {
        prevBtn.addEventListener(
            "click",
            prev
        );
    }


    if (nextBtn) {
        nextBtn.addEventListener(
            "click",
            next
        );
    }


    /*
        ============================================================
        KEYBOARD NAVIGATION
        ============================================================
    */

    document.addEventListener(
        "keydown",
        function (e) {

            /*
                If menu is open, Escape closes it.
            */
            if (
                navPop &&
                navPop.classList.contains("open")
            ) {

                if (e.key === "Escape") {
                    closeMenu();
                }

                return;
            }


            /*
                Don't trigger page navigation while
                typing inside an input or textarea.
            */
            var tag = document.activeElement
                ? document.activeElement.tagName
                : "";

            if (
                tag === "INPUT" ||
                tag === "TEXTAREA" ||
                tag === "SELECT"
            ) {
                return;
            }


            switch (e.key) {

                case "ArrowRight":
                case "ArrowDown":
                case "PageDown":

                    e.preventDefault();
                    next();

                    break;


                case "ArrowLeft":
                case "ArrowUp":
                case "PageUp":

                    e.preventDefault();
                    prev();

                    break;


                case " ":

                    e.preventDefault();
                    next();

                    break;


                case "Home":

                    e.preventDefault();
                    goTo(0);

                    break;


                case "End":

                    e.preventDefault();
                    goTo(total - 1);

                    break;


                default:

                    /*
                        Number keys:

                        1 -> slide 0
                        2 -> slide 1
                        ...
                        9 -> slide 8
                    */
                    if (
                        /^[1-8]$/.test(e.key)
                    ) {

                        e.preventDefault();

                        goTo(
                            parseInt(
                                e.key,
                                10
                            ) - 1
                        );
                    }

                    break;
            }
        }
    );


    /*
        ============================================================
        SWIPE NAVIGATION

        Works with the single slide currently
        rendered on the route.
        ============================================================
    */

    var swipeTarget =
        document.querySelector(".slide") ||
        document.body;

    var sx = 0;
    var sy = 0;

    var tracking = false;


    swipeTarget.addEventListener(
        "touchstart",
        function (e) {

            if (
                e.touches.length !== 1
            ) {
                tracking = false;
                return;
            }

            if (
                e.target.closest &&
                e.target.closest("[data-noswipe]")
            ) {
                tracking = false;
                return;
            }

            sx = e.touches[0].clientX;
            sy = e.touches[0].clientY;

            tracking = true;

        },
        {
            passive: true
        }
    );


    swipeTarget.addEventListener(
        "touchend",
        function (e) {

            if (!tracking) {
                return;
            }

            tracking = false;

            var touch =
                e.changedTouches[0];

            var dx =
                touch.clientX - sx;

            var dy =
                touch.clientY - sy;


            /*
                Horizontal swipe only.
            */
            if (
                Math.abs(dx) > 60 &&
                Math.abs(dx) >
                Math.abs(dy) * 1.4
            ) {

                if (dx < 0) {
                    next();
                } else {
                    prev();
                }
            }

        },
        {
            passive: true
        }
    );


    /*
        ============================================================
        MARQUEE
        ============================================================
    */

    function fillMarquees() {

        document
            .querySelectorAll(".marquee")
            .forEach(function (m) {

                var track =
                    m.querySelector(".track");

                if (!track) {
                    return;
                }


                if (
                    track.dataset.base === undefined
                ) {
                    track.dataset.base =
                        track.innerHTML;
                }


                var width =
                    m.clientWidth;


                if (
                    track.dataset.fillW !==
                    String(width)
                ) {

                    track.dataset.fillW =
                        String(width);

                    track.innerHTML =
                        track.dataset.base;
                }


                var guard = 0;

                while (
                    track.scrollWidth <
                    width * 2 &&
                    guard < 40
                ) {

                    track.insertAdjacentHTML(
                        "beforeend",
                        track.dataset.base
                    );

                    guard++;
                }


                track.style.animationDuration =
                    Math.max(
                        14,
                        track.scrollWidth / 110
                    )
                        .toFixed(1) + "s";
            });
    }


    /*
        ============================================================
        REVEAL ANIMATIONS
        ============================================================
    */

    function reveal(slide) {

        var items =
            slide.querySelectorAll(
                "[data-reveal]"
            );

        items.forEach(
            function (element, index) {

                if (reduced) {

                    element.classList.add(
                        "in"
                    );

                    return;
                }


                setTimeout(
                    function () {

                        element.classList.add(
                            "in"
                        );

                    },
                    90 + index * 80
                );
            }
        );
    }


    /*
        Failsafe:
        make reveal elements visible after 3 seconds.
    */

    setTimeout(
        function () {

            document
                .querySelectorAll(
                    "[data-reveal]"
                )
                .forEach(
                    function (element) {

                        element.classList.add(
                            "in"
                        );
                    }
                );

        },
        3000
    );


    /*
        ============================================================
        GALLERY NAVIGATION
        ============================================================
    */

    (function () {

        var strip =
            document.getElementById(
                "galStrip"
            );

        var gp =
            document.getElementById(
                "galPrev"
            );

        var gn =
            document.getElementById(
                "galNext"
            );


        if (!strip || !gp || !gn) {
            return;
        }


        function step() {

            var card =
                strip.querySelector(
                    ".shot"
                );

            var cs =
                getComputedStyle(strip);

            var gap =
                parseFloat(
                    cs.columnGap ||
                    cs.gap
                ) || 14;


            return card
                ? card
                    .getBoundingClientRect()
                    .width + gap
                : strip.clientWidth * 0.8;
        }


        function sync() {

            var max =
                strip.scrollWidth -
                strip.clientWidth -
                1;

            gp.disabled =
                strip.scrollLeft <= 0;

            gn.disabled =
                strip.scrollLeft >= max;
        }


        var behavior =
            reduced
                ? "auto"
                : "smooth";


        gp.addEventListener(
            "click",
            function () {

                strip.scrollBy({
                    left: -step(),
                    behavior: behavior
                });
            }
        );


        gn.addEventListener(
            "click",
            function () {

                strip.scrollBy({
                    left: step(),
                    behavior: behavior
                });
            }
        );


        strip.addEventListener(
            "scroll",
            function () {

                window.requestAnimationFrame(
                    sync
                );
            },
            {
                passive: true
            }
        );


        window.addEventListener(
            "resize",
            debounce(
                sync,
                200
            )
        );


        sync();

    })();


    /*
        ============================================================
        INITIALIZATION
        ============================================================
    */

    /*
        Set the background for the current page.
    */

    if (stageBg) {
        stageBg.style.backgroundColor =
            slideColor(currentSlide);
    }


    /*
        Make sure the currently rendered slide is active.
    */

    currentSlide.classList.add(
        "active"
    );


    /*
        Reveal current page content.
    */

    reveal(currentSlide);


    /*
        Update counter and navigation buttons.
    */

    update();


    /*
        Marquee setup.
    */

    fillMarquees();


    if (
        document.fonts &&
        document.fonts.ready
    ) {

        document.fonts.ready.then(
            fillMarquees
        );
    }


    window.addEventListener(
        "resize",
        debounce(
            fillMarquees,
            200
        )
    );

})();