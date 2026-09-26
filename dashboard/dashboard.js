(function () {
  "use strict";

  
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-link[data-section]"));
  var sections = Array.prototype.slice.call(document.querySelectorAll(".dash-section"));
  var pageTitle = document.getElementById("dash-page-title");
  var pageSub = document.getElementById("dash-page-sub");

  function showSection(id) {
    sections.forEach(function (s) { s.hidden = s.id !== id; });
    navLinks.forEach(function (l) {
      var match = l.getAttribute("data-section") === id;
      l.classList.toggle("active", match);
      if (match) {
        if (pageTitle) pageTitle.textContent = l.getAttribute("data-title") || l.textContent.trim();
        if (pageSub) pageSub.textContent = l.getAttribute("data-sub") || "";
      }
    });
    document.querySelector(".dash-content").scrollTop = 0;
    closeSidebar();
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      showSection(link.getAttribute("data-section"));
    });
  });

  
  Array.prototype.slice.call(document.querySelectorAll("[data-goto-section]")).forEach(function (el) {
    el.addEventListener("click", function () {
      showSection(el.getAttribute("data-goto-section"));
    });
  });

  
  var sidebar = document.getElementById("sidebar");
  var backdrop = document.getElementById("sidebar-backdrop");
  var menuToggle = document.getElementById("sidebar-toggle");
  var sidebarClose = document.getElementById("sidebar-close");

  function openSidebar() {
    if (sidebar) sidebar.classList.add("open");
    if (backdrop) backdrop.classList.add("open");
  }
  function closeSidebar() {
    if (sidebar) sidebar.classList.remove("open");
    if (backdrop) backdrop.classList.remove("open");
  }
  if (menuToggle) menuToggle.addEventListener("click", openSidebar);
  if (sidebarClose) sidebarClose.addEventListener("click", closeSidebar);
  if (backdrop) backdrop.addEventListener("click", closeSidebar);

  
  var menuButtons = Array.prototype.slice.call(document.querySelectorAll("[data-menu-toggle]"));

  function closeAllMenus(except) {
    Array.prototype.slice.call(document.querySelectorAll(".menu-panel")).forEach(function (m) {
      if (m !== except) m.classList.remove("open");
    });
  }

  menuButtons.forEach(function (btn) {
    var panel = document.getElementById(btn.getAttribute("data-menu-toggle"));
    if (!panel) return;
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var willOpen = !panel.classList.contains("open");
      closeAllMenus();
      if (willOpen) panel.classList.add("open");
    });
  });
  document.addEventListener("click", function () { closeAllMenus(); });
  Array.prototype.slice.call(document.querySelectorAll(".menu-panel")).forEach(function (p) {
    p.addEventListener("click", function (e) { e.stopPropagation(); });
  });

  
  var modeBtns = Array.prototype.slice.call(document.querySelectorAll(".seg-btn[data-mode]"));
  var modeFields = Array.prototype.slice.call(document.querySelectorAll("[data-mode-field]"));
  modeBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      modeBtns.forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
      btn.setAttribute("aria-pressed", "true");
      var mode = btn.getAttribute("data-mode");
      modeFields.forEach(function (f) {
        f.style.display = f.getAttribute("data-mode-field") === mode ? "" : "none";
      });
    });
  });

  
  var typeChips = Array.prototype.slice.call(document.querySelectorAll(".chip[data-type]"));
  var vehicleCards = Array.prototype.slice.call(document.querySelectorAll(".vehicle-card[data-type]"));
  typeChips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      typeChips.forEach(function (c) { c.setAttribute("aria-pressed", "false"); });
      chip.setAttribute("aria-pressed", "true");
      var type = chip.getAttribute("data-type");
      vehicleCards.forEach(function (card) {
        card.style.display = (type === "all" || card.getAttribute("data-type") === type) ? "" : "none";
      });
    });
  });

  
  var statusChips = Array.prototype.slice.call(document.querySelectorAll(".chip[data-status]"));
  var bookingRows = Array.prototype.slice.call(document.querySelectorAll("tr[data-status]"));
  statusChips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      statusChips.forEach(function (c) { c.setAttribute("aria-pressed", "false"); });
      chip.setAttribute("aria-pressed", "true");
      var status = chip.getAttribute("data-status");
      bookingRows.forEach(function (row) {
        row.style.display = (status === "all" || row.getAttribute("data-status") === status) ? "" : "none";
      });
    });
  });
})();
