document.addEventListener("DOMContentLoaded", () => {
    updateUserMenu();

    document.querySelectorAll(".require-login").forEach(button => {
        button.addEventListener("click", () => {
            if (!localStorage.getItem("loggedIn")) {
                showLoginModal();
            } else {
                alert("✅ You have access to this feature.");
            }
        });
    });
});

// ✅ Show login modal
function showLoginModal() {
    document.getElementById("loginModal").classList.remove("hidden");
}

// ✅ Close login modal
function closeLoginModal() {
    document.getElementById("loginModal").classList.add("hidden");
}

// ✅ Perform login
function loginUser() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username && password) {
        localStorage.setItem("loggedIn", "true");
        alert("✅ Login successful!");
        closeLoginModal();
        updateUserMenu();
    } else {
        alert("⚠️ Please enter a valid username and password.");
    }
}

// ✅ Logout function
function logoutUser() {
    localStorage.removeItem("loggedIn");
    alert("❌ Logged out successfully!");
    updateUserMenu();
}

// ✅ Update login button
function updateUserMenu() {
    const accountBtn = document.getElementById("accountBtn");

    if (localStorage.getItem("loggedIn")) {
        accountBtn.textContent = "🚪 Logout";
        accountBtn.onclick = logoutUser;
    } else {
        accountBtn.textContent = "🔑 Login";
        accountBtn.onclick = showLoginModal;
    }
}
