# CSC 59969: Visualization
Class Project Proposal
24 March 2017

### Team Members: 
* Janice Darling 
* Jetlir Lajqi 
* Wantong Lin 
&nbsp;
&nbsp;

## Abstract  
&nbsp;&nbsp;&nbsp;For this project, the visualization problem will address the relationship between air quality, air quality complaints and tree coverage in the urban setting of  New York City. The problem involves properly and effectively creating visualizations that will show the existence of any linkages between the datasets related to the aformentioned topics. Also, it is necessary to take into consideration other factors affecting air quality and thus any attempt to create a visualization showcasing its relationship to other factors that falls outside of the scope of this project.   

&nbsp;&nbsp;&nbsp;Many visualizations problems similar to the one descibed, choose to showcase data by employing map visualization techniques such as cartograms. However, many times these visualizations fall short of their goal and into the same catogories of problems. For example, the problem of distortion of boundaries adding layers to maps may occur when employing the cartogram techniques, which is often an important feature of a map. This not only takes away from the ability of the visualization to to accurately present the data in an easily comprehensible manner, but also from the ability to identify and solve the underlying problems represented by the data. 

&nbsp;
&nbsp;

## Background and Motivation
&nbsp;&nbsp;&nbsp;The main motivation behind this project was initially to compare datasets with the same indicators on two cities after a suggestion from the professor. In an attempt to do this, we searched for datasets containing the same indicators so as to minimize the amount of work that be needed to clean the data. However, the tree coverage datasets for both cities utimately proved to be too different. Therefore we decided to focus our attention on just one city - New York City. Another dataset containing compalints recieved by 311 about air quality was found and we thought initially it might be interesting to see if there are any relationships between the data. After, speaking to a expert in urban visualization, the incorporation of a dataset containing air quality readings was suggestions. Taking that suggestion into mind, we have decided to settle on creating a visualization from tree census data, air quality recordings and air quality complaints data  to show relationships if any between the three.

&nbsp;
&nbsp;

## Project Objectives
&nbsp;&nbsp;&nbsp;The main objective of this project is to create an interactive, exploratory visualization that effectively shows the data in the tree census, air quality complaints and air quality datasets. To be more specific, we are seeking to answer the following questions:
* Is there a linkage between the number of trees in a locale and the air quality?
* Is air quality the only factor affecting the number of air quality complaints>
* Is there a relationship between asthma related emergency room visits and air quality complaints the United Hospital Foundation neighbourhoods?

&nbsp;
&nbsp;

## Data
&nbsp;&nbsp;&nbsp;All the data used in this project can be was sourced from http://opendata.cityofnewyork.us/, which is the NYC Open Data Portal. Specifically, the datasets and links to them are that we will use are:
* Tree Census Data: https://data.cityofnewyork.us/Environment/2015-Street-Tree-Census-Tree-Data/uvpi-gqnh/data
* Air Quality Data: https://data.cityofnewyork.us/Environment/Air-Quality/c3uy-2p5r/data & https://www.health.ny.gov/statistics/ny_asthma/hosp/zipcode/map.htm
* Air Quality Complaints: https://data.cityofnewyork.us/Social-Services/Air-Quality/b5f6-22ra

&nbsp;&nbsp;&nbsp; From the Air Quality Complaints data, in order to show answer the question regarding the existence of a relationship between asthma related emergency room visits and air quality complaints, the data may be partitioned or another dataset with that subset may be used. 

&nbsp;
&nbsp;


## Data Processing
&nbsp;&nbsp;&nbsp;Since the project requires the use of three datasets,  there will be substantial time spent on cleaning the raw data as well as transforming it into a manner that will be easier to process.
From the 2015 street tree census dataset (https://data.cityofnewyork.us/Environment/2015-Street-Tree-Census-Tree-Data/uvpi-gqnh/data) the exact locations of the trees will be visualized and taken into consideration when searching for relationship between the other datasets. 
Then from the 311 Air Quality Complaints (https://data.cityofnewyork.us/Social-Services/Air-Quality/b5f6-22ra), we can obtain the location, prevalence and frequency of Air Quality Complaints within specific locales down to the street number.
Finally, the Air Quality Surviellance and Asthma Hospital dischage data from https://data.cityofnewyork.us/Environment/Air-Quality/c3uy-2p5r/data and https://www.health.ny.gov/statistics/ny_asthma/hosp/zipcode/map.htm respectively, will allow us to map the number of asthma related and hospital visits for each zip code alongside the aformentioned datasets.

Tools such as DataWrangler from http://vis.stanford.edu/wrangler/app/ will help us split, cut, and extract the data we need into a more usable format.


## Visualization
The goal of this project is to present the data in a clear and concise manner. Therefore, we have decided at this point that an ineractive, spatial visualization allows for quick and easy exploration of the data, which can easily show patterns if present, and distinction. For example, the below map avoids the problem of distorting boundaries somewhat which is prevalent among map visualizations as mentioned in the abstract.
![Map Layer](http://66.media.tumblr.com/46f2b314dbfb83a2173e1ea70deb9ad7/tumblr_nm2lae3Y6I1u9qlp8o1_1280.jpg)

We will add 3-4 layers to our map to show the data about the tree population, tree size, air complaints, and asthma related hospital visits in the different locations. By overlapping some of these layers, the resulting visualization may or may not show linkages between the data that is represented.


## Must-Have Features
It is important to be able to depict our data set as easily and seamlessly as possible and minimize confusion/complexity.
To accomplish this, we have guidelines that are needed to be fulfilled for displaying the visualization. These are some of the 
Must-Have features...

* Full horizontal/vertical movements for the 2D map display
* Zooming capabilities to better view each section of NYC and the areas of shading that show each data set
* Filter capability that can switch off either data sets (air quality, air quality complaints and tree coverage) to see  correlation/patterns in these three trends (or lack thereof)
* Easy to follow color gradient that shows low to high volume of data in each location in NYC


## Optional Features

* Mousing over cities can bring up a pop up box displaying raw data in that particular area, for better understanding of intensity.
* Visualization should be properly optimized, accurate and fast when displaying color gradient areas and should change in real-time when transforming the map, (zooming, moving) 


## Project Schedule
In order to provide the best possible visualization, there needs to be organization and consistency 
in work flow. Generally for this proposal our group will attempt to accomplish the following: 

* 1. Realize trends in data sets and show important patterns by using basic graphs (bar graphs, plots etc..)
* 2. Begin coding foundation of program that will lead up to the interactive visual that is anticipated
* 3. Make sure it functions and accomplishes the proposals must have features  
* 4. Create presentation, by this point have working and bug free version of the visual.






