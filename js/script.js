// ✅ تحديث قائمة المستخدم بناءً على حالة تسجيل الدخول
function updateUserMenu() {
    const loggedIn = localStorage.getItem("loggedIn");
    const accountBtn = document.getElementById("accountBtn");
    const accountLink = document.getElementById("accountLink");
    const accountBtnDrawer = document.getElementById("accountBtnDrawer");
    const accountLinkDrawer = document.getElementById("accountLinkDrawer");

    if (accountBtn && accountLink && accountBtnDrawer && accountLinkDrawer) {
        if (loggedIn) {
            accountBtn.textContent = "👤 Profile";
            accountLink.href = "pages/profile.html";
            accountBtnDrawer.textContent = "👤 Profile";
            accountLinkDrawer.href = "pages/profile.html";
        } else {
            accountBtn.textContent = "🔑 Login";
            accountLink.href = "pages/login.html";
            accountBtnDrawer.textContent = "🔑 Login";
            accountLinkDrawer.href = "pages/login.html";
        }
    }
}

// ✅ تطبيق الوضع الداكن على جميع الصفحات
function applyDarkMode() {
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
}

// ✅ عرض رسالة الترحيب
function showWelcomeMessage() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedIn"));
    const welcomeMessage = document.getElementById("welcomeMessage");

    if (welcomeMessage) {
        if (loggedInUser && localStorage.getItem("showWelcomeMessage") === "true") {
            welcomeMessage.innerHTML = `
                🎉 Welcome, <strong style="color: #FFFFFF;">${loggedInUser.fullname}</strong>!
                <span class="close-welcome">✖️</span>
            `;
            welcomeMessage.style.display = "block";
            localStorage.removeItem("showWelcomeMessage");
        } else {
            welcomeMessage.style.display = "none";
        }

        welcomeMessage.addEventListener("click", (e) => {
            if (e.target.classList.contains("close-welcome")) {
                welcomeMessage.style.display = "none";
            }
        });
    }
}

// ✅ فتح وإغلاق القائمة الجانبية (Drawer)
function toggleDrawer() {
    const drawer = document.getElementById("drawer");
    if (drawer) {
        drawer.classList.toggle("open");
    }
}

// ✅ عرض نموذج تسجيل الدخول
function showLoginModal() {
    window.location.href = "pages/login.html";
}

// ✅ عرض تفاصيل الكورس
function viewCourseDetails(courseId) {
    if (courseId) {
        window.location.href = `pages/course-details.html?id=${courseId}`;
    }
}

// ✅ تحميل الأحداث عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
    updateUserMenu();
    applyDarkMode(); // تطبيق الوضع الداكن
    showWelcomeMessage();

    // ✅ إضافة حدث النقر على أزرار "Enroll Now" و "View Details"
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("require-login")) {
            if (!localStorage.getItem("loggedIn")) {
                e.preventDefault();
                showLoginModal();
            }
        }

        if (e.target.classList.contains("view-details")) {
            const courseId = e.target.dataset.courseId;
            viewCourseDetails(courseId);
        }
    });
});