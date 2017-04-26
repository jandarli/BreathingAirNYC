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


// Define the layers 
var heat;
var asthmaDischarges;

L.geoJson(zips, {style: style}).addTo(map);

//  Load the the tree data
d3.csv("/Volumes/USB20FD/Spring2017/Visualization/Project/Project_Data/2015_Street_Tree_Census_-_Tree_Data.csv", function(data){
	var treepoints = data.map(function(d) {
		return [d.latitude, d.longitude];
	});	
	heat = L.heatLayer(treepoints, {
		radius: 10,
		blur: 18,
		gradient: {
		         0.2: '#f9d884',
     			 0.4: '#fd8d3c',
			 0.6: '#fd8d3c',
		    	 0.8: '#f03b20',
     			 1: '#e2022f'
   		 }		
	 });
});

function treePoints() {
	map.addLayer(heat);

};

function aqPoints1(){
	map.removeLayer(heat);
};

// Create the geocoder
var geocoder = new google.maps.Geocoder();


// Load the asthma data
function aqPoints(){
	d3.csv("/Volumes/USB20FD/Spring2017/Visualization/Project/Project_Data/asthma_discharges_12_14.csv", function(data){
		var asthmaD = data.map(function(d){
			return [d.zipcode];
		});
		geocoder.geocode( { 'address': String(asthmaD[0])}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
			    	var latitude = results[0].geometry.location.lat();
   			    	var longitude = results[0].geometry.location.lng();
				console.log(latitude, longitude)   			 
    			} 
		});
	});
	
};
