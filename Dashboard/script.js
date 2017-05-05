//Create account on Mapbox for access token or email for accessToken
accessToken = 'pk.eyJ1IjoiamRhcmxpbjAwMCIsImEiOiJjajEzeDhtMXUwMXozMzhsamhwMTVjM3d0In0.89axfVJUo6TZlva9kRyvbA';

// initialize the map
var map = L.map('map').setView([40.730610,-73.935242], 11);

// load a tile layer
L.tileLayer('https://api.mapbox.com/styles/v1/jdarlin000/cj1e62kle002d2rtc41j3rkbs/tiles/256/{z}/{x}/{y}?access_token=' + accessToken,
{
  // attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    accessToken: accessToken,
    maxZoom: 18,
    minZoom: 8
}).addTo(map);


// Define the layers 
var heat;
var asthmaDischarges = [];
var treepoints = [];

//  Load the the tree data
d3.csv("/Volumes/USB20FD/Spring2017/Visualization/Project/Project_Data/2015_Street_Tree_Census_-_Tree_Data.csv", function(data){
	treepoints = data.map(function(d) {
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


// Load the asthma data markers
markers = [];
var markerCluster = L.markerClusterGroup.layerSupport({
			iconCreateFunction: function (cluster) {
 				var marks = cluster.getChildCount();
 				if(marks < 100){
 					var html = '<div class="circle1">' + marks + '</div>';
                                         return L.divIcon({ html: html, className: 'mycluster', iconSize: L.point(30, 30) });
 				} else if ((marks >= 100) && (marks < 400)){
 					var html = '<div class="circle2">' + marks + '</div>';
                                         return L.divIcon({ html: html, className: 'mycluster', iconSize: L.point(32, 32) });
 				} else if ((marks >= 400) && (marks < 800)){
 					var html = '<div class="circle3">' + marks + '</div>';
                                         return L.divIcon({ html: html, className: 'mycluster', iconSize: L.point(35, 35) });
 				} else {
 					var html = '<div class="circle4">' + marks + '</div>';
                                         return L.divIcon({ html: html, className: 'mycluster', iconSize: L.point(40, 40) });
 				}
     			}, 
			animate: true,
			showCoverageOnHover: false
	
		});
zipLayer = L.geoJson(zips)

d3.csv("/Volumes/USB20FD/Spring2017/Visualization/Project/Project_Data/asthma_discharges_12_14.csv", function(data){
	var counts = data.map(function(d){
		return [d.Discharges];
	});
	
	var coord = data.map(function (d){
		return [d.Lat, d.Lng];
	});

	for(var i = 0, j=0; i <counts.length; i++, j++){
		for (var k = 0; k < Number(counts[i]); k++){
			markers.push(coord[j]);
		}
	}
	
	for( var m = 0; m < markers.length; m++){	
		var mark = new L.marker(markers[m]);
		markerCluster.addLayer(mark);
	}
})

function getColor(d) {
	return d > 600 ? '#800026' :
	       d > 500  ? '#BD0026' :
	       d > 400  ? '#E31A1C' :
	       d > 300  ? '#FC4E2A' :
	       d > 200  ? '#FD8D3C' :
	       d > 100   ? '#FEB24C' :
	                  '#FFEDA0';
}

function cStyle(feature){
	return {
		fillColor: getColor(feature.properties.BoroCD),
	        weight: 2,
	        opacity: 1,
		color: 'white',
	        dashArray: '3',
	        fillOpacity: 0.7
	};
}

L.geoJson(community_districts, {style: cStyle}).addTo(map);


function clearMap(){
	layers = [heat, markerCluster, zipLayer];
	for(var i = 0; i < layers.length; i++){
		map.removeLayer(layers[i]);
	}
};
	
function treePoints() {
	clearMap();
	function style(feature) {
    		return {
			fill: false,
        		weight: 2,
        		opacity: 1,
        		color: 'gray',
 	       		dashArray: '3'
    		};
	}

	/* Add zip geojson to map */
	zipLayer = L.geoJson(zips, {style: style}).addTo(map);
	map.addLayer(heat);
};

function aqPoints(){
	clearMap();
	if (map.hasLayer(heat) == true){
		map.removeLayer(heat);
	}
};


// Load the asthma data
function aqPoints1(){
	function style(feature) {
    		return {
			fill: false,
        		weight: 2,
        		opacity: 1,
        		color: 'gray',
 	       		dashArray: '3'
    		};
	}

	/* Add zip geojson to map */
	zipLayer = L.geoJson(zips, {style: style}).addTo(map);

	/* Add cluster Layer */
	markerCluster.addTo(map);
};
