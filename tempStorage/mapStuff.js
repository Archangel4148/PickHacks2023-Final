let map;
let markers = [];
let routeMarkers = [];
let coords = [];
let clicks = 0;
let distance = 69;

async function initMap() {

  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerView } = await google.maps.importLibrary("marker");
  const rolla = { lat: 37.955544, lng: -91.773513 }

  map = new Map(document.getElementById('map'), {
    zoom: 13,
    center: rolla,
    zoomControl: false,
    fullscreenControl: false,
    mapTypeControl: false,
    streetViewControl: false
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
  distance = "";
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

    //Distance is defined right here!
    distance = result.routes[0].legs[0].distance.text;
    
    document.getElementById("reshow").innerHTML = distance;
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


  document.getElementById("anotherThing").innerHTML = distance;
}



//FORM STUFF:::






// Get the form and input elements
const form = document.querySelector('form');
const gasMileageInput = document.getElementById('gas-mileage-input');

// Add an event listener to the form's submit button
document.getElementById('submit-button').addEventListener('click', function(event) {
  event.preventDefault(); // prevent the form from submitting

  // Get the value from the gas mileage input field
  const gasMileage = gasMileageInput.value;
  document.getElementById("gm").innerHTML = gasMileage;
});

function getEmission(distance, gasMileage) {
  const x = 8887;
  const gallons = parseFloat(distance) / parseInt(gasMileage);
  const emissions = x * gallons; // Emissions in grams
  document.getElementById("CO2").innerHTML = emissions;
  return emissions;
} 

function calcTreesSaved(gallons) {  
  const trees = 0.4082 * gallons;
  document.getElementById("trees").innerHTML = trees;
  return trees;
}

// Get the submit button element
const submitButton = document.getElementById('submit-button');

// Add a click event listener to the submit button
submitButton.addEventListener('click', function() {
  // Get the distance and gas mileage inputs from the DOM
  const distanceInput = document.getElementById('myText');
  
  const gasMileageInput = document.getElementById('gas-mileage-input');

  // Get the values from the distance and gas mileage inputs
  distance = distance.replace(/\D/g,'');
  
  const distance = parseFloat(distanceInput.value);
  const gasMileage = parseFloat(gasMileageInput.value);

  // Calculate the emissions and trees saved and display them on the page
  const emissions = getEmission(distance, gasMileage);
  //let gallons = 2;
  const treesSaved = calcTreesSaved(gallons);

  // Display the results on the page
  document.getElementById('CO2').innerHTML = emissions;
  document.getElementById('trees').innerHTML = treesSaved;
  document.getElementById('test').innerHTML = "Hello";
});
