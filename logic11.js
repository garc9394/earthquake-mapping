var earthquakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
var tectonicplateUrl = "./GeoJSON/PB2002_boundaries.json";

d3.json(earthquakeUrl, function(data) {
    createFeatures(data.features);
});

d3.json(tectonicplateUrl, function(data) {
    createTectonicplates(data.features);
});

function markerSize(magnitude) {
    // return Math.exp(magnitude);
    return magnitude * 3;
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

var earthquakeMarkers = [];
var tectonicplateMarkers = [];

function createFeatures(earthquakeData) {

    for (var i = 0; i < earthquakeData.length; i++) {
        earthquakeMarkers.push(
            L.circle([earthquakeData[i].geometry.coordinates[1], earthquakeData[i].geometry.coordinates[0]], {
                fillOpacity: 0.75,
                fillColor: getColor(earthquakeData[i].properties.mag),
                weight: 1,
                radius: markerSize(earthquakeData[i].properties.mag)
            })
        );
    }
}

// console.log(earthquakeMarkers);

function createTectonicplates(tectonicplatesData) {
    tectonicplateMarkers = L.geoJSON(tectonicplatesData);
    // console.log(tectonicplateMarkers);
}

var earthquakes = L.layerGroup(earthquakeMarkers);
var tectonicplates = L.layerGroup(tectonicplateMarkers);

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
    "Earthquakes": earthquakes,
    "Tectonicplates": tectonicplates
};

// console.log(earthquakes);

var myMap = L.map("map", {
    center: [40.851824075995296, -100.39751334605495],
    zoom: 3,
    layers: [satellitemap, earthquakes, tectonicplates]
});

L.control
.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(myMap);

// earthquakes.addTo(myMap);

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