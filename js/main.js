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
  const lightboxDialog = document.querySelector(".lightbox-dialog");
  const lightboxImage = document.querySelector(".lightbox-image");
  const lightboxClose = document.querySelector(".lightbox-close");
  const lightboxPrev = document.querySelector(".lightbox-prev");
  const lightboxNext = document.querySelector(".lightbox-next");
  const lightboxBackdrop = document.querySelector(".lightbox-backdrop");
  const galleryItems = document.querySelectorAll(".gallery-item[data-lightbox]");

  const gallerySlides = Array.from(galleryItems).map(function (item) {
    const img = item.querySelector("img");
    return {
      src: item.dataset.lightbox,
      alt: img ? img.alt : "",
    };
  });

  let currentSlideIndex = 0;

  function updateLightboxLabels() {
    if (!lightboxDialog || !gallerySlides.length) return;

    const position = currentSlideIndex + 1;
    const total = gallerySlides.length;
    lightboxDialog.setAttribute("aria-label", "Image " + position + " of " + total);

    if (lightboxPrev) {
      const prevPosition = position === 1 ? total : position - 1;
      lightboxPrev.setAttribute("aria-label", "Previous image (" + prevPosition + " of " + total + ")");
      lightboxPrev.hidden = total <= 1;
    }

    if (lightboxNext) {
      const nextPosition = position === total ? 1 : position + 1;
      lightboxNext.setAttribute("aria-label", "Next image (" + nextPosition + " of " + total + ")");
      lightboxNext.hidden = total <= 1;
    }
  }

  function showSlide(index) {
    if (!gallerySlides.length || !lightboxImage) return;

    currentSlideIndex = (index + gallerySlides.length) % gallerySlides.length;
    const slide = gallerySlides[currentSlideIndex];
    lightboxImage.src = slide.src;
    lightboxImage.alt = slide.alt;
    updateLightboxLabels();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    document.body.style.overflow = "";
    if (lightboxImage) {
      lightboxImage.src = "";
      lightboxImage.alt = "";
    }
  }

  function openLightbox(src) {
    if (!lightbox || !lightboxImage) return;

    const index = gallerySlides.findIndex(function (slide) {
      return slide.src === src;
    });

    showSlide(index >= 0 ? index : 0);
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    if (lightboxClose) {
      lightboxClose.focus();
    }
  }

  galleryItems.forEach(function (item) {
    item.addEventListener("click", function () {
      openLightbox(item.dataset.lightbox);
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener("click", function (event) {
      event.stopPropagation();
      showSlide(currentSlideIndex - 1);
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener("click", function (event) {
      event.stopPropagation();
      showSlide(currentSlideIndex + 1);
    });
  }

  if (lightboxBackdrop) {
    lightboxBackdrop.addEventListener("click", closeLightbox);
  }

  document.addEventListener("keydown", function (event) {
    if (!lightbox || lightbox.hidden) return;

    if (event.key === "Escape") {
      closeLightbox();
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showSlide(currentSlideIndex - 1);
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showSlide(currentSlideIndex + 1);
    }
  });
})();
