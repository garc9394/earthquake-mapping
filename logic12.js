// Function to determine marker size based on population
function markerSize(population) {
    return population / 50;
}

var earthquakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
var tectonicplateUrl = "./GeoJSON/PB2002_boundaries.json";

var locations = d3.json(earthquakeUrl, function(data) {
    return data.features;
});

// An array containing all of the information needed to create city and state markers
// var locations = [
//     {
//         coordinates: [40.7128, -74.0059],
//         state: {
//             name: "New York State",
//             population: 19795791
//         },
//         city: {
//             name: "New York",
//             population: 8550405
//         }
//     },
//     {
//         coordinates: [34.0522, -118.2437],
//         state: {
//             name: "California",
//             population: 39250017
//         },
//         city: {
//             name: "Lost Angeles",
//             population: 3971883
//         }
//     },
//     {
//         coordinates: [41.8781, -87.6298],
//         state: {
//             name: "Michigan",
//             population: 9928300
//         },
//         city: {
//             name: "Chicago",
//             population: 2720546
//         }
//     },
//     {
//         coordinates: [29.7604, -95.3698],
//         state: {
//             name: "Texas",
//             population: 26960000
//         },
//         city: {
//             name: "Houston",
//             population: 2296224
//         }
//     },
//     {
//         coordinates: [41.2524, -95.9980],
//         state: {
//             name: "Nebraska",
//             population: 1882000
//         },
//         city: {
//             name: "Omaha",
//             population: 446599
//         }
//     }
// ];

// Define arrays to hold created city and state markers
var cityMarkers = [];
var stateMarkers = [];

// Loop through locations and create city and state markers
for (var i = 0; i < locations.length; i++) {
    // Setting the marker radius for the state by passing population into the markerSize function
    stateMarkers.push(
        L.circle([locations[i].geometry.coordinates[1], locations[i].geometry.coordinates[0]], {
            stroke: false,
            fillOpacity: 0.6,
            fillColor: "white"
        })
    );

    // Setting the marker radius for the city by passing population into the markerSize function
    cityMarkers.push(
        L.circle([locations[i].geometry.coordinates[1], locations[i].geometry.coordinates[0]], {
            stroke: false,
            fillOpacity: 0.6,
            fillColor: "tomato",
            radius: markerSize(locations[i].city.population)
        })
    );
}

// Create two separate layer groups: one for cities and one for states
var states = L.layerGroup(stateMarkers);
var cities = L.layerGroup(cityMarkers);





// Create a baseLayers object
// var baseLayers = {
//     "Street Map": streetmap,
//     "Dark Map": darkmap
// };



// Pass our map layers into our layer control
// Add the layer control to the map
// L.control
//     .layers(baseLayers, overlayLayers)
//     .addTo(myMap);


var satellitemap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1Ijoia2pnMzEwIiwiYSI6ImNpdGRjbWhxdjAwNG0yb3A5b21jOXluZTUifQ." +
    "T6YbdDixkOBWH_k9GbS8JQ");

var garyscalemap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1Ijoia2pnMzEwIiwiYSI6ImNpdGRjbWhxdjAwNG0yb3A5b21jOXluZTUifQ." +
    "T6YbdDixkOBWH_k9GbS8JQ");

var outdoorsmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1Ijoia2pnMzEwIiwiYSI6ImNpdGRjbWhxdjAwNG0yb3A5b21jOXluZTUifQ." +
    "T6YbdDixkOBWH_k9GbS8JQ");

var baseMaps = {
    "Satellite": satellitemap,
    "Grayscale": garyscalemap,
    "Outdoors": outdoorsmap
};

// var overlayMaps = {
//     "Earthquakes": earthquakes,
//     "Tectonicplates": tectonicplates
// };


// Define a map object
var myMap = L.map("map", {
    center: [40.851824075995296, -100.39751334605495],
    zoom: 3,
    layers: [
        satellitemap, states, cities
    ]
});

// var myMap = L.map("map", {
//     center: [40.851824075995296, -100.39751334605495],
//     zoom: 3,
//     layers: [satellitemap, earthquakes, tectonicplates]
// });

// Create an overlayLayers object
var overlayMaps = {
    "State Population": states,
    "City Population": cities
};

L.control
.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(myMap);

// var legend = L.control({position: 'bottomright'});

// legend.onAdd = function (myMap) {

//     var div = L.DomUtil.create('div', 'info legend'),
//         grades = [0, 1, 2, 3, 4, 5, 6, 7],
//         labels = [];

//     // loop through our density intervals and generate a label with a colored square for each interval
//     for (var i = 0; i < grades.length; i++) {
//         div.innerHTML +=
//             '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
//             grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
//     }

//     return div;
// };

// legend.addTo(myMap);