// // Define a markerSize function that will give each city a different radius based on its population
// function markerSize(population) {
//     return population / 25;
// }

// // Loop through the cities array and create one marker for each city object
// for (var i = 0; i < cities.length; i++) {
//     L.circle(cities[i].location, {
//         fillOpacity: 0.75,
//         color: "steelblue",
//         weight: 1,
//         // Setting our circle's radius equal to the output of our markerSize function
//         // This will make our marker's size proportionate to its population
//         radius: markerSize(cities[i].population)
//     }).bindPopup("<h1>" + cities[i].name + "</h1> <hr> <h3>Population: " + cities[i].population + "</h3>").addTo(myMap);
// }


var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(queryUrl, function(data) {
    createFeatures(data.features);
});

function createFeatures(earthquakeData) {

    // feature.properties.mag

    // Define a function we want to run once for each feature in the features array
    // Give each feature a popup describing the place and time of the earthquake
    // function handleFeature(feature, layer) {
    //     layer.bindPopup("<h3>" + feature.properties.place +
    //   "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    // }

    // Create a GeoJSON layer containing the features array on the earthquakeData object
    // Run the handleFeature function once for each piece of data in the array
    // var earthquakes = L.geoJSON(earthquakeData, {
    //     onEachFeature: handleFeature
    // });
    // Create a layer with all earthquake data
    var earthquakes = L.geoJSON(earthquakeData);

    // Sending our earthquakes layer to the createMap function
    createMap(earthquakes);
    // console.log(earthquakeData);
}

// function markerSize(population) {
//     return population / 25;
// }

// var getColors2 = d3.scaleLinear()
//     .domain(d3.extent(cities, function(city){
//         return city.population;
//     }))
//     .range(['steelblue', 'limegreen']);

// for (var i = 0; i < cities.length; i++) {
//     L.circle(cities[i].location, {
//         fillOpacity: 0.75,
//         fillColor: getColors2(cities[i].population),
//         color: "none",
//         weight: 3,
//         className: "city",
//         // Setting our circle's radius equal to the output of our markerSize function
//         // This will make our marker's size proportionate to its population
//         radius: markerSize(cities[i].population)
//     }).bindPopup("<h1>" + cities[i].name + "</h1> <hr> <h3>Population: " + cities[i].population + "</h3>").addTo(myMap);
// }

function createMap(earthquakes) {

    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1Ijoia2pnMzEwIiwiYSI6ImNpdGRjbWhxdjAwNG0yb3A5b21jOXluZTUifQ." +
    "T6YbdDixkOBWH_k9GbS8JQ");

    var overlayMaps = {
        Earthquakes: earthquakes
    };

    var myMap = L.map("map", {
        center: [40.851824075995296, -116.39751334605495],
        zoom: 5,
        layers: [lightmap, earthquakes]
    });
}
