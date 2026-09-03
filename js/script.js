/* =========================================
   PRELOADER
========================================= */
const preloader = document.getElementById("preloader");
const loaderPercentage = document.getElementById("loader-percentage");
const loaderProgress = document.getElementById("loader-progress");
let progress = 0;
const loaderInterval = setInterval(() => {
    progress++;
    loaderPercentage.textContent = `${progress}%`
    loaderProgress.style.width = `${progress}%`
    if (progress >= 100) {
        clearInterval(loaderInterval);
        setTimeout(() => {
            preloader.classList.add("loaded");
        }, 400);
    }
}, 15);
/* =========================================
   CUSTOM CURSOR
========================================= */
const cursor = document.getElementById("cursor");
document.addEventListener("mousemove", (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
});

const interactiveElements = document.querySelectorAll("a, button");
interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
        cursor.classList.add("cursor-hover");
    });
    element.addEventListener("mouseleave", () => {
        cursor.classList.remove("cursor-hover");
    });
});
/* =========================================
   NAVBAR SCROLL
========================================= */

const navbar = document.getElementById("navbar");


window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});
/* =========================================
   MOBILE MENU
========================================= */

const menuToggle =
    document.getElementById("menu-toggle");

const mobileMenu =
    document.getElementById("mobile-menu");


menuToggle.addEventListener("click", () => {

    const isOpen =
        mobileMenu.classList.toggle("open");

    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute(
        "aria-expanded",
        isOpen
    );

});
const mobileLinks =
    mobileMenu.querySelectorAll("a");


mobileLinks.forEach((link) => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});

/* =========================================
   STATISTICS COUNTER
========================================= */

const counters =
    document.querySelectorAll(".counter");

const statisticsSection =
    document.querySelector(".statistics");

let countersStarted = false;


function startCounters() {

    if (countersStarted) return;

    countersStarted = true;


    counters.forEach((counter) => {

        const target =
            Number(counter.dataset.target);

        let current = 0;

        const increment =
            target / 80;


        function updateCounter() {

            current += increment;


            if (current < target) {

                counter.textContent =
                    Math.floor(current)
                    .toLocaleString();

                requestAnimationFrame(
                    updateCounter
                );

            } else {

                counter.textContent =
                    target.toLocaleString();

            }

        }


        updateCounter();

    });

}


/* Start when section enters viewport */

const statisticsObserver =
    new IntersectionObserver(
        (entries) => {

            if (entries[0].isIntersecting) {

                startCounters();

                statisticsObserver.disconnect();

            }

        },
        {
            threshold: 0.35
        }
    );


if (statisticsSection) {

    statisticsObserver.observe(
        statisticsSection
    );

}