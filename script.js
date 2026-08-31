/* =========================
   SEARCH FUNCTION
========================= */

const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", function () {

    const keyword = document.getElementById("jobKeyword").value.trim();
    const location = document.getElementById("location").value.trim();
    const jobType = document.getElementById("jobType").value;

    if (keyword === "" && location === "" && jobType === "") {

        alert("Please enter a job title, location, or select a job type.");

        return;
    }

    console.log("Search Details:");
    console.log("Job:", keyword);
    console.log("Location:", location);
    console.log("Job Type:", jobType);

    /*
        Later we can connect this to your Jobs page.

        For now, it simply confirms that
        the search button is working.
    */

    alert("Searching for jobs...");

});


/* =========================
   GET STARTED BUTTON
========================= */

const getStarted = document.querySelector(".get-started");

getStarted.addEventListener("click", function () {

    console.log("Get Started clicked");

});


/* =========================
   NAVIGATION ACTIVE STATE
========================= */

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.forEach(function (item) {
            item.classList.remove("active");
        });

        this.classList.add("active");

    });

});