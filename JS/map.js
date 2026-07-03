// Initialize the map to be at the office building
const map = L.map('map').setView([54.57932, -1.23138], 16);

// Use OpenStreetMap's official tile server - requires no API key
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Add a marker at office building
const marker = L.marker([54.57932, -1.23138]).addTo(map);

// Add a popup with the location name
marker.bindPopup("<b>Boho 5</b><br>Bridge Street East<br>Middlesbrough, TS2 1NY").openPopup();