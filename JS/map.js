const map = L.map('map').setView([54.5820213, -1.1771227], 16);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const marker = L.marker([54.5820213, -1.1771227]).addTo(map);

marker.bindPopup("<b>Units 3, & 4</b><br>North St<br>Middlesbrough TS6 6AN").openPopup();