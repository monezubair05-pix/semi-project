// Select Elements

const password = document.getElementById("password");

const togglePassword = document.getElementById("togglePassword");

const strengthText = document.getElementById("strengthText");

const strengthBars = document.querySelectorAll(
    ".strength-bars span"
);

const errorMessage = document.getElementById("errorMessage");


// Account Type Selection

const typeButtons = document.querySelectorAll(".type-btn");

let accountType = "student";

typeButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        typeButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        this.classList.add("active");

        accountType = this.dataset.type;

    });

});


// Show / Hide Password

togglePassword.addEventListener("click", function () {

    if (password.type === "password") {

        password.type = "text";
        this.textContent = "🙈";

    } else {

        password.type = "password";
        this.textContent = "👁";

    }

});


// Password Strength

password.addEventListener("input", function () {

    const value = password.value;

    let score = 0;

    if (value.length >= 8) {
        score++;
    }

    if (/[A-Z]/.test(value)) {
        score++;
    }

    if (/[a-z]/.test(value)) {
        score++;
    }

    if (/[0-9]/.test(value)) {
        score++;
    }

    if (/[^A-Za-z0-9]/.test(value)) {
        score++;
    }

    // Update Strength Bars

    let level = 0;

    if (score >= 2) level = 1;
    if (score >= 3) level = 2;
    if (score >= 4) level = 3;
    if (score === 5) level = 4;

    strengthBars.forEach(function (bar, index) {

        bar.style.background =
            index < level ? "#299c78" : "#e6eaf0";

    });

    // Strength Text

    if (value.length === 0) {

        strengthText.textContent = "Enter password";

    } else if (score <= 2) {

        strengthText.textContent = "Weak password";
        strengthText.style.color = "#e34b5b";

    } else if (score <= 3) {

        strengthText.textContent = "Medium password";
        strengthText.style.color = "#d69b35";

    } else {

        strengthText.textContent = "Good password";
        strengthText.style.color = "#299c78";

    }

});


// Create Account

document.getElementById("signupForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();

        const fullName =
            document.getElementById("fullName").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const pass = password.value;

        const terms =
            document.getElementById("terms").checked;


        // Check Name

        if (fullName.length < 3) {

            errorMessage.textContent =
                "Please enter your full name.";

            return;

        }
        const nameParts = fullName.trim().split(" ");

        const initials =
            nameParts[0][0].toUpperCase() +
            (nameParts[1] ? nameParts[1][0].toUpperCase() : "");

        localStorage.setItem("userInitials", initials);


        // Check Email

        if (!document.getElementById("email").checkValidity()) {

            errorMessage.textContent =
                "Please enter a valid email address.";

            return;

        }


        // Check Password

        const strongPassword =
            pass.length >= 8 &&
            /[A-Z]/.test(pass) &&
            /[a-z]/.test(pass) &&
            /[0-9]/.test(pass) &&
            /[^A-Za-z0-9]/.test(pass);

        if (!strongPassword) {

            errorMessage.textContent =
                "Password must be strong and meet all requirements.";

            return;

        }


        // Check Terms

        if (!terms) {

            errorMessage.textContent =
                "Please agree to the Terms and Privacy Policy.";

            return;

        }


        // Success

        errorMessage.style.color = "#299c78";

        errorMessage.textContent =
            "Account information validated successfully!";

        // Save User Name
        localStorage.setItem("userName", fullName);

        // Go to Homepage
        window.location.href = "../homepage/indeex.html";

    });


// Sign In Link

document.getElementById("signinLink")
    .addEventListener("click", function (event) {

        event.preventDefault();

        window.location.href = "../homepage/indeex.html";

    });