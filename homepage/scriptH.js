// Bookmark Job

const bookmarkBtn = document.getElementById("bookmarkBtn");

bookmarkBtn.addEventListener("click", function() {

    this.classList.toggle("saved");

    if (this.classList.contains("saved")) {
        this.textContent = "♥️";
        alert("Job added to your saved jobs!");
    } else {
        this.textContent = "♡";
        alert("Job removed from saved jobs!");
    }

});


// Apply Now Button

document.getElementById("applyBtn")
.addEventListener("click", function() {

    alert("Redirecting to Job Application!");

});


// Explore Opportunities

document.querySelector(".explore-btn")
.addEventListener("click", function() {

    alert("Explore new job opportunities!");

});


// Continue Learning

document.getElementById("continueLearning")
.addEventListener("click", function(event) {

    event.preventDefault();

    alert("Welcome to your TypeScript learning path!");

});


// Search

document.querySelector(".nav-right input")
.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        const searchValue = this.value.trim();

        if (searchValue !== "") {
            alert("Searching for: " + searchValue);
        }

    }

});


// Navigation Active Link

const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(function(link) {

    link.addEventListener("click", function() {

        navLinks.forEach(function(item) {
            item.classList.remove("active");
        });

        this.classList.add("active");

    });

});
// Get User Name
let fullName = localStorage.getItem("userName");

// Display Welcome Message
document.getElementById("welcomeMessage").textContent =
    "Hello, " + fullName ;
    const initials = localStorage.getItem("userInitials");

document.getElementById("userAvatar").textContent = initials || "U";
