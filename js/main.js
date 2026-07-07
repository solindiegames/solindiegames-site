(function () {
  const root = document.documentElement;
  const themeToggle = document.querySelector(".theme-toggle");
  const themeIconSun = document.querySelector(".theme-icon-sun");
  const themeIconMoon = document.querySelector(".theme-icon-moon");

  function getTheme() {
    return localStorage.getItem("theme") === "light" ? "light" : "dark";
  }

  function applyTheme(theme) {
    if (theme === "light") {
      root.setAttribute("data-theme", "light");
    } else {
      root.removeAttribute("data-theme");
    }

    if (themeToggle) {
      const isLight = theme === "light";
      const label = isLight ? "Switch to dark theme" : "Switch to light theme";
      themeToggle.setAttribute("aria-label", label);
      themeToggle.setAttribute("title", label);
    }

    if (themeIconSun && themeIconMoon) {
      const isLight = theme === "light";
      themeIconSun.hidden = isLight;
      themeIconMoon.hidden = !isLight;
    }
  }

  applyTheme(getTheme());

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const nextTheme = getTheme() === "light" ? "dark" : "light";
      localStorage.setItem("theme", nextTheme);
      applyTheme(nextTheme);
    });
  }

  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("is-open");
    });

    nav.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      });
    });
  }

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.querySelector(".lightbox-image");
  const lightboxClose = document.querySelector(".lightbox-close");
  const lightboxBackdrop = document.querySelector(".lightbox-backdrop");
  const galleryItems = document.querySelectorAll(".gallery-item[data-lightbox]");

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    document.body.style.overflow = "";
    if (lightboxImage) {
      lightboxImage.src = "";
      lightboxImage.alt = "";
    }
  }

  function openLightbox(src, alt) {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = src;
    lightboxImage.alt = alt;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    lightboxClose.focus();
  }

  galleryItems.forEach(function (item) {
    item.addEventListener("click", function () {
      const img = item.querySelector("img");
      openLightbox(item.dataset.lightbox, img ? img.alt : "");
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  if (lightboxBackdrop) {
    lightboxBackdrop.addEventListener("click", closeLightbox);
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && lightbox && !lightbox.hidden) {
      closeLightbox();
    }
  });
})();
