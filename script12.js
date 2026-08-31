/* =========================================================
   NAVIGATION MENU
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");

if (menuToggle && siteNav) {

    menuToggle.addEventListener("click", function () {

        siteNav.classList.toggle("open");

    });

}


/* =========================================================
   CLOSE MOBILE MENU WHEN LINK IS CLICKED
========================================================= */

const navLinks = document.querySelectorAll(".site-nav a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        if (siteNav) {
            siteNav.classList.remove("open");
        }

    });

});


/* =========================================================
   JOB FORM
========================================================= */

const jobForm = document.getElementById("jobForm");
const formMessage = document.getElementById("formMessage");

if (jobForm) {

    jobForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const companyName =
            document.getElementById("companyName").value.trim();

        const companyEmail =
            document.getElementById("companyEmail").value.trim();

        const jobTitle =
            document.getElementById("jobTitle").value.trim();

        const jobDescription =
            document.getElementById("jobDescription").value.trim();

        const requirements =
            document.getElementById("requirements").value.trim();


        if (
            companyName === "" ||
            companyEmail === "" ||
            jobTitle === "" ||
            jobDescription === "" ||
            requirements === ""
        ) {

            showFormMessage(
                "Please complete all required fields before publishing the job.",
                false
            );

            return;

        }


        /*
            Front-end demo only.

            Since this project is being created using
            HTML, CSS and JavaScript, the form currently
            displays a success message instead of sending
            data to a real server.
        */

        showFormMessage(
            "Your job opportunity has been submitted successfully!",
            true
        );


        jobForm.reset();


        setTimeout(function () {

            formMessage.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }, 100);

    });

}


/* =========================================================
   FORM MESSAGE
========================================================= */

function showFormMessage(message, success) {

    if (!formMessage) {
        return;
    }

    formMessage.textContent = message;

    formMessage.classList.add("show");

    if (success) {

        formMessage.style.background = "#eaf6ef";
        formMessage.style.color = "#16834b";

    } else {

        formMessage.style.background = "#fff4f1";
        formMessage.style.color = "#b54732";

    }

}


/* =========================================================
   BACK TO TOP
========================================================= */

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


/* =========================================================
   SMOOTH SCROLL FOR HERO BUTTON
========================================================= */

const heroButton = document.querySelector(
    '.hero-btn[href="#job-form"]'
);

if (heroButton) {

    heroButton.addEventListener("click", function (event) {

        event.preventDefault();

        const formSection =
            document.getElementById("job-form");

        if (formSection) {

            formSection.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

}