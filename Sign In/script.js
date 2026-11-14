// Get Elements

const password = document.getElementById("password");

const togglePassword =
    document.getElementById("togglePassword");

const loginForm =
    document.getElementById("loginForm");

const errorMessage =
    document.getElementById("errorMessage");


// Show / Hide Password

togglePassword.addEventListener("click", function() {

    if (password.type === "password") {

        password.type = "text";
        this.textContent = "🙈";

    } else {

        password.type = "password";
        this.textContent = "👁";

    }

});


// Login Form

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const email =
        document.getElementById("email").value.trim();

    const pass = password.value;

    const remember =
        document.getElementById("remember").checked;


    // Check Email

    if (!email || !email.includes("@")) {

        errorMessage.textContent =
            "Please enter a valid email address.";

        return;

    }


    // Check Password

    if (pass.length < 8) {

        errorMessage.textContent =
            "Password must be at least 8 characters.";

        return;

    }


    // Demo Login

    errorMessage.style.color = "#299c78";

    errorMessage.textContent =
        "Login information is valid!";

    alert(
        "Welcome back to HirePath!\n" +
        "Remember me: " + (remember ? "Yes" : "No")
    );

});


// Google Login

document.getElementById("googleBtn")
.addEventListener("click", function() {

    alert("Google Sign In will be connected soon!");

});


// LinkedIn Login

document.getElementById("linkedinBtn")
.addEventListener("click", function() {

    alert("LinkedIn Sign In will be connected soon!");

});