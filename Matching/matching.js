const jobsGrid = document.getElementById("jobsGrid");

const highestBtn = document.getElementById("highestBtn");

const moreBtn = document.getElementById("moreBtn");

const searchInput = document.getElementById("searchInput");

const toast = document.getElementById("toast");

let toastTimer;


// SHOW MESSAGE

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


// GET ALL JOBS

function getJobs() {

    return [...jobsGrid.querySelectorAll(".job-card")];

}


// SORT BY HIGHEST MATCH

highestBtn.addEventListener("click", () => {

    const jobs = getJobs();

    jobs.sort((a, b) => {

        return Number(b.dataset.match) -
               Number(a.dataset.match);

    });

    jobs.forEach(job => jobsGrid.appendChild(job));

    highestBtn.classList.add("active");

    moreBtn.classList.remove("active");

    showToast("Jobs sorted by highest match.");

});


// MORE MATCHES

moreBtn.addEventListener("click", () => {

    const jobs = getJobs();

    jobs.sort((a, b) => {

        return Number(a.dataset.match) -
               Number(b.dataset.match);

    });

    jobs.forEach(job => jobsGrid.appendChild(job));

    moreBtn.classList.add("active");

    highestBtn.classList.remove("active");

    showToast("Showing other job matches.");

});


// SEARCH JOBS

searchInput.addEventListener("input", () => {

    const query = searchInput.value.toLowerCase().trim();

    getJobs().forEach(job => {

        const jobText = job.textContent.toLowerCase();

        job.style.display =
            jobText.includes(query) ? "" : "none";

    });

});


// BOOKMARK JOBS

document.querySelectorAll(".bookmark-btn")
.forEach(button => {

    button.addEventListener("click", () => {

        const isSaved = button.classList.toggle("saved");

        button.setAttribute(
            "aria-pressed",
            String(isSaved)
        );

        button.textContent = isSaved ? "♥️" : "♧";

        showToast(
            isSaved
                ? "Job added to saved jobs."
                : "Job removed from saved jobs."
        );

    });

});


// VIEW OPPORTUNITY

document.querySelectorAll(".view-btn")
.forEach(button => {

    button.addEventListener("click", () => {

        const jobCard = button.closest(".job-card");

        const jobTitle = jobCard.querySelector("h3").textContent;

        const company = jobCard.querySelector(
            ".company strong"
        ).textContent;

        showToast(
            "Opening " + jobTitle + " at " + company
        );

        // Connect this button to the real job details page.

    });

});


// VIEW ALL MATCHES

document.getElementById("viewAllBtn")
.addEventListener("click", () => {

    showToast("Loading all 14 recommended matches.");

    // Connect to the complete matching results page.

});


// ADD PROJECT

document.getElementById("addProjectBtn")
.addEventListener("click", () => {

    const projectName = prompt(
        "Enter your project name:"
    );

    if (!projectName || !projectName.trim()) {

        return;

    }

    showToast(
        projectName + " added to your project list (demo)."
    );

    // Connect to the Add Project page.

});


// MOBILE MENU

document.getElementById("menuBtn")
.addEventListener("click", () => {

    document.getElementById("navLinks")
    .classList.toggle("open");

});