"use strict";

const themeToggle = document.querySelector(".theme-toggle");
const logoImage = document.querySelector(".logo-img");
const storedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

const updateLogo = (theme) => {
  if (!logoImage) return;

  const lightSrc = logoImage.dataset.light;
  logoImage.src = theme === "light" && lightSrc ? lightSrc : "Images/ghost-title.png";
};

const applyTheme = (theme) => {
  const isLight = theme === "light";

  document.body.classList.toggle("light-mode", isLight);
  document.body.classList.toggle("dark-mode", !isLight);

  if (themeToggle) {
    themeToggle.setAttribute(
      "aria-label",
      isLight ? "Switch to dark mode" : "Switch to light mode"
    );
  }

  updateLogo(theme);
};

const currentTheme = storedTheme || (prefersDark ? "dark" : "light");
applyTheme(currentTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("light-mode") ? "dark" : "light";
    applyTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
  });
}

window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");

  if (loader) {
    setTimeout(() => {
      loader.classList.add("hide");
    }, 1800);
  }
});

const menuButton = document.querySelector(".nav-toggle");
const navbar = document.querySelector(".navbar");

if (menuButton && navbar) {
  const toggleMenu = () => {
    const open = navbar.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(open));
  };

  menuButton.addEventListener("click", toggleMenu);

  navbar.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navbar.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" || event.keyCode === 27) {
      navbar.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}

const revealItems = document.querySelectorAll(".reveal");
const hasIntersectionObserver = "IntersectionObserver" in window;
const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!hasIntersectionObserver || reduceMotion) {
  revealItems.forEach((item) => item.classList.add("show"));
} else {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealItems.forEach((item) => revealObserver.observe(item));
}

const counters = document.querySelectorAll("[data-number]");

if (hasIntersectionObserver) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = Number(counter.getAttribute("data-number"));
        const duration = 800;
        const startTime = performance.now();

        const update = (time) => {
          const progress = Math.min((time - startTime) / duration, 1);
          counter.textContent = Math.floor(progress * target);

          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            counter.textContent = target;
          }
        };

        requestAnimationFrame(update);
        counterObserver.unobserve(counter);
      }
    });
  }, { threshold: 0.7 });

  counters.forEach((counter) => counterObserver.observe(counter));
} else {
  counters.forEach((counter) => {
    counter.textContent = Number(counter.getAttribute("data-number"));
  });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const href = anchor.getAttribute("href");
    const target = href ? document.querySelector(href) : null;

    if (target) {
      event.preventDefault();

      if ("scrollBehavior" in document.documentElement.style) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        target.scrollIntoView(true);
      }
    }
  });
});

const sections = document.querySelectorAll("section[id]");
const links = document.querySelectorAll(".navbar a");

if (hasIntersectionObserver) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((link) => {
          link.classList.remove("active");
          if (link.hash === "#" + entry.target.id) {
            link.classList.add("active");
          }
        });
      }
    });
  }, { threshold: 0.5 });

  sections.forEach((section) => sectionObserver.observe(section));
}

const mapElement = document.querySelector("#map");
let mapLoaded = false;

function loadMap() {
  if (mapLoaded || !mapElement || !window.L) {
    return;
  }

  mapLoaded = true;

  const office = [54.5820213, -1.1771227];
  const map = L.map(mapElement, {
    scrollWheelZoom: false,
    zoomControl: true
  }).setView(office, 16);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);

  L.marker(office)
    .addTo(map)
    .bindPopup("<b>Ghost Innovations LTD</b><br>Units 3 &amp; 4 North Street<br>Middlesbrough TS6 6AN")
    .openPopup();
}

if (mapElement) {
  if (hasIntersectionObserver) {
    const mapObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMap();
        mapObserver.disconnect();
      }
    });

    mapObserver.observe(mapElement);
  } else {
    window.addEventListener("load", loadMap);
  }
}

try {
  document.addEventListener("touchstart", () => {}, { passive: true });
} catch (error) {
  document.addEventListener("touchstart", () => {}, false);
}
