"use strict";

/* ===============================
STARTUP LOADER
================================ */

window.addEventListener("load", () => {


const loader =
document.querySelector(".loader");


if(loader){

    setTimeout(() => {

        loader.classList.add("hide");

    }, 2200);

}


});

/* ===============================
MOBILE NAVIGATION
================================ */

const menuButton =
document.querySelector(".nav-toggle");

const navigation =
document.querySelector(".navbar");

if(menuButton && navigation){


function toggleMenu(state){


    const open =
    state ?? 
    !navigation.classList.contains("is-open");


    navigation.classList.toggle(
        "is-open",
        open
    );


    menuButton.setAttribute(
        "aria-expanded",
        open
    );


}




menuButton.addEventListener(
    "click",
    () => toggleMenu()
);





navigation
.querySelectorAll("a")
.forEach(link => {


    link.addEventListener(
        "click",
        () => toggleMenu(false)
    );


});





document.addEventListener(
    "keydown",
    event => {


        if(event.key === "Escape"){

            toggleMenu(false);

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

const revealObserver =
new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{


if(entry.isIntersecting){


    entry.target.classList.add(
        "show"
    );


    revealObserver.unobserve(
        entry.target
    );


}


});

},

{

threshold:.15

}

);

revealItems.forEach(
item =>
revealObserver.observe(item)
);

/* ===============================
ANIMATED NUMBERS
================================ */

const counters =
document.querySelectorAll(
"[data-number]"
);

const counterObserver =
new IntersectionObserver(

entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){


const element =
entry.target;


const target =
Number(
    element.dataset.number
);



let current = 0;



const speed =
Math.max(
    2,
    1500 / target
);



const timer =
setInterval(()=>{


    current++;


    element.textContent =
    current;



    if(current >= target){

        clearInterval(timer);

    }


},speed);



counterObserver.unobserve(
    element
);


}

});

},

{

threshold:.7

}

);

counters.forEach(
counter =>
counterObserver.observe(counter)
);

/* ===============================
ACTIVE NAVIGATION
================================ */

const sections =
document.querySelectorAll(
"section[id]"
);

const navLinks =
document.querySelectorAll(
".navbar a"
);

const sectionObserver =
new IntersectionObserver(

entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){


navLinks.forEach(link=>{


    link.classList.remove(
        "active"
    );



    if(
    link.getAttribute("href")
    ===
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

threshold:.45

}

);

sections.forEach(
section =>
sectionObserver.observe(section)
);


/* ===============================
CUSTOM CURSOR EFFECT
================================ */

const cursor =
document.createElement(
"div"
);

cursor.className =
"cursor-glow";

document.body.appendChild(
cursor
);

document.addEventListener(
"mousemove",
event=>{

cursor.style.left =
event.clientX + "px";

cursor.style.top =
event.clientY + "px";

}

);

/* ===============================
MAP LOADING
================================ */

const map =
document.querySelector(
"#map"
);

function createMap(){

if(
!map ||
!window.L
)
return;

const office =
[
54.5820213,
-1.1771227
];

const leaflet =
L.map(
map,
{
scrollWheelZoom:false
}
)
.setView(
office,
16
);

L.tileLayer(

"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

{

maxZoom:19,

attribution:
"© OpenStreetMap"

}

)

.addTo(
leaflet
);

L.marker(
office
)

.addTo(
leaflet
)

.bindPopup(

`<strong>
Ghost Innovations LTD </strong> <br>
Units 3 & 4 <br>
North Street <br>
Middlesbrough TS6 6AN`

)

.openPopup();

}

if(map){

const mapObserver =
new IntersectionObserver(

entries=>{

if(entries[0].isIntersecting){

createMap();

mapObserver.disconnect();

}

}

);

mapObserver.observe(map);

}

/* ===============================
PAGE SMOOTH SCROLL
================================ */

document
.querySelectorAll(
'a[href^="#"]'
)
.forEach(anchor=>{

anchor.addEventListener(
"click",
event=>{

const target =
document.querySelector(
anchor.getAttribute("href")
);

if(target){

event.preventDefault();

target.scrollIntoView({

behavior:"smooth"

});

}

}

);

});
