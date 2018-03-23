var tectonicplateUrl = "./GeoJSON/PB2002_boundaries.json";
var tectonicplatesData = [];

d3.json(tectonicplateUrl, function(data) {
    tectonicplatesData.push(data.features);
})

// var tectonicplateMarkers = L.geoJSON(tectonicplatesData);

// var tectonicplates = L.layerGroup(tectonicplateMarkers);

var tectonicplates = L.geoJSON(tectonicplatesData);

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
    "Tectonicplates": tectonicplates
};

var myMap = L.map("map", {
    center: [40.851824075995296, -100.39751334605495],
    zoom: 3,
    layers: [satellitemap, tectonicplates]
});

L.control
.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(myMap);