(function($) {
  "use strict";
  
  var mylat = -12.043333;
  var mylng = -77.028333;

  //SIMPLE MAP
  var simpleMap = new GMaps({
    div: '#map-simple',
    lat: mylat,
    lng: mylng
  });


  //GEOLOCATION MAP
  var geoMap = new GMaps({
    div: '#map-geo',
    lat: mylat,
    lng: mylng,
  });

  GMaps.geolocate({
    success: function(position) {
      geoMap.setCenter(position.coords.latitude, position.coords.longitude);
    },
    error: function(error) {
      alert('Geolocation failed: '+error.message);
    },
    not_supported: function() {
      alert("Your browser does not support geolocation");
    }
  });


  //MAP WITH MARKER
  var markerMap = new GMaps({
    div: '#map-marker',
    lat: mylat,
    lng: mylng
  });

  markerMap.addMarker({
    lat: mylat,
    lng: mylng,
    title: 'Lima'
  });


  //MAP WITH ROUTE
  var routeMap = new GMaps({
    div: '#map-route',
    lat: mylat,
    lng: mylng,
  });

  routeMap.drawRoute({
    origin: [-12.044012922866312, -77.02470665341184],
    destination: [-12.090814532191756, -77.02271108990476],
    travelMode: 'driving',
    strokeColor: '#5ebdec',
    strokeOpacity: 0.6,
    strokeWeight: 6
  });


  //MAP WITH POLYGONS
  var polygonMap = new GMaps({
    div: '#map-polygons',
    lat: mylat,
    lng: mylng,
  });

  var path = [
    [-12.040397656836609,-77.03373871559225], 
    [-12.040248585302038,-77.03993927003302], 
    [-12.050047116528843,-77.02448169303511], 
    [-12.044804866577001,-77.02154422636042]  
  ];

  polygon = polygonMap.drawPolygon({
    paths: path, // pre-defined polygon shape
    strokeColor: '#BBD8E9',
    strokeOpacity: 1,
    strokeWeight: 3,
    fillColor: '#BBD8E9',
    fillOpacity: 0.6
  });


  //FUSION TABLES LAYERS
  var infoWindow = new google.maps.InfoWindow({});

  var fusionMap = new GMaps({
    div: '#map-fusion',
    zoom: 11,
    lat: 41.850033,
    lng: -87.6500523
  });

  fusionMap.loadFromFusionTables({
    query: {
      select: '\'Geocodable address\'',
      from: '1mZ53Z70NsChnBMm-qEYmSDOvLXgrreLTkQUvvg'
    },
    suppressInfoWindows: true,
    events: {
      click: function(point){
        infoWindow.setContent('You clicked here!');
        infoWindow.setPosition(point.latLng);
        infoWindow.open(fusionMap.fusionMap);
      }
    }
  });
})(jQuery);