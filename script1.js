/* =====================================================
   BLOOMINTEL HOME PAGE
===================================================== */


/* =====================================================
   YEAR
===================================================== */

const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}



/* =====================================================
   AUTOMATIC HORIZONTAL SCROLL
   WHY CHOOSE US
   3 SECOND INTERVAL
===================================================== */

function automaticScroll(track, interval = 3000) {

    if (!track) return;

    let cards = track.children;

    if (cards.length === 0) return;

    let currentPosition = 0;

    function moveNext() {

        const firstCard = cards[0];

        const cardWidth =
            firstCard.offsetWidth;

        const gap = 20;

        currentPosition += cardWidth + gap;

        track.style.transition =
            "transform 0.7s ease";

        track.style.transform =
            `translateX(-${currentPosition}px)`;


        /*
            When we reach the duplicated
            cards, smoothly reset.
        */

        if (
            currentPosition >=
            (track.scrollWidth / 2) - cardWidth
        ) {

            setTimeout(() => {

                track.style.transition = "none";

                currentPosition = 0;

                track.style.transform =
                    "translateX(0)";

            }, 750);

        }

    }


    setInterval(moveNext, interval);

}



/* WHY CHOOSE US */

automaticScroll(
    document.getElementById("whyTrack"),
    3000
);



/* POPULAR JOB CATEGORIES */

automaticScroll(
    document.getElementById("categoryTrack"),
    3000
);



/* =====================================================
   NEWSLETTER
===================================================== */

const newsletterForm =
    document.getElementById("newsletter-form");

const newsletterMessage =
    document.getElementById("newsletter-message");


if (newsletterForm) {

    newsletterForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const email =
                document.getElementById(
                    "newsletter-email"
                ).value.trim();


            if (email === "") {

                newsletterMessage.textContent =
                    "Please enter your email address.";

                return;

            }


            newsletterMessage.textContent =
                "Thank you! You are now subscribed.";

            newsletterForm.reset();

        }
    );

}



/* =====================================================
   SUBTLE JOB CARD HOVER
   CSS DOES MOST OF THE WORK
===================================================== */

const jobCards =
    document.querySelectorAll(".job-card");


jobCards.forEach(card => {

    card.addEventListener(
        "mouseenter",
        () => {

            card.style.cursor = "pointer";

        }
    );

});



/* =====================================================
   PAUSE AUTO SCROLL WHEN MOUSE IS OVER IT
===================================================== */

function pauseOnHover(track) {

    if (!track) return;

    /*
        This version temporarily pauses the
        automatic movement when the user is
        looking at the cards.
    */

    let intervalId;

    function start() {

        intervalId = setInterval(() => {

            const event =
                new Event("autoScroll");

            track.dispatchEvent(event);

        }, 3000);

    }

}



/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".section-heading, .why-card, .category-card, .job-card, .step, .testimonial-card"
    );


const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(18px)";

    element.style.transition =
        "opacity 0.6s ease, transform 0.6s ease";

    observer.observe(element);

});



/* =====================================================
   REVEAL STYLE
===================================================== */

const revealStyle =
    document.createElement("style");

revealStyle.textContent = `

    .visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

`;

document.head.appendChild(revealStyle);