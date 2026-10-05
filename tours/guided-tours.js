(function () {
  "use strict";

  var sections = Array.prototype.slice.call(document.querySelectorAll(".tour-section"));

  
  var chips = Array.prototype.slice.call(document.querySelectorAll(".chip[data-goto]"));

  function setActiveChip(id) {
    chips.forEach(function (chip) {
      chip.setAttribute("aria-pressed", chip.getAttribute("data-goto") === id ? "true" : "false");
    });
  }

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var id = chip.getAttribute("data-goto");
      var target = document.getElementById(id);
      if (!target) return;
      var offset = window.innerWidth >= 900 ? 96 : 24;
      var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: top, behavior: "smooth" });
      setActiveChip(id);
    });
  });

  if ("IntersectionObserver" in window && sections.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActiveChip(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (s) { observer.observe(s); });
  }

  
  var rateBtns = Array.prototype.slice.call(document.querySelectorAll(".seg-btn[data-rate]"));
  var priceNums = Array.prototype.slice.call(document.querySelectorAll(".price-num"));
  var priceUnits = Array.prototype.slice.call(document.querySelectorAll("[data-rate-unit]"));

  var unitLabels = {
    person: "per person",
    group: "per private group"
  };

  function formatRupees(n) {
    return "₹" + Number(n).toLocaleString("en-IN");
  }

  function applyRate(rate) {
    priceNums.forEach(function (el) {
      var value = el.getAttribute("data-" + rate);
      if (value) el.textContent = formatRupees(value);
    });
    priceUnits.forEach(function (el) {
      el.textContent = unitLabels[rate] || "";
    });
  }

  rateBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      rateBtns.forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
      btn.setAttribute("aria-pressed", "true");
      applyRate(btn.getAttribute("data-rate"));
    });
  });
})();
