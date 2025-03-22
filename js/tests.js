document.addEventListener("DOMContentLoaded", () => {
    updateUserMenu();
    toggleDarkMode();

    document.querySelectorAll(".require-login").forEach(button => {
        button.addEventListener("click", (e) => {
            if (!localStorage.getItem("loggedIn")) {
                e.preventDefault();
                showLoginModal();
            }
        });
    });
});