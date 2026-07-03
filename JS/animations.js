const elements = document.querySelectorAll(".animate-on-scroll");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add("in-view");
            }, index * 200);
        }
    });
}, { threshold: 0.15 });

elements.forEach(el => observer.observe(el));