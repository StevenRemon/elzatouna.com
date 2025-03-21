document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("logoutBtn");
    const loggedInUser = JSON.parse(localStorage.getItem("loggedIn"));

    if (!loggedInUser) {
        window.location.href = "login.html"; // توجيه إلى صفحة تسجيل الدخول
        return;
    }

    // عرض بيانات المستخدم
    document.getElementById("userName").textContent = loggedInUser.fullname;
    document.getElementById("userEmail").textContent = loggedInUser.email;
    document.getElementById("userUsername").textContent = loggedInUser.username;
    document.getElementById("userJoined").textContent = new Date().toLocaleDateString(); // تاريخ الانضمام

    // تطبيق الوضع الداكن عند تحميل الصفحة
    const darkModeToggle = document.getElementById("darkMode");
    if (darkModeToggle) {
        if (localStorage.getItem("darkMode") === "true") {
            document.body.classList.add("dark-mode");
            darkModeToggle.checked = true;
        }

        darkModeToggle.addEventListener("change", () => {
            document.body.classList.toggle("dark-mode");
            localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
        });
    }

    // وظيفة تسجيل الخروج
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("loggedIn");
            localStorage.removeItem("darkMode");
            window.location.href = "../index.html"; // العودة إلى الصفحة الرئيسية
        });
    }
});