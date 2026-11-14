const toast = document.getElementById("toast");

let toastTimer;

// Show Messages

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


// Mobile Menu

document.getElementById("menuBtn")
.addEventListener("click", () => {

    document.getElementById("navLinks")
    .classList.toggle("open");

});


// Edit Career Profile

document.getElementById("editProfile")
.addEventListener("click", () => {

    const newName = prompt(
        "Enter your name:",
        "Ahmed Ali"
    );

    if (newName && newName.trim()) {

        document.getElementById("userName")
        .innerHTML = `${escapeHTML(newName)}
        <span class="verified">✓</span>`;

        showToast("Profile updated successfully!");

    }

});


// AI Alerts Switches

document.querySelectorAll(".switch input")
.forEach((toggle, index) => {

    toggle.addEventListener("change", () => {

        const alertName = index === 0
            ? "Instant Match Alerts"
            : "Interview Updates";

        const status = toggle.checked
            ? "Enabled"
            : "Disabled";

        showToast(alertName + " " + status);

    });

});


// Settings Rows

document.querySelectorAll(
    ".setting-row[data-setting]"
).forEach(row => {

    row.addEventListener("click", () => {

        const setting = row.dataset.setting;

        if (setting === "Language") {

            const language = prompt(
                "Choose language: Arabic or English",
                "Arabic"
            );

            if (language && language.trim()) {

                row.querySelector(".setting-value")
                .textContent = language;

                showToast("Language preference updated.");

            }

        }

        else if (setting === "Salary Preference") {

            const salary = prompt(
                "Enter expected salary:",
                "15000"
            );

            if (salary && salary.trim()) {

                row.querySelector(".setting-value")
                .textContent = salary + " EGP";

                showToast("Salary preference updated.");

            }

        }

        else {

            showToast(setting + " settings opened.");

        }

    });

});


// Logout

document.getElementById("logoutBtn")
.addEventListener("click", () => {

    const confirmLogout = confirm(
        "Are you sure you want to log out?"
    );

    if (confirmLogout) {

        showToast("Logout is a demo action.");

    }

});


// Escape HTML

function escapeHTML(value) {

    return value.replace(/[&<>"']/g, char => ({

        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"

    }[char]));

}