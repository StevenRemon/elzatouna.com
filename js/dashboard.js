document.addEventListener("DOMContentLoaded", () => {
    updateUserMenu();
    toggleDarkMode();

    // ✅ إضافة حدث النقر على أزرار "Enroll Now" و "View Details"
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("require-login")) {
            if (!localStorage.getItem("loggedIn")) {
                e.preventDefault();
                showLoginModal();
            }
        }
    });
});