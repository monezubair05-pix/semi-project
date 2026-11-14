const toast = document.getElementById("toast");

let toastTimer;

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2600);
}

// Mobile Menu

document.getElementById("menuToggle")
.addEventListener("click", () => {

    document.querySelector(".main-nav")
    .classList.toggle("open");

});


// Upload CV

document.getElementById("cvUpload")
.addEventListener("change", (event) => {

    const file = event.target.files[0];

    if (!file) return;

    if (file.type !== "application/pdf") {

        showToast("Please choose a PDF file.");

        event.target.value = "";
        return;
    }

    document.querySelector(".file-name strong")
    .textContent = file.name;

    document.getElementById("uploadStatus")
    .textContent = "Selected: " + file.name;

    showToast("CV selected successfully.");

});


// Edit Profile

document.getElementById("editProfile")
.addEventListener("click", () => {

    const name = prompt(
        "Enter your name:",
        "Ahmed Ali"
    );

    if (name && name.trim()) {

        document.querySelector(".profile-info h2")
        .innerHTML = `${escapeHtml(name.trim())}
        <span class="verified">✓</span>`;

        showToast("Profile name updated.");

    }

});


// Add Experience

document.getElementById("addExperience")
.addEventListener("click", () => {

    const title = prompt("Project or job title:");

    if (!title || !title.trim()) return;

    const description = prompt("Short description:") ||
    "New experience added to your career profile.";

    const item = document.createElement("div");

    item.className = "experience-item";

    item.innerHTML = `
        <div class="item-icon code-icon">✧</div>

        <div class="item-content">
            <h3>${escapeHtml(title.trim())}</h3>
            <p>${escapeHtml(description)}</p>
        </div>
    `;

    document.getElementById("experienceList")
    .appendChild(item);

    showToast("Experience added.");

});


// Education Button

document.getElementById("editEducation")
.addEventListener("click", () => {

    showToast("Education editor is a demo action.");

});


// View Skills

document.getElementById("viewSkills")
.addEventListener("click", () => {

    showToast("All listed skills are visible on this profile.");

});


// Share Career Link

document.getElementById("shareLink")
.addEventListener("click", async () => {

    const link = window.location.href;

    try {

        await navigator.clipboard.writeText(link);

        showToast("Career link copied to clipboard.");

    } catch {

        showToast("Copy is unavailable in this browser.");

    }

});


// Download CV Demo

document.getElementById("downloadCv")
.addEventListener("click", () => {

    const content = `
Ahmed Ali - Junior Front-End

Skills:
React, JavaScript, Git, Tailwind,
HTML/CSS, REST APIs

Education:
B.Sc. Computer Science,
Cairo University
    `;

    const blob = new Blob(
        [content],
        { type: "text/plain" }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "Ahmed_Ali_CV.txt";

    a.click();

    URL.revokeObjectURL(url);

    showToast("Demo CV downloaded.");

});


// Search

document.getElementById("searchInput")
.addEventListener("input", (event) => {

    const query = event.target.value.toLowerCase();

    document.querySelectorAll(
        ".experience-item, .education-item, .skill-list span"
    ).forEach(item => {

        item.style.display =
        item.textContent.toLowerCase().includes(query)
        ? ""
        : "none";

    });

});


// Escape HTML

function escapeHtml(value) {

    return value.replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    }[char]));

}