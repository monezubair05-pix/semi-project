
const resetForm = document.getElementById("resetForm");

const emailInput = document.getElementById("email");

const message = document.getElementById("message");

const sendBtn = document.getElementById("sendBtn");


resetForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const email = emailInput.value.trim();

    // Check if email is empty
    if (email === "") {

        alert("Please enter your email address!");

        return;
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        alert("Please enter a valid email address!");

        return;
    }

    // Save email
    localStorage.setItem("resetEmail", email);

    // Go to Verification Page
    window.location.href = "../Enter Verification Code/index.html";

});
