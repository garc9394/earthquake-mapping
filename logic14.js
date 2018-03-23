var earthquakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
var earthquakeData = [];
var earthquakeMarkers = [];

// d3.json(earthquakeUrl, function(data) {
//     earthquakeData = data.features;
// });

d3.json(earthquakeUrl, function(data) {
    createFeatures(data.features);
});

function markerSize(magnitude) {
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

// for (var i = 0; i < earthquakeData.length; i++) {
//     earthquakeMarkers.push(L.circle([earthquakeData[i].geometry.coordinates[1], earthquakeData[i].geometry.coordinates[0]], {
//         fillOpacity: 0.75,
//         fillColor: getColor(earthquakeData[i].properties.mag),
//         weight: 1,
//         radius: markerSize(earthquakeData[i].properties.mag)
//     }));
// }

function createFeatures(earthquakeData) {

    function geojsonMarkerOptions(mag) {
        return({
            fillOpacity: 0.75,
            fillColor: getColor(mag),
            weight: 1,
            radius: markerSize(mag)
        })
    };

    earthquakes = L.geoJSON(earthquakeData, {
        pointToLayer: function (feature, latlng) {
            earthquakeMarkers.push(L.circleMarker(latlng, geojsonMarkerOptions(feature.properties.mag)));
        }
    });
}

// function geojsonMarkerOptions(mag) {
//     return({
//         fillOpacity: 0.75,
//         fillColor: getColor(mag),
//         weight: 1,
//         radius: markerSize(mag)
//     })
// };

// L.geoJSON(earthquakeData, {
//     pointToLayer: function (feature, latlng) {
//         earthquakeMarkers.push(L.circleMarker(latlng, geojsonMarkerOptions(feature.properties.mag)));
//     }
// });

var earthquakeLayer = L.layerGroup(earthquakeMarkers);

var satellitemap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1Ijoia2pnMzEwIiwiYSI6ImNpdGRjbWhxdjAwNG0yb3A5b21jOXluZTUifQ." +
    "T6YbdDixkOBWH_k9GbS8JQ");

var garyscalemap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1Ijoia2pnMzEwIiwiYSI6ImNpdGRjbWhxdjAwNG0yb3A5b21jOXluZTUifQ." +
    "T6YbdDixkOBWH_k9GbS8JQ");

var outdoorsmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1Ijoia2pnMzEwIiwiYSI6ImNpdGRjbWhxdjAwNG0yb3A5b21jOXluZTUifQ." +
    "T6YbdDixkOBWH_k9GbS8JQ");

var baseLayers = {
    "Satellite": satellitemap,
    "Grayscale": garyscalemap,
    "Outdoors": outdoorsmap
};

var overlayLayers = {
    Earthquakes: earthquakeLayer
};

var myMap = L.map("map", {
    center: [40.851824075995296, -100.39751334605495],
    zoom: 3,
    layers: [satellitemap, earthquakeLayer]
});

L.control
    .layers(baseLayers, overlayLayers)
    .addTo(myMap);