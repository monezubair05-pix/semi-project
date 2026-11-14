let progress = 34;

const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");

const loading = setInterval(function () {

    if (progress < 100) {

        progress++;

        progressFill.style.width = progress + "%";

        progressText.textContent =
            progress + "% - Preparing best opportunities...";

    } else {

        clearInterval(loading);

        progressText.textContent =
            "100% - Ready to explore!";

        setTimeout(function () {
           window.location.href = "../Sign In/sign.html";
        }, 1000);

    }

}, 100);
