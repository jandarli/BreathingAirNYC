//Create account on Mapbox for access token or email for accessToken
accessToken = 'pk.eyJ1IjoiamRhcmxpbjAwMCIsImEiOiJjajEzeDhtMXUwMXozMzhsamhwMTVjM3d0In0.89axfVJUo6TZlva9kRyvbA';

// initialize the map
var map = L.map('map').setView([40.694523, -73.831677], 11);

// Initialize borocd dictionary  
var borodict = {101:"Financial District", 102:"Greenwich Village and Soho", 103:"Lower East Side and Chinatown", 104:"Clinton and Chelsea",
               105:"Midtown", 106:"Stuyvesant Town and Turtle Bay", 107:"Upper West Side", 108:"Upper East Side", 109:"Morningside Heights and Hamilton Heights",
               110:"Central Harlem", 111:"East Harlem", 112:"Washington Heights and Inwood", 201:"Mott Haven and Melrose", 202:"Hunts Point and Longwood", 
  	       203: "Morrisania and Crotona", 204:"Highbridge and Concourse", 205:"Fordham and University Heights", 206:"Belmont and East Tremont", 
               207:"Kingsbridge Heights and Bedford", 208:"Riverdale and Fieldston", 209:"Parkchester and Soundview", 210:"Throgs Neck and Co-op City",
  	       211: "Morris Park and Bronxdale", 212:"Williamsbridge and Baychester", 301:"Greenpoint and Williamsburg", 302:"Fort Greene and Brooklyn Height",
               303: "Bedford Stuyvesant", 304:"Bushwick", 305:"East New York and Starrett City", 306:"Park Slope and Carroll Gardens", 307:"Sunset Park", 
	       308:"Crown Heights and Prospect Heights", 309:"South Crown Heights and Lefferts Gardens", 310:"Bay Ridge and Dyker Height", 311:"Bensonhurst",
	       312:"Borough Park", 313:"Coney Island", 314:"Flatbush and Midwood", 315:"Sheepshead Bay", 316:"Brownsville", 317:"East Flatbush", 318:"Flatlands and Canarsie",
	       401:"Long Island City and Astoria", 402:"Woodside and Sunnyside", 403:"Jackson Heights", 404:"Elmhurst and Corona", 405:"Ridgewood and Maspeth",
   	       406:"Rego Park and Forest Hills", 407:"Flushing and Whitestone", 408:"Hillcrest and Fresh Meadows", 409:"Kew Gardens and Woodhaven",
	       410:"South Ozone Park and Howard Beach", 411:"Bayside and Little Neck", 412:"Jamaica and Hollis", 413:"Queens Village", 414:"Rockaway and Broad Channel", 
	       501:"St. George and Stapleton", 502:" South Beach and Willowbrook", 503: "Tottenville and Great Kills"};

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
var zipLayer = L.geoJson(zips)
var communityLayer = L.geoJson(community_districts)
var communityLayer1 = L.geoJson(community_districts)
var communityLayer2 = L.geoJson(community_districts)
var info = L.control();
var chart_area  = L.control({position: "topright"});
var legend, legend1, legend2

