"use strict";

window.addEventListener("load", function () {
  var loader = document.querySelector(".loader");
  if (loader) {
    setTimeout(function () {
      loader.classList.add("hide");
    }, 1800);
  }
});

var menuButton = document.querySelector(".nav-toggle");
var navbar = document.querySelector(".navbar");

if (menuButton && navbar) {
  menuButton.addEventListener("click", function () {
    var open = navbar.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(open));
  });

  Array.prototype.forEach.call(navbar.querySelectorAll("a"), function (link) {
    link.addEventListener("click", function () {
      navbar.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" || event.keyCode === 27) {
      navbar.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}

var revealItems = document.querySelectorAll(".reveal");
var hasIntersectionObserver = "IntersectionObserver" in window;
var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!hasIntersectionObserver || reduceMotion) {
  Array.prototype.forEach.call(revealItems, function (item) {
    item.classList.add("show");
  });
} else {
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  Array.prototype.forEach.call(revealItems, function (item) {
    revealObserver.observe(item);
  });
}

var counters = document.querySelectorAll("[data-number]");

function setCounterFinal(counter) {
  counter.textContent = Number(counter.getAttribute("data-number"));
}

function animateCounter(counter) {
  var target = Number(counter.getAttribute("data-number"));
  var duration = 800;
  var startTime = window.performance && performance.now ? performance.now() : Date.now();

  function update(time) {
    var now = typeof time === "number" ? time : Date.now();
    var progress = Math.min((now - startTime) / duration, 1);
    counter.textContent = Math.floor(progress * target);

    if (progress < 1) {
      window.requestAnimationFrame(update);
    } else {
      counter.textContent = target;
    }
  }

  window.requestAnimationFrame(update);
}

if (hasIntersectionObserver) {
  var counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.7 });

  Array.prototype.forEach.call(counters, function (counter) {
    counterObserver.observe(counter);
  });
} else {
  Array.prototype.forEach.call(counters, setCounterFinal);
}

Array.prototype.forEach.call(document.querySelectorAll('a[href^="#"]'), function (anchor) {
  anchor.addEventListener("click", function (event) {
    var href = anchor.getAttribute("href");
    var target = href ? document.querySelector(href) : null;

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

var sections = document.querySelectorAll("section[id]");
var links = document.querySelectorAll(".navbar a");

if (hasIntersectionObserver) {
  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        Array.prototype.forEach.call(links, function (link) {
          link.classList.remove("active");
          if (link.hash === "#" + entry.target.id) {
            link.classList.add("active");
          }
        });
      }
    });
  }, { threshold: 0.5 });

  Array.prototype.forEach.call(sections, function (section) {
    sectionObserver.observe(section);
  });
}

var mapElement = document.querySelector("#map");
var mapLoaded = false;

function loadMap() {
  if (mapLoaded || !mapElement || !window.L) {
    return;
  }

  mapLoaded = true;
  var office = [54.5820213, -1.1771227];
  var map = L.map(mapElement, {
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
    var mapObserver = new IntersectionObserver(function (entries) {
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
  document.addEventListener("touchstart", function () {}, { passive: true });
} catch (error) {
  document.addEventListener("touchstart", function () {}, false);
}
