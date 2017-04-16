//Create account on Mapbox for access token or email for accessToken
accessToken = 'pk.eyJ1IjoiamRhcmxpbjAwMCIsImEiOiJjajEzeDhtMXUwMXozMzhsamhwMTVjM3d0In0.89axfVJUo6TZlva9kRyvbA';

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


function style(feature) {
    return {
	fill: false,
        weight: 2,
        opacity: 1,
        color: 'gray',
        dashArray: '3'
    };
}

var treepoints = [];

L.geoJson(zips, {style: style}).addTo(map);
d3.csv("/Volumes/USB20FD/Spring2017/Visualization/Project/Project_Data/2015_Street_Tree_Census_-_Tree_Data.csv", function(data){
	treepoints = data.map(function(d) {
		return [d.latitude, d.longitude];
	});	
})
