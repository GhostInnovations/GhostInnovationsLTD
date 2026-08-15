"use strict";

<<<<<<< Updated upstream
window.addEventListener("load", function () {
  var loader = document.querySelector(".loader");
  if (loader) {
    setTimeout(function () {
      loader.classList.add("hide");
    }, 1800);
  }
=======

/* ===============================
   THEME
================================ */


const themeToggle =
document.querySelector(".theme-toggle");


const logoImage =
document.querySelector(".logo-img");


const storedTheme =
localStorage.getItem("theme");


const prefersDark =
window.matchMedia(
    "(prefers-color-scheme: dark)"
).matches;



/* ===============================
   UPDATE LOGO
================================ */


const updateLogo = (theme) => {

    if(!logoImage)
        return;


    const lightSrc =
    logoImage.dataset.light;


    if(
        theme === "light" &&
        lightSrc
    ){

        logoImage.src =
        lightSrc;

    }

    else {

        logoImage.src =
        "Images/ghost-title.png";

    }

};




/* ===============================
   APPLY THEME
================================ */


const applyTheme = (theme) => {

    const isLight =
    theme === "light";


    document.body.classList.toggle(
        "light-mode",
        isLight
    );


    document.body.classList.toggle(
        "dark-mode",
        !isLight
    );


    if(themeToggle){

        themeToggle.setAttribute(
            "aria-label",
            isLight
                ? "Switch to dark mode"
                : "Switch to light mode"
        );

    }


    updateLogo(theme);

};




/* ===============================
   INITIAL THEME
================================ */


const currentTheme =
storedTheme ||
(
    prefersDark
        ? "dark"
        : "light"
);


applyTheme(currentTheme);




/* ===============================
   THEME TOGGLE
================================ */


if(themeToggle){

    themeToggle.addEventListener(
        "click",
        () => {


            const nextTheme =
            document.body.classList.contains(
                "light-mode"
            )
                ? "dark"
                : "light";


            applyTheme(nextTheme);


            localStorage.setItem(
                "theme",
                nextTheme
            );


        }
    );

}









/* ===============================
   LOADER
================================ */


window.addEventListener("load", () => {

    const loader =
    document.querySelector(".loader");


    if(loader){

        setTimeout(() => {

            loader.classList.add("hide");

        }, 1800);

    }

>>>>>>> Stashed changes
});

var menuButton = document.querySelector(".nav-toggle");
var navbar = document.querySelector(".navbar");

if (menuButton && navbar) {
  menuButton.addEventListener("click", function () {
    var open = navbar.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(open));
  });

<<<<<<< Updated upstream
  Array.prototype.forEach.call(navbar.querySelectorAll("a"), function (link) {
    link.addEventListener("click", function () {
      navbar.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
=======






/* ===============================
   MOBILE MENU
================================ */


const menuButton =
document.querySelector(".nav-toggle");


const navbar =
document.querySelector(".navbar");



if(menuButton && navbar){

    const toggleMenu = () => {

        const open =
        navbar.classList.toggle(
            "is-open"
        );


        menuButton.setAttribute(
            "aria-expanded",
            String(open)
        );

    };


    menuButton.addEventListener(
        "click",
        toggleMenu
    );


    navbar
    .querySelectorAll("a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                navbar.classList.remove(
                    "is-open"
                );


                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }
        );

>>>>>>> Stashed changes
    });
  });

<<<<<<< Updated upstream
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
=======

    document.addEventListener(
        "keydown",
        event => {

            if(event.key === "Escape"){

                navbar.classList.remove(
                    "is-open"
                );


                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );

}









/* ===============================
   SCROLL REVEAL
================================ */


const revealItems =
document.querySelectorAll(
    ".reveal"
);



if(
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches
){

    revealItems.forEach(
        item =>
        item.classList.add("show")
    );

}

else {

    const observer =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if(entry.isIntersecting){

                    entry.target.classList.add(
                        "show"
                    );


                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: .15
        }

    );


    revealItems.forEach(
        item =>
        observer.observe(item)
    );

}









/* ===============================
   FAST COUNTERS
================================ */


const counters =
document.querySelectorAll(
    "[data-number]"
);



const counterObserver =
new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if(entry.isIntersecting){

                const counter =
                entry.target;


                const target =
                Number(
                    counter.dataset.number
                );


                let start = 0;


                const duration =
                800;


                const startTime =
                performance.now();


                function update(time){

                    const progress =
                    Math.min(
                        (time - startTime)
                        /
                        duration,
                        1
                    );


                    counter.textContent =
                    Math.floor(
                        progress * target
                    );


                    if(progress < 1){

                        requestAnimationFrame(
                            update
                        );

                    }

                    else {

                        counter.textContent =
                        target;

                    }

                }


                requestAnimationFrame(
                    update
                );


                counterObserver.unobserve(
                    counter
                );

            }

        });

    },

    {
        threshold: .7
    }

);
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
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
=======
counters.forEach(
    counter =>
    counterObserver.observe(counter)
);









/* ===============================
   SMOOTH SCROLL
================================ */


document
.querySelectorAll(
    'a[href^="#"]'
)
.forEach(anchor => {

    anchor.addEventListener(
        "click",
        event => {

            const target =
            document.querySelector(
                anchor.getAttribute("href")
            );


            if(target){

                event.preventDefault();


                target.scrollIntoView({

                    behavior:
                    "smooth",

                    block:
                    "start"

                });

            }

        }
    );

});









/* ===============================
   ACTIVE NAVIGATION
================================ */


const sections =
document.querySelectorAll(
    "section[id]"
);



const links =
document.querySelectorAll(
    ".navbar a"
);



const sectionObserver =
new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if(entry.isIntersecting){

                links.forEach(link => {

                    link.classList.remove(
                        "active"
                    );


                    if(
                        link.hash ===
                        "#" + entry.target.id
                    ){

                        link.classList.add(
                            "active"
                        );

                    }

                });

            }

        });

    },

    {
        threshold: .5
    }

);



sections.forEach(
    section =>
    sectionObserver.observe(section)
);









/* ===============================
   LEAFLET MAP
================================ */


const mapElement =
document.querySelector(
    "#map"
);



function loadMap(){

    if(
        !mapElement ||
        !window.L
    )

    return;


    const office =
    [
        54.5820213,
        -1.1771227
    ];


    const map =
    L.map(
        mapElement,
        {
            scrollWheelZoom: false,
            zoomControl: true
        }
    )
    .setView(
        office,
        16
    );


    L.tileLayer(

        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

        {

            maxZoom: 19,

            attribution:
            "&copy; OpenStreetMap contributors"

        }

    )
    .addTo(map);


    L.marker(
        office
    )
    .addTo(map)
    .bindPopup(

        `
        <b>
        Ghost Innovations LTD
        </b>
        <br>
        Units 3 & 4 North Street
        <br>
        Middlesbrough TS6 6AN
        `

    )
    .openPopup();

}




if(mapElement){

    const mapObserver =
    new IntersectionObserver(

        entries => {

            if(entries[0].isIntersecting){

                loadMap();

                mapObserver.disconnect();

            }

        }

    );


    mapObserver.observe(
        mapElement
    );

}









/* ===============================
   SAFARI FIXES
================================ */


document.addEventListener(
    "touchstart",
    () => {},
    {
        passive: true
    }
);
>>>>>>> Stashed changes
