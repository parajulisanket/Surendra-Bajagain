/* ==========================================================================
   Surendra Bajagain — site behaviour (vanilla JS, no dependencies)
   ========================================================================== */
(function () {
  "use strict";

  var doc = document.documentElement;
  doc.classList.remove("no-js");

  /* --- Folder routing fallback ----------------------------------------
     Pages live in folders (about/index.html) and are linked as "about/".
     A web server resolves that automatically; when the files are opened
     straight from disk (file://) we append index.html so links still work. */
  if (location.protocol === "file:") {
    document.querySelectorAll("a[href]").forEach(function (a) {
      var href = a.getAttribute("href");
      if (/^(https?:|mailto:|tel:|#)/.test(href)) return;
      var parts = href.split("#");
      if (/\/$/.test(parts[0])) {
        a.setAttribute(
          "href",
          parts[0] + "index.html" + (parts[1] ? "#" + parts[1] : ""),
        );
      }
    });
  }

  /* --- Header: shadow on scroll + mobile nav --------------------------- */
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var onScroll = function () {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (toggle) {
    var closeNav = function () {
      doc.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    };
    toggle.addEventListener("click", function () {
      var open = doc.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    document.querySelectorAll(".nav a").forEach(function (a) {
      a.addEventListener("click", closeNav);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 880) closeNav();
    });
  }

  /* --- Reveal on scroll ------------------------------------------------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    reveals.forEach(function (el) {
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* --- Footer year ------------------------------------------------------ */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* --- Gallery lightbox ------------------------------------------------- */
  var items = Array.prototype.slice.call(
    document.querySelectorAll("[data-lightbox]"),
  );
  var box = document.querySelector(".lightbox");
  if (items.length && box) {
    var img = box.querySelector("img");
    var cap = box.querySelector("figcaption");
    var current = 0;
    var lastFocus = null;

    var show = function (i) {
      current = (i + items.length) % items.length;
      var it = items[current];
      img.src = it.getAttribute("data-full") || it.querySelector("img").src;
      img.alt = it.querySelector("img").alt;
      cap.textContent = it.getAttribute("data-caption") || "";
    };
    var open = function (i) {
      lastFocus = document.activeElement;
      show(i);
      box.classList.add("is-open");
      box.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      box.querySelector(".lightbox__close").focus();
    };
    var close = function () {
      box.classList.remove("is-open");
      box.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (lastFocus) lastFocus.focus();
    };

    items.forEach(function (it, i) {
      it.addEventListener("click", function () {
        open(i);
      });
    });
    box.querySelector(".lightbox__close").addEventListener("click", close);
    box.querySelector(".lightbox__prev").addEventListener("click", function () {
      show(current - 1);
    });
    box.querySelector(".lightbox__next").addEventListener("click", function () {
      show(current + 1);
    });
    box.addEventListener("click", function (e) {
      if (e.target === box) close();
    });
    document.addEventListener("keydown", function (e) {
      if (!box.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(current - 1);
      if (e.key === "ArrowRight") show(current + 1);
    });
  }

  /* --- Copy press bio --------------------------------------------------- */
  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var target = document.querySelector(btn.getAttribute("data-copy"));
      if (!target) return;
      var text = target.innerText.trim();
      var done = function () {
        var label = btn.textContent;
        btn.textContent = "Copied ✓";
        setTimeout(function () {
          btn.textContent = label;
        }, 1800);
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(done);
      } else {
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand("copy");
          done();
        } catch (err) {
          /* ignore */
        }
        document.body.removeChild(ta);
      }
    });
  });

  /* --- Contact form ----------------------------------------------------- */
  var form = document.querySelector("#contact-form");
  if (form) {
    var rules = {
      name: function (v) {
        return v.trim().length >= 2 || "Please enter your full name.";
      },
      email: function (v) {
        return (
          /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ||
          "Please enter a valid email address."
        );
      },
      topic: function (v) {
        return v !== "" || "Please choose a subject.";
      },
      message: function (v) {
        return (
          v.trim().length >= 15 ||
          "Please write a message of at least 15 characters."
        );
      },
    };

    var validate = function (field) {
      var rule = rules[field.name];
      if (!rule) return true;
      var res = rule(field.value);
      var wrap = field.closest(".field");
      var err = wrap.querySelector(".field__error");
      if (res === true) {
        wrap.classList.remove("has-error");
        field.removeAttribute("aria-invalid");
        return true;
      }
      wrap.classList.add("has-error");
      field.setAttribute("aria-invalid", "true");
      err.textContent = res;
      return false;
    };

    form.querySelectorAll("input, select, textarea").forEach(function (f) {
      f.addEventListener("blur", function () {
        validate(f);
      });
      f.addEventListener("input", function () {
        if (f.closest(".field").classList.contains("has-error")) validate(f);
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var fields = form.querySelectorAll("input, select, textarea");
      var ok = true,
        firstBad = null;
      fields.forEach(function (f) {
        if (!validate(f)) {
          ok = false;
          firstBad = firstBad || f;
        }
      });
      if (!ok) {
        firstBad.focus();
        return;
      }

      // No backend on a static site: hand off to the visitor's mail app.
      // To use a form service (Formspree, Netlify Forms, a PHP endpoint),
      // set the form's action and remove this handler.
      var to = form.getAttribute("data-to");
      var subject =
        "[" + form.topic.value + "] Message from " + form.name.value.trim();
      var body =
        form.message.value.trim() +
        "\n\n— " +
        form.name.value.trim() +
        "\n" +
        form.email.value.trim() +
        (form.org.value.trim() ? "\n" + form.org.value.trim() : "");
      window.location.href =
        "mailto:" +
        to +
        "?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);

      var status = form.querySelector(".form__status");
      status.classList.add("is-visible");
      form.reset();
    });
  }
})();

const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector("#site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";

    // Toggle ARIA state
    navToggle.setAttribute("aria-expanded", !isExpanded);

    // Toggle CSS display class
    siteNav.classList.toggle("is-open");
  });
}
