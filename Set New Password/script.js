const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const strengthText = document.getElementById("strengthText");
const strengthBars = document.querySelectorAll(".strength-bars span");

const errorMessage = document.getElementById("errorMessage");

// Show / Hide Password

document.querySelectorAll(".eye-btn").forEach(button => {

    button.addEventListener("click", function() {

        const target = document.getElementById(
            this.dataset.target
        );

        if (target.type === "password") {
            target.type = "text";
            this.textContent = "🙈";
        } else {
            target.type = "password";
            this.textContent = "👁";
        }

    });

});


// Check Password Requirements

password.addEventListener("input", function() {

    const value = password.value;

    const hasLength = value.length >= 8;

    const hasSpecial = /[^A-Za-z0-9]/.test(value);

    const hasLetters =
        /[A-Z]/.test(value) &&
        /[a-z]/.test(value);

    updateRequirement("length", hasLength);
    updateRequirement("special", hasSpecial);
    updateRequirement("letters", hasLetters);

    // Calculate Strength

    let score = 0;

    if (hasLength) score++;
    if (hasSpecial) score++;
    if (hasLetters) score++;
    if (/[0-9]/.test(value)) score++;

    strengthBars.forEach((bar, index) => {

        bar.style.background =
            index < score ? "#299c78" : "#e6eaf0";

    });

    if (value.length === 0) {
        strengthText.textContent = "Enter a password";
        strengthText.style.color = "#8793a8";
    }
    else if (score <= 1) {
        strengthText.textContent = "Weak password";
        strengthText.style.color = "#e34b5b";
    }
    else if (score <= 3) {
        strengthText.textContent = "Medium password";
        strengthText.style.color = "#d69b35";
    }
    else {
        strengthText.textContent = "Strong password";
        strengthText.style.color = "#299c78";
    }

});


function updateRequirement(id, valid) {

    const element = document.getElementById(id);

    element.classList.toggle("valid", valid);

    element.querySelector("span").textContent =
        valid ? "✓" : "○";

}


// Submit Form

document.getElementById("passwordForm")
.addEventListener("submit", function(event) {

    event.preventDefault();

    const pass = password.value;
    const confirm = confirmPassword.value;

    const hasLength = pass.length >= 8;
    const hasSpecial = /[^A-Za-z0-9]/.test(pass);
    const hasLetters =
        /[A-Z]/.test(pass) &&
        /[a-z]/.test(pass);

    if (!hasLength || !hasSpecial || !hasLetters) {

        errorMessage.textContent =
            "Please meet all password requirements.";

        return;
    }

    if (pass !== confirm) {

        errorMessage.textContent =
            "Passwords do not match!";

        return;
    }

    errorMessage.style.color = "#299c78";

    errorMessage.textContent =
        "Password saved successfully!";

    window.location.href = "../homepage/indeex.html";

});