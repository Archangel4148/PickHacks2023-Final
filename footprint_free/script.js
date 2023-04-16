let map;
let markers = [];
let routeMarkers = [];
let coords = [];
let clicks = 0;
let distance = 69;

async function initMap() {

  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerView } = await google.maps.importLibrary("marker");
  const rolla = { lat: 37.95283354618601, lng: -91.77017108506378 }

  map = new Map(document.getElementById('map'), {
    zoom: 8,
    center: rolla,
    zoomControl: false,
    fullscreenControl: false
  });

  map.addListener("click", (e) => { placeMarker(e.latLng, map); });
  document
    .getElementById("clear-button")
    .addEventListener("click", clearMarkers);
}

function setMapOnAll(map) {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function clearMarkers() {
  setMapOnAll(null);
  markers = [];
  coords = [];
  if (directionsRenderer) {
    directionsRenderer.setMap(null);
  }
}

function calculateRoute(start, end) {
  let directionsService = new google.maps.DirectionsService();
  let directionsRenderer = new google.maps.DirectionsRenderer();

  directionsRenderer.setMap(map);
  let request = {
    origin: start,
    destination: end,
    travelMode: 'DRIVING'
  };

  directionsService.route(request, function(result, status) {

    //Draw the route on the map
    directionsRenderer.setDirections(result);

    //document.getElementById("R1").innerHTML = start;
    //document.getElementById("R2").innerHTML = end;

    //Distance is defined right here!
    distance = result.routes[0].legs[0].distance.text;

    document.getElementById("myText").innerHTML = distance;
  });
}



function placeMarker(position, map) {
  let marker = new google.maps.Marker({
    position: position,
    map: map,
  });

  map.panTo(position);
  markers.push(marker);
  coords.push(position);

  clicks += 1;

  if (clicks > 2) {
    initMap();
    clicks = 0;
    markers = [];
    coords = [];
    routeMarkers = [];
  }
  calculateRoute(coords[0], coords[1]);
  //document.getElementById("Point1").innerHTML = coords[0];
  //document.getElementById("Point2").innerHTML = coords[1];
}

