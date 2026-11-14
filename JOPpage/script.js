
// Jobs Data

const jobs = [
    {
        id: 1,
        initials: "PM",
        title: "Front-End",
        company: "PixelMint - Front-End Developer",
        location: "Remote - US & Europe",
        city: "Remote",
        type: "Full-Time",
        salary: "$80k-$110k / year",
        posted: "2 hours ago",
        match: 94,
        tags: ["React", "TypeScript", "Tailwind"]
    },

    {
        id: 2,
        initials: "VO",
        title: "Data Analyst",
        company: "VerteOne - Analytics team",
        location: "London, UK - Hybrid",
        city: "London",
        type: "Full-Time",
        salary: "£42k-£58k / year",
        posted: "4 hours ago",
        match: 88,
        tags: ["SQL", "Python", "Power BI"]
    },

    {
        id: 3,
        initials: "SW",
        title: "UI/UX",
        company: "StudioWave - UI/UX Designer",
        location: "Remote - Worldwide",
        city: "Remote",
        type: "Full-Time",
        salary: "$65k-$85k / year",
        posted: "6 hours ago",
        match: 91,
        tags: ["Figma", "Prototyping", "User research"]
    },

    {
        id: 4,
        initials: "SI",
        title: "AI Intern",
        company: "Synapse Intelligence - AI research",
        location: "Berlin, DE - Hybrid",
        city: "Berlin",
        type: "Internship",
        salary: "€1.8k-€2.4k / month",
        posted: "1 day ago",
        match: 82,
        tags: ["Python", "PyTorch", "Machine learning"]
    }
];

let savedJobs = new Set();
let showingSaved = false;

// Elements

const jobsContainer = document.getElementById("jobsContainer");
const searchInput = document.getElementById("searchInput");
const locationFilter = document.getElementById("locationFilter");
const typeFilter = document.getElementById("typeFilter");
const sortFilter = document.getElementById("sortFilter");
const savedFilter = document.getElementById("savedFilter");
const savedCount = document.getElementById("savedCount");
const emptyState = document.getElementById("emptyState");

// Render Jobs

function renderJobs() {

    let filteredJobs = [...jobs];

    const searchValue = searchInput.value.toLowerCase().trim();
    const selectedLocation = locationFilter.value;
    const selectedType = typeFilter.value;

    // Search

    filteredJobs = filteredJobs.filter(job => {

        const searchable =
            `${job.title} ${job.company} ${job.location} ${job.tags.join(" ")}`
            .toLowerCase();

        return searchable.includes(searchValue);

    });

    // Location Filter

    if (selectedLocation) {
        filteredJobs = filteredJobs.filter(job =>
            job.city === selectedLocation
        );
    }

    // Job Type Filter

    if (selectedType) {
        filteredJobs = filteredJobs.filter(job =>
            job.type === selectedType
        );
    }

    // Saved Filter

    if (showingSaved) {
        filteredJobs = filteredJobs.filter(job =>
            savedJobs.has(job.id)
        );
    }

    // Sorting

    if (sortFilter.value === "highest") {
        filteredJobs.sort((a, b) => b.match - a.match);
    }

    if (sortFilter.value === "lowest") {
        filteredJobs.sort((a, b) => a.match - b.match);
    }

    // Update UI

    jobsContainer.innerHTML = "";

    filteredJobs.forEach(job => {

        const isSaved = savedJobs.has(job.id);

        const card = document.createElement("article");

        card.className = "job-card";

        card.innerHTML = `

            <div class="company-logo">
                ${job.initials}
            </div>

            <div class="job-info">

                <div class="job-title">
                    <h2>${job.title}</h2>
                    <span class="company-name">
                        ${job.company}
                    </span>
                </div>

                <div class="job-meta">
                    <span>${job.location}</span>
                    <span>${job.salary}</span>
                    <span>${job.posted}</span>
                </div>

                <div class="tags">
                    <span class="tag">${job.type}</span>

                    ${job.tags.map(tag =>
                        `<span class="tag">${tag}</span>`
                    ).join("")}

                </div>

            </div>

            <div class="match-section">

                <div class="match-circle">
                    <strong>${job.match}%</strong>
                    <small>MATCH</small>
                </div>

            </div>

            <div class="job-actions">

                <button
                    class="save-btn ${isSaved ? "saved" : ""}"
                    onclick="toggleSave(${job.id})"
                >
                    ${isSaved ? "♥ Saved" : "Save for later ♧"}
                </button>

                <button
                    class="apply-btn"
                    onclick="viewJob(${job.id})"
                >
                    View Details & Apply →
                </button>

            </div>

        `;

        jobsContainer.appendChild(card);

    });

    emptyState.style.display =
        filteredJobs.length === 0 ? "block" : "none";

    savedCount.textContent = savedJobs.size;

}

// Save / Unsave Jobs

function toggleSave(id) {

    if (savedJobs.has(id)) {
        savedJobs.delete(id);
    } else {
        savedJobs.add(id);
    }

    renderJobs();

}

// View Job Details

function viewJob(id) {

    const job = jobs.find(item => item.id === id);

    if (!job) return;

    alert(`
Job Title: ${job.title}

Company: ${job.company}

Location: ${job.location}

Salary: ${job.salary}

Match: ${job.match}%

Skills: ${job.tags.join(", ")}

Application page coming soon!
    `);

}

// Events

searchInput.addEventListener("input", renderJobs);

locationFilter.addEventListener("change", renderJobs);

typeFilter.addEventListener("change", renderJobs);

sortFilter.addEventListener("change", renderJobs);

savedFilter.addEventListener("click", () => {

    showingSaved = !showingSaved;

    savedFilter.style.opacity = showingSaved ? "0.6" : "1";

    renderJobs();

});

// Initial Render

renderJobs();
