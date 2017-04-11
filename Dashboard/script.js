// initialize the map
var map = L.map('map').setView([40.730610,-73.935242], 12);

// load a tile layer
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',
{
  // attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 17,
    minZoom: 9
}).addTo(map);

