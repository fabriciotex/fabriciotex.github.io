// Get todays date
function getDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  today = yyyy + '-' + mm + '-' + dd;
  return today;
}

// Date validation
document.getElementById('fromDate').setAttribute("max", getDate());
document.getElementById('toDate').setAttribute("max", getDate());
document.getElementById('fromDate').addEventListener('change', function () {
  var fromDate = document.getElementById('fromDate').value;
  document.getElementById('toDate').setAttribute("min", fromDate);
});

// Get coordinates
var coords = [];

// Set markers
var markers = [];

// Set index
var index = -1;

// Do the query
function query() {
  // Get information from form
  var userId = document.getElementById('userId').value;
  var fromDate = document.getElementById('fromDate').value;
  var toDate = document.getElementById('toDate').value;
  
  // If userId is empty alert
  if (userId == '') {
    return window.alert('Insert user id');
  }
  
  // If fromDate is empty fill with default value
  if (fromDate == '') {
    fromDate = '2000-01-01';
    document.getElementById('fromDate').value = fromDate;
  }
  
  // If toDate is empty fill with default value
  if (toDate == '') {
    toDate = getDate();
    document.getElementById('toDate').value = toDate;
  }
  
  // Reset coordinates
  coords = [];
  
  // Set usable variables
  var name, position, miles, color, location, state;
  miles = 0;
  
  // Query on user array
  for (var i = 0; i < user.length; i++) {
    if(userId == user[i].id) {
      // Loop into position array
      for (j = 0; j < user[i].position.length; j++) {
        if (user[i].position[j].date >= fromDate && user[i].position[j].date <= toDate) {
          // Push coordinates into coords array
          coords.push(user[i].position[j].coord);
          
          // Sum miles traveled
          miles += user[i].position[j].miles;
          
          // Get last location and state
          position = user[i].position[j].coord;
          location = user[i].position[j].city;
          state = user[i].position[j].state;
        }
      }
      name = user[i].name;
      color = user[i].color;
    }
  }
	index++;
  
  // Check if user is already printed on screen
  var ul = document.getElementById('userList');
  var li = ul.getElementsByTagName('li');
  var check = true;
  for (var i = 0; i < li.length; i++) {
    var printedUser = li[i].getElementsByClassName('id');
    var printedUserId = printedUser[0].innerHTML;
    if (printedUserId == userId) {
      check = false;
    }
    
  }
  if (check) {
    makeRoadPath(color);
    makeMarker(name, position, color, location, state);
    showMarkers();
    // Print user info on HTML
    printUser(index, userId, name, miles, color, location, state);
  }
}

function printUser(index, id, name, miles, color, location, state) {
	state = state.toUpperCase();
	name = name.toUpperCase();
  
  // print info on html
  var userInfo = '<li><article class="user"><header><h6 class="id">' + id + '</h6><h3 style="color: #' + color + ' "class="name">' + capitalize(name) + '</h3><input class="traceRoute" type="checkbox" checked onclick="javascript:togglePosition(this,' + index + ')"></header><main><h4>' + capitalize(location) + ', ' + state + '</h4><p class="userMiles">' + miles + 'km</p></main></article></li>';
  
	var node = document.createElement('li');
	node.innerHTML = userInfo;
	node = node.firstChild;
	document.getElementById('userList').appendChild(node);
	
}

function togglePosition(obj, i){
	var selected = obj.checked;
  if (!selected) {
    polylines[i].setMap(null);
    markers[i].setMap(null);
    selected = false;
  } else {
    polylines[i].setMap(map);
    markers[i].setMap(map);
    selected = true;
  }
}

// Prepare to make road path
function makeRoadPath(color) {
  
  // Create url for snap to roads
  var url = "https://roads.googleapis.com/v1/snapToRoads?path=";
  
  // Add coordinates to url
  for (var i = 0; i < coords.length; i++) {
    if (i != coords.length - 1) {
      url = url + coords[i].lat + ',' + coords[i].lng + "|";
    } else {
      url = url + coords[i].lat + ',' + coords[i].lng;
    }
  }
  
  // Add properties and key to url
  url = url + "&interpolate=true&key=AIzaSyA2xAs2_CN7ONofCJXVnA52AMc3Dq18YJM";
  
  // Use $get jQuery method to get snap to roads service result
  $.get(url, function(data) {
    console.log(data);
    processSnapToRoadResponse(data);
    drawSnappedPolyline(color);
  });
}

