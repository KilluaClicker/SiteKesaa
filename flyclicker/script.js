(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- sticky nav ---------- */
  var nav = document.getElementById("nav");
  function onScroll() {
    if (!nav) return;
    nav.classList.toggle("scrolled", window.scrollY > 18);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- reveal on scroll ---------- */
  var reveals = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if ("IntersectionObserver" in window && !reduceMotion) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    reveals.forEach(function (el) { revealObserver.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- faq accordion ---------- */
  var faqItems = Array.prototype.slice.call(document.querySelectorAll(".faq-item"));
  faqItems.forEach(function (item) {
    var button = item.querySelector(".faq-q");
    var panel = item.querySelector(".faq-a");
    if (!button || !panel) return;

    button.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");
      faqItems.forEach(function (other) {
        if (other === item) return;
        other.classList.remove("open");
        var ob = other.querySelector(".faq-q");
        var op = other.querySelector(".faq-a");
        if (ob) ob.setAttribute("aria-expanded", "false");
        if (op) op.style.maxHeight = "0px";
      });

      if (isOpen) {
        item.classList.remove("open");
        button.setAttribute("aria-expanded", "false");
        panel.style.maxHeight = "0px";
      } else {
        item.classList.add("open");
        button.setAttribute("aria-expanded", "true");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });

  function refreshOpenFaq() {
    faqItems.forEach(function (item) {
      if (!item.classList.contains("open")) return;
      var panel = item.querySelector(".faq-a");
      if (panel) panel.style.maxHeight = panel.scrollHeight + "px";
    });
  }
  window.addEventListener("resize", refreshOpenFaq, { passive: true });

  /* ---------- hero phone tilt ---------- */
  var phone = document.getElementById("heroPhone");
  var finePointer = window.matchMedia("(pointer: fine)").matches;
  if (phone && finePointer && !reduceMotion) {
    var frame = 0;
    phone.addEventListener("pointermove", function (event) {
      if (frame) return;
      frame = window.requestAnimationFrame(function () {
        frame = 0;
        var rect = phone.getBoundingClientRect();
        var px = (event.clientX - rect.left) / rect.width - 0.5;
        var py = (event.clientY - rect.top) / rect.height - 0.5;
        phone.style.transform =
          "rotate(-2.2deg) perspective(900px) rotateY(" + (px * 7).toFixed(2) + "deg) rotateX(" + (-py * 7).toFixed(2) + "deg) translateY(-3px)";
      });
    });
    phone.addEventListener("pointerleave", function () {
      phone.style.transform = "";
    });
  }

  /* ---------- download feedback ---------- */
  var downloads = Array.prototype.slice.call(document.querySelectorAll('a[download]'));
  downloads.forEach(function (link) {
    link.addEventListener("click", function () {
      link.classList.add("is-downloading");
      window.setTimeout(function () { link.classList.remove("is-downloading"); }, 1400);
    });
  });
})();
