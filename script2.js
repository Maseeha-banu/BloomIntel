document.addEventListener("DOMContentLoaded", () => {

    /* ================================
       YEAR
    ================================= */

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    /* ================================
       MOBILE MENU
    ================================= */

    const menuToggle = document.getElementById("menuToggle");
    const siteNav = document.getElementById("siteNav");

    if (menuToggle && siteNav) {

        menuToggle.addEventListener("click", () => {

            const opened = siteNav.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(opened)
            );

            const icon = menuToggle.querySelector("i");

            if (icon) {

                if (opened) {
                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");
                } else {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }

            }

        });

    }


    /* ================================
       READ MORE / READ LESS
    ================================= */

    const readMoreButtons =
        document.querySelectorAll(".read-more-btn");

    readMoreButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const card = button.closest(".about-card");

            if (!card) return;

            const expanded =
                card.classList.toggle("is-expanded");

            if (expanded) {

                button.textContent = "Read Less";

            } else {

                button.textContent = "Read More";

            }

        });

    });


    /* ================================
       REVIEW FORM
    ================================= */

    const reviewForm =
        document.getElementById("reviewForm");

    const reviewMessage =
        document.getElementById("reviewMessage");


    if (reviewForm) {

        reviewForm.addEventListener("submit", (event) => {

            event.preventDefault();

            const name =
                document.getElementById("reviewName")?.value.trim();

            const rating =
                document.getElementById("reviewRating")?.value;

            const review =
                document.getElementById("reviewText")?.value.trim();


            if (!name || !rating || !review) {

                if (reviewMessage) {
                    reviewMessage.textContent =
                        "Please complete all fields.";
                }

                return;
            }


            /*
             * Save the review locally so it remains
             * available in the browser.
             */

            const savedReviews =
                JSON.parse(
                    localStorage.getItem("bloomintel-reviews") || "[]"
                );


            savedReviews.push({

                name: name,

                rating: Number(rating),

                review: review,

                createdAt: new Date().toISOString()

            });


            localStorage.setItem(
                "bloomintel-reviews",
                JSON.stringify(savedReviews)
            );


            if (reviewMessage) {

                reviewMessage.textContent =
                    "Thank you for your review!";

            }


            reviewForm.reset();

        });

    }


    /* ================================
       SCROLL PROGRESS
    ================================= */

    const progressBar =
        document.createElement("div");

    progressBar.className =
        "scroll-progress";

    document.body.prepend(progressBar);


    const backToTop =
        document.getElementById("backToTop");


    const updateScrollEffects = () => {

        const scrollTop =
            window.scrollY;

        const pageHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;


        const progress =
            pageHeight > 0
                ? (scrollTop / pageHeight) * 100
                : 0;


        progressBar.style.width =
            `${Math.min(progress, 100)}%`;


        if (backToTop) {

            backToTop.classList.toggle(
                "show",
                scrollTop > 500
            );

        }

    };


    window.addEventListener(
        "scroll",
        updateScrollEffects
    );

    updateScrollEffects();


    /* ================================
       BACK TO TOP
    ================================= */

    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }


    /* ================================
       REVEAL ANIMATION
    ================================= */

    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        revealElements.forEach((element) => {

            const observer =
                new IntersectionObserver(
                    (entries) => {

                        entries.forEach((entry) => {

                            if (entry.isIntersecting) {

                                entry.target.classList.add("show");

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        });

                    },
                    {
                        threshold: 0.15
                    }
                );


            observer.observe(element);

        });

    } else {

        revealElements.forEach((element) => {

            element.classList.add("show");

        });

    }

});