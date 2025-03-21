document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    const errorMessage = document.getElementById("error-message");

    // ✅ تبديل بين علامات التبويب (Tabs)
    document.querySelectorAll(".tab-link").forEach(link => {
        link.addEventListener("click", () => {
            const tabName = link.getAttribute("data-tab");

            document.querySelectorAll(".tab-link").forEach(tab => tab.classList.remove("active"));
            document.querySelectorAll(".tab-content").forEach(content => content.classList.remove("active"));

            link.classList.add("active");
            document.getElementById(`${tabName}Form`).classList.add("active");
        });
    });

    // ✅ تسجيل الدخول
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const user = users.find(u => u.username === username && u.password === password);

            if (user) {
                localStorage.setItem("loggedIn", JSON.stringify(user)); // ✅ حفظ بيانات المستخدم
                localStorage.setItem("showWelcomeMessage", "true");

                // ✅ توجيه المستخدم إلى الصفحة الرئيسية
                window.location.href = "../index.html";
            } else {
                errorMessage.textContent = "⚠️ Invalid username or password!";
            }
        });
    }

    // ✅ التسجيل
    if (signupForm) {
        signupForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const fullname = document.getElementById("fullname").value.trim();
            const email = document.getElementById("email").value.trim();
            const newUsername = document.getElementById("new-username").value.trim();
            const newPassword = document.getElementById("new-password").value.trim();
            const confirmPassword = document.getElementById("confirm-password").value.trim();

            // ✅ التحقق من أن جميع الحقول مملوءة
            if (!fullname || !email || !newUsername || !newPassword || !confirmPassword) {
                errorMessage.textContent = "⚠️ Please fill in all fields!";
                return;
            }

            // ✅ التحقق من تطابق كلمات المرور
            if (newPassword !== confirmPassword) {
                errorMessage.textContent = "⚠️ Passwords do not match!";
                return;
            }

            const users = JSON.parse(localStorage.getItem("users")) || [];

            // ✅ التحقق من عدم وجود اسم مستخدم مكرر
            const userExists = users.some(user => user.username === newUsername);
            if (userExists) {
                errorMessage.textContent = "⚠️ Username already exists!";
                return;
            }

            // ✅ إنشاء مستخدم جديد
            const newUser = { fullname, email, username: newUsername, password: newPassword };
            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));

            // ✅ تنظيف حقول النموذج بعد التسجيل
            signupForm.reset();

            // ✅ إظهار رسالة نجاح
            alert("✅ Sign Up Successful! Please login with your new credentials.");

            // ✅ التبديل إلى علامة تسجيل الدخول
            document.querySelectorAll(".tab-link").forEach(tab => tab.classList.remove("active"));
            document.querySelectorAll(".tab-content").forEach(content => content.classList.remove("active"));
            document.querySelector('[data-tab="login"]').classList.add("active");
            document.getElementById("loginForm").classList.add("active");

            // ✅ تنظيف رسالة الخطأ
            errorMessage.textContent = "";
        });
    }
});