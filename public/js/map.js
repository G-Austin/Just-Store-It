var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: new google.maps.LatLng(37.8715, -122.2727),
    mapTypeId: 'terrain'
  });

  // Create a <script> tag and set the USGS URL as the source.
  var script = document.createElement('script');
  // This example uses a local copy of the GeoJSON stored at
  // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
  script.src = 'http://localhost:3306/api/all';
  document.getElementsByTagName('head')[0].appendChild(script);
}

// Loop through the results array and place a marker for each
// set of coordinates.
window.eqfeed_callback = function(results) {
  for (var i = 0; i < results.length; i++) {
    var coord1 = results.lat;
    var coord2 = results.lng;
    var latLng = new google.maps.LatLng(coord1,coord2);
    var marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
  }
}