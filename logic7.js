// var mapBox = "https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?" +
//   "access_token=pk.eyJ1Ijoia2pnMzEwIiwiYSI6ImNpdGRjbWhxdjAwNG0yb3A5b21jOXluZTUifQ." +
//   "T6YbdDixkOBWH_k9GbS8JQ";

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

var overlayMaps = {
    // "Earthquakes": earthquakes
    // earthquakes is a Leaflet, not D3 object.  try L.circleMarker
    "Earthquakes": L.tileLayer(earthquakes)
};

// Create a map object
var myMap = L.map("map", {
    center: [40.851824075995296, -100.39751334605495],
    zoom: 3,
    layers: [satellitemap]
});

L.control
    .layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);

// Add a tile layer
// L.tileLayer(mapBox).addTo(myMap);

var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

var earthquakes = d3.json(queryUrl, function(data) {
    createFeatures(data.features);
});

function createFeatures(earthquakeData) {

    for (var i = 0; i < earthquakeData.length; i++) {
        L.circle([earthquakeData[i].geometry.coordinates[1], earthquakeData[i].geometry.coordinates[0]], {
            fillOpacity: 0.75,
            fillColor: getColor(earthquakeData[i].properties.mag),
            weight: 1,
            radius: markerSize(earthquakeData[i].properties.mag)
        }).addTo(myMap);
    }

}

// Define a markerSize function that will give each earthquake a different radius based on its magnitude
function markerSize(magnitude) {
    // return magnitude * 12000;
    return Math.exp(magnitude) * 2500;
}

function getColor(mag) {
    return mag > 7   ? '#800026' :
           mag > 6   ? '#BD0026' :
           mag > 5   ? '#E31A1C' :
           mag > 4   ? '#FC4E2A' :
           mag > 3   ? '#FD8D3C' :
           mag > 2   ? '#FEB24C' :
           mag > 1   ? '#FED976' :
                       '#FFEDA0';
}

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (myMap) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 1, 2, 3, 4, 5, 6, 7],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(myMap);



// var earthquakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// function createFeatures(earthquakeData) {

//     for (var i = 0; i < earthquakeData.length; i++) {
//         L.circle([earthquakeData[i].geometry.coordinates[1], earthquakeData[i].geometry.coordinates[0]], {
//             fillOpacity: 0.75,
//             fillColor: getColor(earthquakeData[i].properties.mag),
//             weight: 1,
//             radius: markerSize(earthquakeData[i].properties.mag)
//         }).addTo(myMap);
//     }

// }

// // Define a markerSize function that will give each earthquake a different radius based on its magnitude
// function markerSize(magnitude) {
//     // return magnitude * 12000;

//     return Math.exp(magnitude) * 2500;

// }

// function getColor(mag) {
//     return mag > 7   ? '#800026' :
//            mag > 6   ? '#BD0026' :
//            mag > 5   ? '#E31A1C' :
//            mag > 4   ? '#FC4E2A' :
//            mag > 3   ? '#FD8D3C' :
//            mag > 2   ? '#FEB24C' :
//            mag > 1   ? '#FED976' :
//                        '#FFEDA0';
// }

// function createMap(earthquakes) {

//     var satellitemap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?" +
//     "access_token=pk.eyJ1Ijoia2pnMzEwIiwiYSI6ImNpdGRjbWhxdjAwNG0yb3A5b21jOXluZTUifQ." +
//     "T6YbdDixkOBWH_k9GbS8JQ");

//     var garyscalemap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?" +
//     "access_token=pk.eyJ1Ijoia2pnMzEwIiwiYSI6ImNpdGRjbWhxdjAwNG0yb3A5b21jOXluZTUifQ." +
//     "T6YbdDixkOBWH_k9GbS8JQ");

//     var outdoorsmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
//     "access_token=pk.eyJ1Ijoia2pnMzEwIiwiYSI6ImNpdGRjbWhxdjAwNG0yb3A5b21jOXluZTUifQ." +
//     "T6YbdDixkOBWH_k9GbS8JQ");

//     var baseMaps = {
//         "Satellite": satellitemap,
//         "Grayscale": garyscalemap,
//         "Outdoors": outdoorsmap
//     };

//     var overlayMaps = {
//         "Earthquakes": earthquakes
//     };

//     var myMap = L.map("map", {
//         center: [40.851824075995296, -100.39751334605495],
//         zoom: 3,
//         layers: [satellitemap, earthquakes]
//     });

//     L.control
//         .layers(baseMaps, overlayMaps, {
//             collapsed: false
//         }).addTo(myMap);

// }