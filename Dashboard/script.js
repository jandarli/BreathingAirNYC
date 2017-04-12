//Create account on Mapbox for access token or email for accessToken
accessToken = ''

// initialize the map
 var map = L.map('map').setView([40.730610,-73.935242], 12);

// load a tile layer
L.tileLayer('https://api.mapbox.com/styles/v1/jdarlin000/cj1e62kle002d2rtc41j3rkbs/tiles/256/{z}/{x}/{y}?access_token=' + accessToken,
{
  // attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    accessToken: accessToken,
    maxZoom: 17,
    minZoom: 9
}).addTo(map);

