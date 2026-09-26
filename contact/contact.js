(function () {
  "use strict";

  var form = document.getElementById("contact-form");
  var success = document.getElementById("form-success");

  if (!form || !success) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Static-build confirmation state.
    // Replace this block with a real fetch()/POST once a backend endpoint exists.
    form.hidden = true;
    success.hidden = false;
    success.setAttribute("tabindex", "-1");
    success.focus();
  });
})();