// Capitalize strings
function capitalize(name) {
  // Capitalize first letter in word
  return name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

// #######################################
// Google Maps API Initialize
var map;
var largeInfoWindow;

function initMap() {
	//getLocation();
	mapConstructor(-25.4244, -49.2654);
	
	largeInfoWindow = new google.maps.InfoWindow();

  // Snap-to-road when the polyline is completed.
  drawingManager.addListener('polylinecomplete', function(poly) {
    var path = poly.getPath();
    polylines.push(poly);
    placeIdArray = [];
    runSnapToRoad(path);
  });
}
/*
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    var lat = (Math.random()*(85*2)-85);
    var lng = (Math.random()*(180*2)-180);
    mapConstructor(lat, lng);  
  }
}

function showPosition(position) {
  var lat = position.coords.latitude;
  var lng = position.coords.longitude;
  mapConstructor(lat, lng);
}
*/
function mapConstructor(lat, lng) {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat:lat, lng: lng},
    zoom: 13,
		mapTypeControl: false
  });
}

// #######################################
// Snap to roads
var placeIdArray = [];
var polylines = [];
var snappedCoordinates = [];

// Store snapped polyline returned by the snap-to-road service.
function processSnapToRoadResponse(data) {
  snappedCoordinates = [];
  placeIdArray = [];
  for (var i = 0; i < data.snappedPoints.length; i++) {
    var latlng = new google.maps.LatLng(
        data.snappedPoints[i].location.latitude,
        data.snappedPoints[i].location.longitude);
    snappedCoordinates.push(latlng);
    placeIdArray.push(data.snappedPoints[i].placeId);
  }
}

// Draws the snapped polyline (after processing snap-to-road response).
function drawSnappedPolyline(color) {
  
  
  // Print polylines on map
  var snappedPolyline = new google.maps.Polyline({
    path: snappedCoordinates,
    strokeColor: '#' + color,
    strokeWeight: 3
  });
  
  snappedPolyline.setMap(map);
  polylines.push(snappedPolyline);
}

// ######################################
// Make markers
function makeMarker(title, position, color, location, state) {

  var icon = makeIcon(color);
  
  // make marker
  var marker = new google.maps.Marker({
    position: position,
    icon: icon,
    title: capitalize(title),
    location: capitalize(location) + ", " + state.toUpperCase(),
    color: color
  });
  
  markers.push(marker);
  marker.addListener('click', function() {
    populateInfoWindow(this, largeInfoWindow);
  });
}

function makeIcon(color) {
  var markerImage = new google.maps.MarkerImage(
    'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ color +
    '|40|_|%E2%80%A2',
    new google.maps.Size(21, 34),
    new google.maps.Point(0, 0),
    new google.maps.Point(10, 34),
    new google.maps.Size(21,34));
    return markerImage;
}

function populateInfoWindow(marker, infowindow) {
  // Check to make sure the infowindow is not already opened on this marker.
  if (infowindow.marker != marker) {
    infowindow.marker = marker;
    infowindow.setContent('<h1 style="color: #' + marker.color + '">' + marker.title + '</h1>' + '<p>' + marker.location + '</p>');
    infowindow.open(map, marker);
    // Make sure the marker property is cleared if the infowindow is closed.
    infowindow.addListener('closeclick', function() {
      infowindow.setMarker(null);
    });
  }
}

function showMarkers() {
  var bounds = new google.maps.LatLngBounds();
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
    bounds.extend(markers[i].position);
  }
  map.fitBounds(bounds);
}

// Clear everything
function clearAll() {
  // Remove polylines
  for (var i = 0; i < polylines.length; ++i) {
    polylines[i].setMap(null);
  }
  polylines = [];
  
  // Remove markers
  for (var i = 0; i < markers.length; ++i) {
    markers[i].setMap(null);
  }
  markers = [];
  
  // Remove HTML
  document.getElementById('userList').innerHTML = '';
  
	// Reset Index
	index = -1;
  
  // Reset inputs
	document.getElementById('userId').value = '';
	document.getElementById('fromDate').value = '';
	document.getElementById('toDate').value = '';
	
	// Reset Map position
  initMap();
}