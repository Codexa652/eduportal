// Lightweight site-wide helpers: session + guard + small UI hooks.
// This is a static-site demo (localStorage-based), not secure auth.
(() => {
  const STORAGE_KEY = "eduportal_session";

  function safeJsonParse(value) {
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  }

  function getSession() {
    const raw = localStorage.getItem(STORAGE_KEY);
    const session = raw ? safeJsonParse(raw) : null;
    if (!session || typeof session !== "object") return null;
    if (session.role !== "student" && session.role !== "teacher" && session.role !== "hod")
      return null;
    return {
      role: session.role,
      email: typeof session.email === "string" ? session.email : "",
      name: typeof session.name === "string" ? session.name : "",
    };
  }

  function setSession(session) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  }

  function clearSession() {
    localStorage.removeItem(STORAGE_KEY);
  }

  function login({ role, email, name }) {
    if (role !== "student" && role !== "teacher" && role !== "hod") return;
    if (typeof email !== "string" || typeof name !== "string") return;

    setSession({
      role,
      email,
      name,
      createdAt: Date.now(),
    });

    let target = "index.html"; // Default fallback
    if (role === "student") target = "dashboard.html";
    else if (role === "teacher") target = "teacher-dashboard.html";
    else if (role === "hod") target = "hod-dashboard.html";
    window.location.href = target;
  }

  function logout({ redirectTo = "index.html" } = {}) {
    clearSession();
    window.location.href = redirectTo;
  }

  function requireRole(role) {
    const session = getSession();
    if (!session) {
      window.location.href = "login.html";
      return null;
    }
    if (role && session.role !== role) {
      let target = "dashboard.html";
      if (session.role === "teacher") target = "teacher-dashboard.html";
      if (session.role === "hod") target = "hod-dashboard.html";
      window.location.href = target;
      return null;
    }
    return session;
  }

  function wireLogoutButtons() {
    document.querySelectorAll("[data-eduportal-logout]").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        logout({ redirectTo: "index.html" });
      });
    });
  }

  function renderUserBadges() {
    const session = getSession();
    document.querySelectorAll("[data-eduportal-user]").forEach((el) => {
      if (!session) {
        el.textContent = "Guest";
        return;
      }
      const label =
        session.name ||
        session.email ||
        (session.role === "teacher"
          ? "Teacher"
          : session.role === "hod"
          ? "HOD"
          : "Student");
      el.textContent = label;
    });
  }

  function initDarkMode() {
    // Check storage for preference
    const isDark = localStorage.getItem("eduportal_dark_mode") === "true";
    if (isDark) document.body.classList.add("dark-mode");

    // Create Floating Toggle Button
    const btn = document.createElement("button");
    btn.textContent = isDark ? "☀️" : "🌙";
    btn.style.position = "fixed";
    btn.style.bottom = "20px";
    btn.style.right = "20px";
    btn.style.width = "50px";
    btn.style.height = "50px";
    btn.style.borderRadius = "50%";
    btn.style.border = "none";
    btn.style.backgroundColor = "var(--primary-color)";
    btn.style.color = "#fff";
    btn.style.fontSize = "1.5rem";
    btn.style.cursor = "pointer";
    btn.style.zIndex = "9999";
    btn.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";

    btn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const currentMode = document.body.classList.contains("dark-mode");
      localStorage.setItem("eduportal_dark_mode", currentMode);
      btn.textContent = currentMode ? "☀️" : "🌙";
    });

    document.body.appendChild(btn);
  }

  // Expose for page scripts (auth page, dashboards, etc.)
  window.EduPortal = {
    getSession,
    login,
    logout,
    requireRole,
    clearSession,
  };

  document.addEventListener("DOMContentLoaded", () => {
    wireLogoutButtons();
    renderUserBadges();
    initDarkMode();
  });
})();
