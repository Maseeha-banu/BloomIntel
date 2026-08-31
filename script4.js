/* =========================================================
   INDUSTRIES PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const siteNav = document.getElementById("siteNav");
    const navActions = document.querySelector(".nav-actions");

    if (menuToggle) {

        menuToggle.addEventListener("click", function () {

            siteNav.classList.toggle("open");

            if (navActions) {
                navActions.classList.toggle("open");
            }

        });

    }


    /* =====================================================
       CLOSE MOBILE MENU WHEN LINK IS CLICKED
    ===================================================== */

    const navLinks = document.querySelectorAll(".site-nav a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            siteNav.classList.remove("open");

            if (navActions) {
                navActions.classList.remove("open");
            }

        });

    });


    /* =====================================================
       CLOSE MENU WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener("click", function (event) {

        if (!event.target.closest(".nav-container")) {

            siteNav.classList.remove("open");

            if (navActions) {
                navActions.classList.remove("open");
            }

        }

    });


    /* =====================================================
       SMOOTH SCROLL - EXPLORE INDUSTRIES
    ===================================================== */

    const exploreButton = document.querySelector(
        'a[href="#industries"]'
    );

    if (exploreButton) {

        exploreButton.addEventListener("click", function (event) {

            event.preventDefault();

            const target = document.getElementById("industries");

            if (target) {

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    }


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backToTop = document.getElementById("backToTop");

    if (backToTop) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 400) {

                backToTop.classList.add("show");

            } else {

                backToTop.classList.remove("show");

            }

        });


        backToTop.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       INDUSTRY CARD REVEAL ANIMATION
    ===================================================== */

    const industryCards =
        document.querySelectorAll(".industry-card");

    if ("IntersectionObserver" in window) {

        const cardObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


        industryCards.forEach(function (card) {

            cardObserver.observe(card);

        });

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const currentPage =
        window.location.pathname.split("/").pop();

    navLinks.forEach(function (link) {

        const linkPage =
            link.getAttribute("href");

        if (linkPage === currentPage) {

            navLinks.forEach(function (item) {
                item.classList.remove("active");
            });

            link.classList.add("active");

        }

    });

});