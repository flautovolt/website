document.documentElement.classList.remove("no-js");
/* FL AutoVolt Solution — site behaviour */
(function () {
  var doc = document.documentElement;
  var es = doc.lang === "es";

  // Mobile menu
  var burger = document.querySelector(".burger");
  if (burger) {
    burger.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll(".nav a").forEach(function (a) {
      a.addEventListener("click", function () {
        document.body.classList.remove("nav-open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Scroll reveal
  var els = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add("is-in"); });
  }

  // Pause background videos off-screen / respect reduced motion
  var vids = document.querySelectorAll("video[autoplay]");
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    vids.forEach(function (v) { v.removeAttribute("autoplay"); v.pause(); });
  } else if ("IntersectionObserver" in window) {
    var vo = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { var p = e.target.play(); if (p && p.catch) p.catch(function () {}); }
        else e.target.pause();
      });
    });
    vids.forEach(function (v) { v.muted = true; vo.observe(v); });
  }

  // Works filter
  var grid = document.querySelector("[data-works]");
  if (grid) {
    var pills = document.querySelectorAll("[data-filter]");
    pills.forEach(function (p) {
      p.addEventListener("click", function () {
        var f = p.getAttribute("data-filter");
        pills.forEach(function (q) { q.setAttribute("aria-pressed", q === p ? "true" : "false"); });
        grid.querySelectorAll("[data-cats]").forEach(function (w) {
          w.hidden = !(f === "all" || w.getAttribute("data-cats").split(" ").indexOf(f) >= 0);
        });
      });
    });
  }

  // Quote form -> WhatsApp
  var form = document.querySelector("[data-wa-form]");
  if (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var d = new FormData(form);
      var err = form.querySelector(".form__error");
      if (!String(d.get("name") || "").trim()) { err.hidden = false; form.querySelector("[name=name]").focus(); return; }
      err.hidden = true;
      var L = es
        ? ["Hola FL AutoVolt, quiero una cotización.", "Nombre", "Teléfono", "Correo", "Vehículo", "Modelo", "Servicio", "Detalles"]
        : ["Hi FL AutoVolt, I'd like a quote.", "Name", "Phone", "Email", "Vehicle", "Model", "Service", "Details"];
      var keys = ["name", "phone", "email", "vehicle", "model", "service", "msg"];
      var lines = [L[0], ""];
      keys.forEach(function (k, i) {
        var v = String(d.get(k) || "").trim();
        if (v) lines.push(L[i + 1] + ": " + v);
      });
      var num = String((window.FLAV && window.FLAV.whatsapp) || "").replace(/\D/g, "");
      var url = "https://wa.me/" + num + "?text=" + encodeURIComponent(lines.join("\n"));
      window.open(url, "_blank", "noopener");
    });
  }

  var y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();
})();
