const root = document.documentElement;

const savedTheme = localStorage.getItem("theme") || "light";
const savedDirection = localStorage.getItem("direction") || "ltr";

root.setAttribute("data-theme", savedTheme);
root.setAttribute("dir", savedDirection);

const themeToggle = document.getElementById("theme-toggle");
const dirToggle = document.getElementById("dir-toggle");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isDark = root.getAttribute("data-theme") === "dark";
    const newTheme = isDark ? "light" : "dark";

    root.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });
}

function updateDirectionButton() {
  if (!dirToggle) return;

  const isRTL = root.getAttribute("dir") === "rtl";

  dirToggle.textContent = isRTL ? "LTR" : "RTL";
}

if (dirToggle) {
  dirToggle.addEventListener("click", () => {
    const isRTL = root.getAttribute("dir") === "rtl";
    const newDirection = isRTL ? "ltr" : "rtl";

    root.setAttribute("dir", newDirection);
    localStorage.setItem("direction", newDirection);

    updateDirectionButton();
  });
}

updateDirectionButton();

const menuToggle = document.getElementById("menu-toggle");
const mobilePanel = document.getElementById("mobile-panel");

if (menuToggle && mobilePanel) {
  menuToggle.addEventListener("click", () => {
    mobilePanel.classList.toggle("open");
  });
}

document.querySelectorAll(".nav-item .caret").forEach((caret) => {
  caret.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    const item = caret.closest(".nav-item");

    if (!item) return;

    const wasOpen = item.classList.contains("open");

    document.querySelectorAll(".nav-item.open").forEach((el) => {
      el.classList.remove("open");
    });

    if (!wasOpen) {
      item.classList.add("open");
    }
  });
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".nav-item")) {
    document.querySelectorAll(".nav-item.open").forEach((el) => {
      el.classList.remove("open");
    });
  }
});

if (mobilePanel) {
  mobilePanel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobilePanel.classList.remove("open");
    });
  });
}

document.addEventListener("click", (e) => {
  if (
    mobilePanel &&
    menuToggle &&
    !mobilePanel.contains(e.target) &&
    !menuToggle.contains(e.target)
  ) {
    mobilePanel.classList.remove("open");
  }
});

window.addEventListener("storage", (event) => {
  if (event.key === "theme") {
    root.setAttribute("data-theme", event.newValue || "light");
  }

  if (event.key === "direction") {
    root.setAttribute("dir", event.newValue || "ltr");
    updateDirectionButton();
  }
});