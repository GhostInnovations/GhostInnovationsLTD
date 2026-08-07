"use strict";
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
    navbar
        .querySelectorAll("a")
        .forEach(link => {
        link.addEventListener("click", () => {
            navbar.classList.remove("is-open");
            menuButton.setAttribute("aria-expanded", "false");
        });
    });
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            navbar.classList.remove("is-open");
        }
    });
}

const revealItems = document.querySelectorAll(".reveal");

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealItems.forEach(item => item.classList.add("show"));
} else {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: .15
    });
    revealItems.forEach(item => observer.observe(item));
}

const counters = document.querySelectorAll("[data-number]");
const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = Number(counter.dataset.number);
            let start = 0;
            const duration = 800;
            const startTime = performance.now();
            function update(time) {
                const progress = Math.min((time - startTime)
                    /
                        duration, 1);
                counter.textContent =
                    Math.floor(progress * target);
                if (progress < 1) {
                    requestAnimationFrame(update);
                }
                else {
                    counter.textContent =
                        target;
                }
            }
            requestAnimationFrame(update);
            counterObserver.unobserve(counter);
        }
    });
}, {
    threshold: .7
});
counters.forEach(counter => counterObserver.observe(counter));
document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {
    anchor.addEventListener("click", event => {
        const target = document.querySelector(anchor.getAttribute("href"));
        if (target) {
            event.preventDefault();
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});
const sections = document.querySelectorAll("section[id]");
const links = document.querySelectorAll(".navbar a");
const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            links.forEach(link => {
                link.classList.remove("active");
                if (link.hash ===
                    "#" + entry.target.id) {
                    link.classList.add("active");
                }
            });
        }
    });
}, {
    threshold: .5
});
sections.forEach(section => sectionObserver.observe(section));
const mapElement = document.querySelector("#map");

function loadMap() {
    if (!mapElement || !window.L)
        return;

    const office = [54.5820213,-1.1771227];
    const map = L.map(mapElement, {scrollWheelZoom: false, zoomControl: true}).setView(office, 16);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {maxZoom: 19,attribution: "&copy; OpenStreetMap contributors"}).addTo(map);

    L.marker(office).addTo(map).bindPopup(`<b>Ghost Innovations LTD</b><br>Units 3 & 4 North Street<br>Middlesbrough TS6 6AN`).openPopup();}

    if (mapElement) {
    const mapObserver = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            loadMap();
            mapObserver.disconnect();
        }
    });
    mapObserver.observe(mapElement);
}
document.addEventListener("touchstart", () => { }, {
    passive: true
});
