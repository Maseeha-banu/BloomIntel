document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       JOB DATA
    ===================================================== */

    const jobs = [
        {
            title: "Frontend Developer",
            company: "Google",
            location: "Remote",
            workType: "Full Time",
            experience: "3+ Years",
            skills: ["React", "JavaScript", "CSS"],
            icon: "fa-solid fa-code",
            posted: "2 days ago"
        },

        {
            title: "Product Designer",
            company: "Microsoft",
            location: "Seattle",
            workType: "Full Time",
            experience: "5+ Years",
            skills: ["UI/UX", "Figma", "Research"],
            icon: "fa-solid fa-pen-ruler",
            posted: "3 days ago"
        },

        {
            title: "Data Analyst",
            company: "Amazon",
            location: "Hybrid",
            workType: "Full Time",
            experience: "2+ Years",
            skills: ["SQL", "Python", "Excel"],
            icon: "fa-solid fa-chart-line",
            posted: "4 days ago"
        },

        {
            title: "Backend Engineer",
            company: "Meta",
            location: "Menlo Park",
            workType: "Full Time",
            experience: "4+ Years",
            skills: ["Python", "Node.js", "API"],
            icon: "fa-solid fa-server",
            posted: "5 days ago"
        },

        {
            title: "DevOps Engineer",
            company: "Apple",
            location: "Cupertino",
            workType: "Full Time",
            experience: "5+ Years",
            skills: ["Docker", "AWS", "Linux"],
            icon: "fa-solid fa-cloud",
            posted: "1 week ago"
        },

        {
            title: "UX Researcher",
            company: "Tesla",
            location: "Palo Alto",
            workType: "Full Time",
            experience: "3+ Years",
            skills: ["User Research", "UX", "Testing"],
            icon: "fa-solid fa-users",
            posted: "1 week ago"
        },

        {
            title: "Data Scientist",
            company: "Netflix",
            location: "Remote",
            workType: "Remote",
            experience: "4+ Years",
            skills: ["Python", "Machine Learning", "SQL"],
            icon: "fa-solid fa-brain",
            posted: "1 week ago"
        },

        {
            title: "System Administrator",
            company: "IBM",
            location: "Austin",
            workType: "Full Time",
            experience: "2+ Years",
            skills: ["Linux", "Cloud", "Networking"],
            icon: "fa-solid fa-network-wired",
            posted: "8 days ago"
        },

        {
            title: "Database Administrator",
            company: "Oracle",
            location: "Redwood City",
            workType: "Full Time",
            experience: "5+ Years",
            skills: ["SQL", "PostgreSQL", "Database"],
            icon: "fa-solid fa-database",
            posted: "9 days ago"
        },

        {
            title: "Security Engineer",
            company: "Cisco",
            location: "San Jose",
            workType: "Full Time",
            experience: "4+ Years",
            skills: ["Cybersecurity", "Network", "Security"],
            icon: "fa-solid fa-shield-halved",
            posted: "10 days ago"
        },

        {
            title: "UI/UX Designer",
            company: "Adobe",
            location: "Remote",
            workType: "Remote",
            experience: "3+ Years",
            skills: ["Figma", "Design", "Prototyping"],
            icon: "fa-solid fa-wand-magic-sparkles",
            posted: "11 days ago"
        },

        {
            title: "Cloud Architect",
            company: "Salesforce",
            location: "San Francisco",
            workType: "Full Time",
            experience: "6+ Years",
            skills: ["Cloud", "AWS", "Architecture"],
            icon: "fa-solid fa-cloud-arrow-up",
            posted: "12 days ago"
        }
    ];


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const jobGrid = document.getElementById("jobGrid");
    const searchForm = document.getElementById("jobSearchForm");
    const searchInput = document.getElementById("search-term");
    const jobType = document.getElementById("job-type");

    const jobCount = document.getElementById("jobCount");
    const noJobs = document.getElementById("noJobs");

    const searchResultMessage =
        document.getElementById("searchResultMessage");

    const clearSearch =
        document.getElementById("clearSearch");

    const menuToggle =
        document.getElementById("menuToggle");

    const siteNav =
        document.getElementById("siteNav");

    const backToTop =
        document.getElementById("backToTop");

    const year =
        document.getElementById("year");


    /* =====================================================
       ESCAPE HTML
    ===================================================== */

    function escapeHtml(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    /* =====================================================
       RENDER JOBS
    ===================================================== */

    function renderJobs(jobList) {

        jobGrid.innerHTML = "";

        if (jobCount) {
            jobCount.textContent = jobList.length;
        }


        if (!jobList.length) {

            noJobs.classList.add("show");

            searchResultMessage.textContent =
                "No matching opportunities were found.";

            return;
        }


        noJobs.classList.remove("show");


        jobList.forEach((job) => {

            const card = document.createElement("article");

            card.className = "job-card";


            const skills = job.skills
                .map(skill => `
                    <span class="skill-tag">
                        ${escapeHtml(skill)}
                    </span>
                `)
                .join("");


            card.innerHTML = `

                <div class="job-card-top">

                    <div class="company-icon">
                        <i class="${escapeHtml(job.icon)}"></i>
                    </div>

                    <span class="job-type-badge">
                        ${escapeHtml(job.workType)}
                    </span>

                </div>


                <h3>
                    ${escapeHtml(job.title)}
                </h3>

                <p class="company-name">
                    ${escapeHtml(job.company)}
                </p>


                <div class="job-details">

                    <div class="job-detail">
                        <i class="fa-solid fa-location-dot"></i>
                        <span>
                            ${escapeHtml(job.location)}
                        </span>
                    </div>

                    <div class="job-detail">
                        <i class="fa-solid fa-briefcase"></i>
                        <span>
                            ${escapeHtml(job.experience)}
                        </span>
                    </div>

                    <div class="job-detail">
                        <i class="fa-solid fa-clock"></i>
                        <span>
                            ${escapeHtml(job.workType)}
                        </span>
                    </div>

                    <div class="job-detail">
                        <i class="fa-solid fa-building"></i>
                        <span>
                            ${escapeHtml(job.company)}
                        </span>
                    </div>

                </div>


                <div class="skills">
                    ${skills}
                </div>


                <div class="job-card-footer">

                    <span class="posted-time">
                        <i class="fa-regular fa-clock"></i>
                        ${escapeHtml(job.posted)}
                    </span>

                    <a
                        href="application.html?job=${encodeURIComponent(job.title)}&company=${encodeURIComponent(job.company)}"
                        class="apply-btn"
                    >
                        Apply Now
                        <i class="fa-solid fa-arrow-right"></i>
                    </a>

                </div>
            `;


            jobGrid.appendChild(card);

        });


        searchResultMessage.textContent =
            `Showing ${jobList.length} job${jobList.length === 1 ? "" : "s"}.`;
    }


    /* =====================================================
       SEARCH / FILTER
    ===================================================== */

    function filterJobs() {

        const keyword =
            searchInput.value.trim().toLowerCase();

        const selectedType =
            jobType.value;


        const filteredJobs = jobs.filter((job) => {

            const searchableText = `
                ${job.title}
                ${job.company}
                ${job.location}
                ${job.workType}
                ${job.experience}
                ${job.skills.join(" ")}
            `.toLowerCase();


            const matchesKeyword =
                !keyword ||
                searchableText.includes(keyword);


            const matchesType =
                !selectedType ||
                job.workType === selectedType ||
                (
                    selectedType === "Remote" &&
                    job.location === "Remote"
                ) ||
                (
                    selectedType === "Hybrid" &&
                    job.location === "Hybrid"
                );


            return matchesKeyword && matchesType;

        });


        renderJobs(filteredJobs);
    }


    /* =====================================================
       SEARCH FORM
    ===================================================== */

    if (searchForm) {

        searchForm.addEventListener("submit", (event) => {

            event.preventDefault();

            filterJobs();

            document
                .querySelector(".featured-jobs-section")
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

        });

    }


    /* =====================================================
       LIVE SEARCH
    ===================================================== */

    if (searchInput) {

        searchInput.addEventListener("input", () => {
            filterJobs();
        });

    }


    if (jobType) {

        jobType.addEventListener("change", () => {
            filterJobs();
        });

    }


    /* =====================================================
       CLEAR SEARCH
    ===================================================== */

    if (clearSearch) {

        clearSearch.addEventListener("click", () => {

            searchInput.value = "";
            jobType.value = "";

            renderJobs(jobs);

        });

    }


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    if (menuToggle && siteNav) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                siteNav.classList.toggle("open");

            menuToggle.innerHTML = isOpen
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';

        });


        siteNav.querySelectorAll("a").forEach((link) => {

            link.addEventListener("click", () => {

                siteNav.classList.remove("open");

                menuToggle.innerHTML =
                    '<i class="fa-solid fa-bars"></i>';

            });

        });

    }


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    if (backToTop) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 500) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }

        });


        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* =====================================================
       INITIAL LOAD
    ===================================================== */

    renderJobs(jobs);

});