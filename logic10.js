
var earthquakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
var tectonicplateUrl = "./GeoJSON/PB2002_boundaries.json";

d3.json(earthquakeUrl, function(data) {
    createFeatures(data.features);
});

// d3.json(tectonicplateUrl, function(data) {
//     var tectonicplates = L.geoJSON(data.features);
// });

function getTectonicplatesData() {
    d3.json(tectonicplateUrl, function(data) {
        return createTectonicplates(data.features);
    });
}

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
            return L.circleMarker(latlng, geojsonMarkerOptions(feature.properties.mag));
        }
    });

    createMap(earthquakes);

}

function createTectonicplates(tectonicplatesData) {
    return L.geoJSON(tectonicplatesData);
}

function createMap(earthquakes) {

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

    // tectonicplates not defined
    var tectonicplates = getTectonicplatesData();
    console.log(tectonicplates);

    var overlayMaps = {
        "Earthquakes": earthquakes
        // "Earthquakes": earthquakes,
        // "Tectonicplates": tectonicplates
    };

    var myMap = L.map("map", {
        center: [40.851824075995296, -100.39751334605495],
        zoom: 3,
        layers: [satellitemap, earthquakes]
        // layers: [satellitemap, earthquakes, tectonicplates]
    });

    L.control
    .layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);

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

}