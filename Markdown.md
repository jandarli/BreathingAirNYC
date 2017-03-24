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
&nbsp;&nbsp;&nbsp;The main motivation behind this project was initially to compare datasets with the same indicators on two cities after a suggestion from the professor. In an attempt to do this, we searched for datasets containing the same indicators so as to minimize the amount of work that be needed to clean the data. However, the tree coverage datasets for both cities uttimately proved to be too different. Therefore we decided to focus our attention on just one city - New York City. Another dataset containing compalints recieved by 311 about air quality was found and we thought initially it might be interesting to see if there are any relationships between the data. After, speaking to a expert in urban visualization, the incorporation of a dataset containing air quality readings was suggestions. Taking that suggestion into mind, we have decided to settle on creating a visualization from tree census data, air quality recordings and air quality complaints data  to show relationships if any betwen the three.

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
* Air Quality Data: https://data.cityofnewyork.us/Environment/Air-Quality/c3uy-2p5r/data
* Air Quality Complaints: https://data.cityofnewyork.us/Social-Services/Air-Quality/b5f6-22ra

&nbsp;&nbsp;&nbsp; From the Air Quality Complaints data, in order to show answer the question regarding the existence of a relationship between asthmas related emergency room visit and air quality complaint, the data may be partitioned or another dataset with that subset of data may be used. 

&nbsp;
&nbsp;


## Data Processing
Since the project will be using three datasets there will be substantial time use on cleaning up the raw data before use. 
From the 2015 street tree dataset (https://data.cityofnewyork.us/Environment/2015-Street-Tree-Census-Tree-Data/uvpi-gqnh/data) we will derive the number of trees living on the same street and the size of the tree to calculate the area coverage of the trees by size instead of number. From 311 air quality (https://data.cityofnewyork.us/Social-Services/311-Indoor-Air-Quality/udax-ixue) we will get the number of complaints based on each street. In https://data.cityofnewyork.us/Social-Services/Air-Quality/b5f6-22ra we will get the the number of people affected by asthma that lives around the same location. Tools such as DataWrangler from http://vis.stanford.edu/wrangler/app/ will help us split, cut, and extract the data we need into a more usable format.

## Visualization
We want to show our data in a clear and straight forward way that covers a lot of area that in a glance we can see if the data set correlates to eachother or not. This is why we choose to make an interactive map for our visualization. As shown below:

![Map Layer](http://66.media.tumblr.com/46f2b314dbfb83a2173e1ea70deb9ad7/tumblr_nm2lae3Y6I1u9qlp8o1_1280.jpg)

We will make 3-4 layers to our map that shows the data about the tree population, tree size, air complaints, and asthma attacks in the different locations. By overlapping some of these layers we might be able to see a trend or maybe not about these data sets easily.


## Must-Have Features
&nbsp;&nbsp;&nbsp;

&nbsp;
&nbsp;

## Optional Features
&nbsp;&nbsp;&nbsp;

&nbsp;
&nbsp;

## Project Schedule
&nbsp;&nbsp;&nbsp;

&nbsp;
&nbsp;


