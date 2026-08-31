/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");

if (menuToggle && siteNav) {

    menuToggle.addEventListener("click", function () {

        siteNav.classList.toggle("open");

    });

}


/* =========================================================
   APPLICATION FORM
========================================================= */

const applicationForm =
    document.getElementById("applicationForm");

const successMessage =
    document.getElementById("successMessage");

const resumeInput =
    document.getElementById("resume");

const fileName =
    document.getElementById("fileName");


/* =========================================================
   RESUME FILE NAME
========================================================= */

if (resumeInput) {

    resumeInput.addEventListener("change", function () {

        if (resumeInput.files.length > 0) {

            const file = resumeInput.files[0];

            fileName.textContent =
                file.name;

        } else {

            fileName.textContent =
                "No file selected";

        }

    });

}


/* =========================================================
   SHOW ERROR
========================================================= */

function showError(input, message) {

    const formGroup =
        input.closest(".form-group");

    if (!formGroup) {
        return;
    }

    const error =
        formGroup.querySelector(".error-message");

    if (error) {
        error.textContent = message;
    }

    input.classList.add("input-error");
}


/* =========================================================
   CLEAR ERROR
========================================================= */

function clearError(input) {

    const formGroup =
        input.closest(".form-group");

    if (!formGroup) {
        return;
    }

    const error =
        formGroup.querySelector(".error-message");

    if (error) {
        error.textContent = "";
    }

    input.classList.remove("input-error");
}


/* =========================================================
   EMAIL VALIDATION
========================================================= */

function validEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}


/* =========================================================
   PHONE VALIDATION
========================================================= */

function validPhone(phone) {

    const cleaned =
        phone.replace(/\D/g, "");

    return cleaned.length >= 10;

}


/* =========================================================
   FORM SUBMISSION
========================================================= */

if (applicationForm) {

    applicationForm.addEventListener("submit", function (event) {

        event.preventDefault();


        let valid = true;


        /* Full Name */

        const fullName =
            document.getElementById("fullName");

        if (fullName.value.trim() === "") {

            showError(
                fullName,
                "Please enter your full name."
            );

            valid = false;

        } else {

            clearError(fullName);

        }


        /* Email */

        const email =
            document.getElementById("email");

        if (email.value.trim() === "") {

            showError(
                email,
                "Please enter your email address."
            );

            valid = false;

        } else if (!validEmail(email.value.trim())) {

            showError(
                email,
                "Please enter a valid email address."
            );

            valid = false;

        } else {

            clearError(email);

        }


        /* Phone */

        const phone =
            document.getElementById("phone");

        if (phone.value.trim() === "") {

            showError(
                phone,
                "Please enter your phone number."
            );

            valid = false;

        } else if (!validPhone(phone.value)) {

            showError(
                phone,
                "Please enter a valid phone number."
            );

            valid = false;

        } else {

            clearError(phone);

        }


        /* Location */

        const location =
            document.getElementById("location");

        if (location.value.trim() === "") {

            showError(
                location,
                "Please enter your location."
            );

            valid = false;

        } else {

            clearError(location);

        }


        /* Position */

        const position =
            document.getElementById("position");

        if (position.value === "") {

            showError(
                position,
                "Please select a position."
            );

            valid = false;

        } else {

            clearError(position);

        }


        /* Experience */

        const experience =
            document.getElementById("experience");

        if (experience.value === "") {

            showError(
                experience,
                "Please select your experience."
            );

            valid = false;

        } else {

            clearError(experience);

        }


        /* Education */

        const education =
            document.getElementById("education");

        if (education.value.trim() === "") {

            showError(
                education,
                "Please enter your education."
            );

            valid = false;

        } else {

            clearError(education);

        }


        /* Skills */

        const skills =
            document.getElementById("skills");

        if (skills.value.trim() === "") {

            showError(
                skills,
                "Please enter your key skills."
            );

            valid = false;

        } else {

            clearError(skills);

        }


        /* Resume */

        if (!resumeInput.files.length) {

            showError(
                resumeInput,
                "Please upload your resume."
            );

            valid = false;

        } else {

            const file =
                resumeInput.files[0];

            const maxSize =
                5 * 1024 * 1024;

            const allowedTypes = [
                "application/pdf",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            ];

            if (file.size > maxSize) {

                showError(
                    resumeInput,
                    "Resume must be smaller than 5MB."
                );

                valid = false;

            } else if (
                !allowedTypes.includes(file.type)
            ) {

                showError(
                    resumeInput,
                    "Please upload a PDF, DOC or DOCX file."
                );

                valid = false;

            } else {

                clearError(resumeInput);

            }

        }


        /* Agreement */

        const agreement =
            document.getElementById("agreement");

        if (!agreement.checked) {

            alert(
                "Please confirm that the information provided is accurate."
            );

            valid = false;

        }


        /* =================================================
           SUCCESS
        ================================================= */

        if (valid) {

            successMessage.classList.add("show");

            applicationForm.reset();

            fileName.textContent =
                "No file selected";

            window.scrollTo({
                top: successMessage.offsetTop - 150,
                behavior: "smooth"
            });

        }

    });

}


/* =========================================================
   BACK TO TOP
========================================================= */

const backToTop =
    document.getElementById("backToTop");

if (backToTop) {

    window.addEventListener("scroll", function () {

        if (window.scrollY > 350) {

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
   CLOSE MOBILE NAV AFTER CLICK
========================================================= */

if (siteNav) {

    const navLinks =
        siteNav.querySelectorAll("a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            siteNav.classList.remove("open");

        });

    });

}