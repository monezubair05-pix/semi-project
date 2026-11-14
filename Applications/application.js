const applicationsList = document.getElementById("applicationsList");

const filterButtons = document.querySelectorAll(".filter-btn");

const searchInput = document.getElementById("searchInput");

const sortSelect = document.getElementById("sortSelect");

const emptyState = document.getElementById("emptyState");

const modal = document.getElementById("modal");

const modalTitle = document.getElementById("modalTitle");

const modalContent = document.getElementById("modalContent");

const toast = document.getElementById("toast");

let currentFilter = "all";

let searchQuery = "";

let toastTimer;


// GET APPLICATIONS

function getApplications() {

    return [
        ...applicationsList.querySelectorAll(".application-card")
    ];

}


// UPDATE STATISTICS

function updateStatistics() {

    const applications = getApplications();

    const total = applications.length;

    const progress = applications.filter(app =>
        app.dataset.status === "progress"
    ).length;

    const attention = applications.filter(app =>
        app.dataset.status === "attention"
    ).length;

    const interviews = applications.filter(app =>
        app.dataset.status === "interview"
    ).length;

    const responded = applications.filter(app =>
        ["progress", "interview"].includes(app.dataset.status)
    ).length;

    const responseRate = total
        ? Math.round((responded / total) * 100)
        : 0;

    document.getElementById("totalCount").textContent = total;

    document.getElementById("allCount").textContent = total;

    document.getElementById("progressCount").textContent = progress;

    document.getElementById("attentionCount").textContent = attention;

    document.getElementById("interviewCount").textContent = interviews;

    document.getElementById("responseRate").textContent =
        responseRate + "%";

    document.getElementById("responseDescription").textContent =
        `${responded} of ${total} employers have responded`;

}


// FILTER APPLICATIONS

function filterApplications() {

    const applications = getApplications();

    let visibleCount = 0;

    applications.forEach(app => {

        const status = app.dataset.status;

        const text = app.textContent.toLowerCase();

        const matchesFilter =
            currentFilter === "all" ||
            status === currentFilter;

        const matchesSearch =
            text.includes(searchQuery);

        const shouldShow =
            matchesFilter && matchesSearch;

        app.style.display = shouldShow ? "" : "none";

        if (shouldShow) {
            visibleCount++;
        }

    });

    emptyState.classList.toggle(
        "show",
        visibleCount === 0
    );

}


// FILTER BUTTONS

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        filterApplications();

    });

});


// SEARCH APPLICATIONS

searchInput.addEventListener("input", () => {

    searchQuery = searchInput.value
        .toLowerCase()
        .trim();

    filterApplications();

});


// SORT APPLICATIONS

sortSelect.addEventListener("change", () => {

    const applications = getApplications();

    const sortType = sortSelect.value;

    applications.sort((a, b) => {

        if (sortType === "newest") {

            return new Date(b.dataset.date) -
                   new Date(a.dataset.date);

        }

        if (sortType === "oldest") {

            return new Date(a.dataset.date) -
                   new Date(b.dataset.date);

        }

        if (sortType === "match") {

            return Number(b.dataset.match) -
                   Number(a.dataset.match);

        }

        return 0;

    });

    applications.forEach(app => {

        applicationsList.appendChild(app);

    });

    filterApplications();

});


// SHOW TOAST MESSAGE

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


// OPEN MODAL

function openModal(title, content) {

    modalTitle.textContent = title;

    modalContent.innerHTML = content;

    modal.classList.add("show");

}


// CLOSE MODAL

function closeModal() {

    modal.classList.remove("show");

}

document.getElementById("closeModal")
    .addEventListener("click", closeModal);

document.getElementById("modalDone")
    .addEventListener("click", closeModal);


// CLOSE WHEN CLICKING OUTSIDE

modal.addEventListener("click", event => {

    if (event.target === modal) {

        closeModal();

    }

});


// VIEW APPLICATION DETAILS

document.querySelectorAll(".details-btn")
.forEach(button => {

    button.addEventListener("click", () => {

        const card = button.closest(".application-card");

        const title = card.querySelector(
            ".application-info h2"
        ).textContent;

        const company = card.querySelector(
            ".company-details"
        ).textContent;

        const match = card.dataset.match;

        openModal(
            "Application Details",
            `
                <p><strong>Position:</strong> ${title}</p>

                <p><strong>Company:</strong> ${company}</p>

                <p><strong>Match Score:</strong> ${match}%</p>

                <p><strong>Status:</strong> Application under review</p>

                <p>Your application is being reviewed by the employer.
                Keep checking for updates.</p>
            `
        );

    });

});


// VIEW INTERVIEW

document.querySelectorAll(".interview-btn")
.forEach(button => {

    button.addEventListener("click", () => {

        openModal(
            "Interview Details",
            `
                <p><strong>Position:</strong> Front-End Developer</p>

                <p><strong>Company:</strong> Paymob</p>

                <p><strong>Platform:</strong> Google Meet</p>

                <p><strong>Date:</strong> Wednesday, 15 May</p>

                <p><strong>Time:</strong> 1:00 PM</p>

                <p><strong>Duration:</strong> 30 Minutes</p>

                <p>Prepare for your upcoming technical interview.</p>
            `
        );

    });

});


// BUILD SKILLS

document.querySelector(".build-btn")
.addEventListener("click", () => {

    openModal(
        "Your Skill Development Plan",
        `
            <p><strong>1. Docker</strong></p>

            <p>Build a small project and demonstrate
            deployment skills.</p>

            <p><strong>2. Unit Testing</strong></p>

            <p>Add tests for your core functions and
            improve code coverage.</p>

            <p><strong>Goal:</strong> Improve your AI matching score
            by developing the missing skills.</p>
        `
    );

});


// MOBILE MENU

document.getElementById("menuBtn")
.addEventListener("click", () => {

    document.getElementById("navLinks")
        .classList.toggle("open");

});


// INITIALIZE PAGE

// Interview is shown separately from applications in progress.

const firstApplication = applicationsList.querySelector(
    ".interview-card"
);

if (firstApplication) {

    firstApplication.dataset.status = "interview";

}

// Data Analyst is still in progress.

const dataAnalyst = [...getApplications()].find(app =>
    app.querySelector("h2")?.textContent === "Data Analyst"
);

if (dataAnalyst) {

    dataAnalyst.dataset.status = "progress";

}

updateStatistics();

filterApplications();