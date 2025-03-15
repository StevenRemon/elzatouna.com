document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const errorMessage = document.getElementById("error-message");

        // ✅ بيانات تسجيل الدخول الوهمية (لاحقًا سيتم ربطها بقاعدة بيانات)
        const validUser = "student";
        const validPass = "1234";

        if (username === validUser && password === validPass) {
            localStorage.setItem("loggedIn", "true");
            window.location.href = "../index.html"; // ✅ بعد النجاح، الانتقال للصفحة الرئيسية
        } else {
            errorMessage.textContent = "⚠️ Invalid username or password!";
        }
    });
});