var mapBox = "https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?" +
  "access_token=pk.eyJ1Ijoia2pnMzEwIiwiYSI6ImNpdGRjbWhxdjAwNG0yb3A5b21jOXluZTUifQ." +
  "T6YbdDixkOBWH_k9GbS8JQ";

// Create a map object
var myMap = L.map("map", {
    center: [40.851824075995296, -116.39751334605495],
    zoom: 5
});

// Add a tile layer
L.tileLayer(mapBox).addTo(myMap);

var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(queryUrl, function(data) {
    createFeatures(data.features);
});

function createFeatures(earthquakeData) {

    var getColors = d3.scaleLinear()
    .domain(d3.extent(earthquakeData, function(earthquake){
        return earthquake.properties.mag;
    }))
    .range(['lime', 'lightgreen', 'yellow', 'orange', 'red']);

    for (var i = 0; i < earthquakeData.length; i++) {
        L.circle([earthquakeData[i].geometry.coordinates[1], earthquakeData[i].geometry.coordinates[0]], {
            fillOpacity: 0.75,
            fillColor: getColors(earthquakeData[i].properties.mag),
            weight: 1,
            radius: markerSize(earthquakeData[i].properties.mag)
        }).addTo(myMap);
    }

}

// Define a markerSize function that will give each earthquake a different radius based on its magnitude
function markerSize(magnitude) {
    return magnitude * 12000;
}