//  Load the the tree data
d3.csv("/Volumes/USB20FD/Spring2017/Visualization/Project/Project_Data/2015_Street_Tree_Census_-_Tree_Data.csv", function(data){
	treepoints = data.map(function(d) {
		return [d.latitude, d.longitude];
	});	
	
	heat = L.heatLayer(treepoints, {
		radius: 10,
		blur: 18,
		gradient: {
		         0.2: '#8b0000',
     			 0.4: '#ff5c5c',
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
	layers = [heat, markerCluster, zipLayer, communityLayer, communityLayer1, communityLayer2];
	for(var i = 0; i < layers.length; i++){
		if(map.hasLayer(layers[i]) == true){
			map.removeLayer(layers[i]);
		}
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
};


// Load the asthma data
function aqPoints1(){
	//clearMap();
	var checked = document.getElementById("B0").checked;
	if(checked == true){
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
	} else {
		if(map.hasLayer(markerCluster)){
			map.removeLayer(markerCluster);
			map.removeLayer(zipLayer);
		}
	}
}

function pm25c(){
	/* Read Air Quality Measures Data */
	/* Arrays for Air Quality Measures */
	//clearMap();
	var checked = document.getElementById("B2").checked;
        if(checked == true){
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
                	                	} else {
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
		
		info.onAdd = function (map) {
				 map.info = this;
   				 this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
   				 this.update();
   				 return this._div;
				};

		info.update = function (props) {
				if(props){
					for(var i = 0; i <pm25.length; i++){
						if(props.BoroCD == pm25[i][1]){
			   	 			this._div.innerHTML = '<h4> PM2.5 Measures </h4>' +  (props ?
      				  			'<b>' + borodict[Number(props.BoroCD)] + '</b><br />'+ 'Mean measure: ' + pm25[i][2] 
			        			: 'Hover over a community');
						}
					} 
				}
		};

		info.addTo(map);

		function highlightFeature(e) {
   			 var layer = e.target;
			 layer.setStyle({
       				 weight: 5,
      				 color: '#666',
       				 dashArray: '',
       				 fillOpacity: 0.7
   			 });

    			if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        			layer.bringToFront();
    			}
			info.update(layer.feature.properties);
		}

		function resetHighlight(e) {
                                communityLayer.resetStyle(e.target);
				info.update();
                        }
		
		function onEachFeature(feature, layer) {
    				layer.on({
					mouseover: highlightFeature,
        				mouseout: resetHighlight,
    				});
		}

		communityLayer = L.geoJson(community_districts, {style: cStyle, onEachFeature: onEachFeature}).addTo(map);
		
		legend = L.control({position: 'bottomright'});
		legend.onAdd = function (map) {
		map.legend = this;
		var div = L.DomUtil.create('div', 'info legend'),
		    grades = [7, 8, 8.7, 9, 9.5, 10, 11, 14, 15],
        	    palette = ['#FFEDA0', '#FED976', '#FEB24C', '#FD8D3C', '#FC4E2A', '#E31A1C', '#BD0026', '#800026'];
    		    for (var i = 0; i < grades.length; i++) {
       			 div.innerHTML +=
           				 '<i style="background:' + palette[i] + '"></i> ' +
            				 grades[i] + (grades[i+1] ? '&ndash;' + grades[i+1] + '<br>' : '+');
		    }
	
		    return div;
		};
		legend.onRemove = function(map){
			delete map.legend;
		}
		legend.addTo(map);
		
	})
	} else {
		if(map.hasLayer(communityLayer)){
			map.removeLayer(communityLayer)
		}
		if(map.legend){
			legend.removeFrom(map);
		}
		if(map.info){
			info.removeFrom(map);
		}
	}	
};

function blackCarbon(){
	var checked = document.getElementById("B1").checked;
        if(checked == true){	
		bc = []
		d3.csv("/Volumes/USB20FD/Spring2017/Visualization/Project/Project_Data/Black Carbon.csv", function(data){
			bc = data.map(function(p){
				return [p.Year,p.Geography_id, p.Mean];
			}); 
			function getColor(d){
				var color;
				for(var i = 0; i < bc.length; i++){
					if((Number(d) == Number(bc[i][1])) && (bc[i][0] == 'Annual Average 2014')){
						if(Number(bc[i][2]) >= 1.5){
							color = '#000066'; 
						} else if(Number(bc[i][2]) >= 1.4){
							color = '#000099'; 
						} else if(Number(bc[i][2]) >= 1.2){
							color = '#4169e1'; 
						} else if(Number(bc[i][2]) > 1.0){
							color = '#5276e3';
						} else if(Number(bc[i][2]) >= 0.8){
                        	                	color = '#0066FF';
						}  else if(Number(bc[i][2]) >= 0.7){
                                       			color = '#3399FF';
						} else if(Number(bc[i][2]) >= 0.6){
        	                               		color = '#b9c8f4';
                	                	} else{
							color = '#edf1fc';
						}
					}
				}
				return color;
			};

			function bStyle(feature){
				return {
					fillColor: getColor(feature.properties.BoroCD),
		       			weight: 2,
	        			opacity: 1,
					color: 'white',
		        		dashArray: '3',
	        			fillOpacity: 0.7
				};
			}
				
			info.onAdd = function (map) {
				 map.info = this;
   				 this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
   				 this.update();
   				 return this._div;
				};

			info.update = function (props) {
				if(props){
					for(var i = 0; i <bc.length; i++){
						if(props.BoroCD == bc[i][1]){
			   	 			this._div.innerHTML = '<h4> Black Carbon Measures </h4>' +  (props ?
      				  			'<b>' + borodict[Number(props.BoroCD)] + '</b><br />'+ 'Mean measure: ' + bc[i][2] 
			        			: 'Hover over a community');
						}
					} 
				}
			};

			info.addTo(map);
			function highlightFeature(e) {
   				 var layer1 = e.target;
				 layer1.setStyle({
       					 weight: 5,
	      				 color: '#666',
	       				 dashArray: '',
       					 fillOpacity: 0.7
   				 });

    				if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        				layer1.bringToFront();
    				}	
				info.update(layer1.feature.properties);
			}
		
			function resetHighlight(e) {
 				communityLayer1.resetStyle(e.target);
				info.update();
			}

			function onEachFeature(feature, layer) {
    				layer.on({
      				        mouseover: highlightFeature,
        				mouseout: resetHighlight,
    				});
			}

			communityLayer1 = L.geoJson(community_districts, {style: bStyle, onEachFeature: onEachFeature}).addTo(map);
			
			legend1 = L.control({position: 'bottomright'});
			legend1.onAdd = function (map) {
			    map.legend1 = this;
			    var div = L.DomUtil.create('div', 'info legend'),
			    grades = [0.5, 0.6, 0.7, 0.8, 1.0, 1.2, 1.4, 1.5, 1.6],
        		    palette = ['#edf1fc', '#b9c8f4', '#3399FF', '#0066FF', '#5276e3', '#4169e1', '#000099', '#000066'];
    			    for (var i = 0; i < grades.length; i++) {
       				 div.innerHTML +=
           				 '<i style="background:' + palette[i] + '"></i> ' +
            				 grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
		    	    }
			    return div;
			};
		
			legend1.onRemove = function(map){
				delete map.legend1;
			}
	
			legend1.addTo(map);
		})
	} else {
		if(map.hasLayer(communityLayer1)){
			map.removeLayer(communityLayer1)
		}

		if(map.legend1){
			legend1.removeFrom(map)
		}
		if(map.info){
			info.removeFrom(map);
		}
	}	
}

function no2(){
	var checked = document.getElementById("B3").checked;
        if(checked == true){	
		bc = []
		d3.csv("/Volumes/USB20FD/Spring2017/Visualization/Project/Project_Data/Nitrogen Dioxide (NO2).csv", function(data){
			bc = data.map(function(p){
				return [p.Year,p.Geography_id, p.Mean];
			}); 
			function getColor(d){
				var color;
				for(var i = 0; i < bc.length; i++){
					if((Number(d) == Number(bc[i][1])) && (bc[i][0] == 'Annual Average 2014')){
						if(Number(bc[i][2]) >= 37){
							color = '#003300'; 
						} else if(Number(bc[i][2]) >= 30){
							color = '#336600'; 
						} else if(Number(bc[i][2]) >= 27){
							color = '#339933'; 
						} else if(Number(bc[i][2]) > 23){
							color = '#00CC00';
						} else if(Number(bc[i][2]) >= 20){
                        	                	color = '#0cc977';
						}  else if(Number(bc[i][2]) >=15 ){
                                       			color = '#66FF66';
						} else if(Number(bc[i][2]) >= 10){
        	                               		color = '#a2c6a2';
                	                	} else{
							color = '#d0e2d0';
						}
					}
				}
				return color;
			};

			function bStyle(feature){
				return {
					fillColor: getColor(feature.properties.BoroCD),
		       			weight: 2,
	        			opacity: 1,
					color: 'white',
		        		dashArray: '3',
	        			fillOpacity: 0.7
				};
			}

			info.onAdd = function (map) {
                                 map.info = this;
                                 this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
                                 this.update();
                                 return this._div;
                                };

	                info.update = function (props) {
                                if(props){
                                        for(var i = 0; i <bc.length; i++){
                                                if(props.BoroCD == bc[i][1]){
                                                        this._div.innerHTML = '<h4> Nitrous Dioxide Measures </h4>' +  (props ?
                                                        '<b>' + borodict[Number(props.BoroCD)] + '</b><br />'+ 'Mean measure: ' + bc[i][2]
                                                        : 'Hover over a community');
                                                }
                                        }
                                }
        	        };
                	info.addTo(map);

			function highlightFeature(e) {
   				 var layer2 = e.target;
				 layer2.setStyle({
       					 weight: 5,
	      				 color: '#666',
	       				 dashArray: '',
       					 fillOpacity: 0.7
   				 });

    				if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        				layer2.bringToFront();
    				}	
				info.update(layer2.feature.properties);
			}
		
			function resetHighlight(e) {
 				communityLayer2.resetStyle(e.target);
				info.update();
			}

			function onEachFeature(feature, layer) {
    				layer.on({
      				        mouseover: highlightFeature,
        				mouseout: resetHighlight,
    				});
			}
			communityLayer2 = L.geoJson(community_districts, {style: bStyle, onEachFeature: onEachFeature}).addTo(map);
			
			legend2 = L.control({position: 'bottomright'});
			legend2.onAdd = function (map) {
			    map.legend2 = this;
			    var div = L.DomUtil.create('div', 'info legend'),
			    grades = [5, 10, 15, 20, 23, 27, 30, 37, 40],
        		    palette = ['#d0e2d0', '#a2c6a2', '#66FF66','#0cc977','#00CC00', '#339933',  '#336600', '#003300'];
    			    for (var i = 0; i < grades.length; i++) {
       				 div.innerHTML +=
           				 '<i style="background:' + palette[i] + '"></i> ' +
            				 grades[i] + (grades[i+1] ? '&ndash;' + grades[i+1] + '<br>' : '+');
		    	    }
			    return div;
			};
		
			legend2.onRemove = function(map){
				delete map.legend2;
			}
	
			legend2.addTo(map);
			
		})
	} else {
		if(map.hasLayer(communityLayer2)){
			map.removeLayer(communityLayer2)
		}
		
		if(map.legend2){
			legend2.removeFrom(map);
		}
		if(map.info){
			info.removeFrom(map);
		}
	}	
}


