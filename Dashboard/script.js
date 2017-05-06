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
communityLayer = L.geoJson(community_districts)

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


function clearMap(){
	layers = [heat, markerCluster, zipLayer, communityLayer];
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
}

function pm25c(){
/* Read Air Quality Measures Data */
/* Arrays for Air Quality Measures */
pm25 = []
d3.csv("/Volumes/USB20FD/Spring2017/Visualization/Project/Project_Data/Fine Particulate Matter (PM2.5).csv", function(data){
	pm25 = data.map(function(p){
			return [p.Year,p.Geography_id, p.Mean];
		}); 

	function getColor(d){
		var color;
		for(var i = 0; i < pm25.length; i++){
			if((Number(d) == Number(pm25[i][1])) && (pm25[i][0] == 'Annual Average 2014')){
				if(Number(pm25[i][2]) > 14){
					color = '#800026';
				} else if(Number(pm25[i][2]) > 11){
					color = '#BD0026';
				} else if(Number(pm25[i][2]) > 10){
					color = '#E31A1C';
				} else if(Number(pm25[i][2]) > 9.5){
					color = '#FC4E2A';
				} else if(Number(pm25[i][2]) > 9){
                                        color = '#FD8D3C';
				}  else if(Number(pm25[i][2]) > 8.7){
                                        color = '#FEB24C';
				} else if(Number(pm25[i][2]) > 8){
                                        color = '#FED976';
                                } else{
					color = '#FFEDA0';
				}
			}
		}
		return color;
	};

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
	communityLayer = L.geoJson(community_districts, {style: cStyle}).addTo(map);
	});	
};
