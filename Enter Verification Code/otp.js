const otpInputs = document.querySelectorAll(".otp-input");

const otpForm = document.getElementById("otpForm");

const resendBtn = document.getElementById("resendBtn");

const timerElement = document.getElementById("timer");

const verifyBtn = document.getElementById("verifyBtn");

const toast = document.getElementById("toast");

let countdown = 30;
let timerInterval;


// SHOW MESSAGE

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);

}


// OTP INPUT MOVEMENT

otpInputs.forEach((input, index) => {

    input.addEventListener("input", () => {

        input.value = input.value.replace(/\D/g, "");

        if (input.value) {

            input.classList.add("filled");

            if (index < otpInputs.length - 1) {

                otpInputs[index + 1].focus();

            }

        } else {

            input.classList.remove("filled");

        }

    });


    // BACKSPACE

    input.addEventListener("keydown", (event) => {

        if (
            event.key === "Backspace" &&
            input.value === "" &&
            index > 0
        ) {

            otpInputs[index - 1].focus();

        }

    });

});


// PASTE OTP CODE

otpInputs[0].addEventListener("paste", (event) => {

    event.preventDefault();

    const pastedCode = event.clipboardData
        .getData("text")
        .replace(/\D/g, "")
        .slice(0, 4);

    pastedCode.split("").forEach((digit, index) => {

        otpInputs[index].value = digit;

        otpInputs[index].classList.add("filled");

    });

    const nextEmpty = [...otpInputs].findIndex(
        input => !input.value
    );

    if (nextEmpty !== -1) {

        otpInputs[nextEmpty].focus();

    } else {

        otpInputs[3].focus();

    }

});


// COUNTDOWN TIMER

function startTimer() {

    clearInterval(timerInterval);

    countdown = 30;

    resendBtn.disabled = true;

    updateTimer();

    timerInterval = setInterval(() => {

        countdown--;

        updateTimer();

        if (countdown <= 0) {

            clearInterval(timerInterval);

            resendBtn.disabled = false;

            timerElement.textContent = "00:00";

        }

    }, 1000);

}


function updateTimer() {

    let seconds = String(countdown).padStart(2, "0");

    timerElement.textContent = "00:" + seconds;

}


// RESEND CODE

resendBtn.addEventListener("click", () => {

    otpInputs.forEach(input => {

        input.value = "";

        input.classList.remove("filled");

    });

    otpInputs[0].focus();

    startTimer();

    showToast("A new verification code was requested.");

});



otpForm.addEventListener("submit", function(event) {

    event.preventDefault();

    // Check every input
    for (let i = 0; i < otpInputs.length; i++) {

        if (otpInputs[i].value.trim() === "") {

            showToast("Please enter all 4 digits!");

            otpInputs[i].focus();

            return;
        }
    }

    // Check that every input contains one digit
    for (let i = 0; i < otpInputs.length; i++) {

        if (!/^\d$/.test(otpInputs[i].value)) {

            showToast("Please enter valid numbers!");

            otpInputs[i].focus();

            return;
        }
    }

    // All four digits are entered
    verifyBtn.disabled = true;

    window.location.href = "../Set New Password/index.html";

});





// EDIT EMAIL

document.getElementById("editEmail")
    .addEventListener("click", () => {

        const newEmail = prompt(
            "Enter your new email address:"
        );

        if (
            newEmail &&
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail.trim())
        ) {

            showToast("Email edit requested. Please sign in again.");

        } else if (newEmail !== null) {

            showToast("Please enter a valid email address.");

        }

    });




// START TIMER

startTimer();