function scatter(){
	var checked = document.getElementById("C0").checked;
	if(checked == true){
		d3.csv("/Volumes/USB20FD/Spring2017/Visualization/Project/Project_Data/kde.csv", function(data){
			chart_area.onAdd = function(map){
				map.chart_area = this;
				var div = L.DomUtil.create("div", "container");
				return div;
			}
			chart_area.addTo(map);

			var chart1 = d3.select(".container").append("svg")
            		              .style('background', '#e6eaf2')
				      .attr("width", 140)
				      .attr("height", 120)
				      .style("position", "absolute")
				      .style("top", "30px")
				      .style("left", "20px");
	
			var chart2 = d3.select(".container").append("svg")
            		              .style('background', '#e6eaf2')
				      .attr("width", 140)
				      .attr("height", 120)
				      .style("position", "absolute")
				      .style("top", "30px")
				      .style("left", "190px");

			var chart3 = d3.select(".container").append("svg")
            		              .style('background',  '#e6eaf2')
				      .attr("width", 140)
				      .attr("height", 120)
				      .style("position", "absolute")
				      .style("top", "180px")
				      .style("left", "20px");

			var chart4 = d3.select(".container").append("svg")
            		              .style('background', '#e6eaf2')
				      .attr("width", 140)
				      .attr("height", 120)
				      .style("position", "absolute")
				      .style("top", "180px")
				      .style("left", "190px");
		});
	} else {
		if(map.chart_area) {
			chart_area.removeFrom(map);
		}
	}
}
