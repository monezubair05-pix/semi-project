let fullName = localStorage.getItem("userName");

const welcomeMessage = document.getElementById("welcomeMessage");

if (welcomeMessage) {
    welcomeMessage.textContent = "Hello, " + fullName;
}

const initials = localStorage.getItem("userInitials");

const userAvatar = document.getElementById("userAvatar");

if (userAvatar) {
    userAvatar.textContent = initials || "U";
}