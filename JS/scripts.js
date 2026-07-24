const menuToggle = document.querySelector(".nav-toggle");
const navbar = document.querySelector(".navbar");

if (menuToggle && navbar) {
    const setMenuState = (isOpen) => {
        navbar.classList.toggle("is-open", isOpen);
        document.body.classList.toggle("menu-open", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    };

    menuToggle.addEventListener("click", () => {
        setMenuState(!navbar.classList.contains("is-open"));
    });

    navbar.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const target = document.querySelector(link.hash);
            if (!target) return;
            event.preventDefault();
            setMenuState(false);
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") setMenuState(false);
    });

    window.matchMedia("(min-width: 769px)").addEventListener("change", (event) => {
        if (event.matches) setMenuState(false);
    });
}

const revealItems = document.querySelectorAll(".hidden");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => revealObserver.observe(item));
} else {
    revealItems.forEach((item) => item.classList.add("show"));
}

const mapElement = document.querySelector("#map");

if (mapElement && window.L) {
    const office = [54.5820213, -1.1771227];
    const map = L.map(mapElement, { scrollWheelZoom: false }).setView(office, 16);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker(office)
        .addTo(map)
        .bindPopup("<b>Units 3, &amp; 4</b><br>North St<br>Middlesbrough TS6 6AN")
        .openPopup();
}
