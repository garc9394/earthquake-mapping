var tectonicplateUrl = "./GeoJSON/PB2002_boundaries.json";
var tectonicplateMarkers = [];

var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1Ijoia2pnMzEwIiwiYSI6ImNpdGRjbWhxdjAwNG0yb3A5b21jOXluZTUifQ." +
    "T6YbdDixkOBWH_k9GbS8JQ");

d3.json(tectonicplateUrl, function(data) {
    createFeatures(data.features);
});

function createFeatures(tectonicplateData) {
    return tectonicplateMarkers.push(L.geoJSON(tectonicplateData));
};

var tectonicplates = L.layerGroup(tectonicplateMarkers);

var baseMaps = {
    "Light": lightmap
};

var overlayMaps = {
    "Tectonicplates": tectonicplates
};

var myMap = L.map("map", {
    center: [40.851824075995296, -100.39751334605495],
    zoom: 3,
    layers: [lightmap, tectonicplates]
});

L.control
    .layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);