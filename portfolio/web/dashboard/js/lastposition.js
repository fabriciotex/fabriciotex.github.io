// States
var stateArr = ['PR', 'SP', 'RJ'];

// Cities
var cityArr = [];
cityArr[2] = 'Curitiba|Ponta Grossa';
cityArr[3] = 'São Paulo|Guarulhos';
cityArr[4] = 'Rio de Janeiro';

function populateCities(stateElementId, cityElementId) {
  "use strict";
  var selectedStateIndex = document.getElementById(stateElementId).selectedIndex,
		city_arr = [];
	
  if (selectedStateIndex === 1) {
    for (var i = 0; i < cityArr.length; i++) {
      if(cityArr[i] != undefined) {
        city_arr.push(cityArr[i].split("|"));
      }
      city_arr = [].concat.apply([], city_arr);
    }
  } else {
		city_arr = cityArr[selectedStateIndex].split("|");
  }

  var cityElement = document.getElementById(cityElementId);

  cityElement.length = 0; // Fixed by Julian Woods
  cityElement.options[0] = new Option('Selecione a Cidade', '');
  cityElement.options[1] = new Option('Todas as cidades', 'Todas as cidades');
  cityElement.options[0].disabled = true;
  cityElement.selectedIndex = 0;

  for (var i = 0; i < city_arr.length; i++) {
    cityElement.options[cityElement.length] = new Option(city_arr[i], city_arr[i]);
  }
}

function populateStates(stateElementId, cityElementId) {
  var stateElement = document.getElementById(stateElementId);
  stateElement.length = 0;
  stateElement.options[0] = new Option('Selecione o Estado', '-1');
  stateElement.options[1] = new Option('Todos os estados', 'Todos os estados');
  stateElement.options[0].disabled = true;
  stateElement.selectedIndex = 0;
  for (var i = 0; i < stateArr.length; i++) {
    stateElement.options[stateElement.length] = new Option(stateArr[i], stateArr[i]);
  }

  if (cityElementId) {
      stateElement.onchange = function () {
        populateCities(stateElementId, cityElementId);
      };
  }
}
populateStates("state", "city");

// ###################################

var markers = [];

function query(loc) {
  // reset markers
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
  
  // get selected location
  var state = loc.previousSibling.previousSibling.previousSibling.previousSibling;
  state = state.options[state.selectedIndex].value;
  state = state.toLowerCase();
  loc = loc.options[loc.selectedIndex].value;
  loc = loc.toLowerCase();
  
  printLocInfo(loc, state);
  
  // loop through user db
  for (i = 0; i < user.length; i++ ) {
    // get last position index
    var lastPos = user[i].position.length -1;
    // get last user location
    var userLastLoc = user[i].position[lastPos].city;
    var userLastState = user[i].position[lastPos].state;
    // get user color code
    var userColorCode = user[i].color;
    
    // get user id
    var userId = user[i].id;
    
    // if user location == 'all cities' or location option selected
    if ((loc == 'todas as cidades' && userLastState == state || userLastLoc == loc) || (loc == 'todas as cidades' && state == 'todos os estados')) {
      var userName = user[i].name;
      var userLastCoord = user[i].position[lastPos].coord;
      var userTotalMiles = 0;
      // calculate user miles
      for (j = 0; j < user[i].position.length; j++) {
        userTotalMiles += user[i].position[j].miles;
      }
      
      // print user info
      printUser(userId, userName, userLastCoord, userTotalMiles, userColorCode, userLastLoc, userLastState);
    }
    
  }
  // Display user query
  document.getElementById('userInput').style.display = "block";
  // reset userQuery
  document.getElementById('userQuery').value = '';
  showMarkers();
  calculateTotal();
}

function printLocInfo(location, state) {
  
  location = capitalize(location);
  if (state == 'todos os estados'){
    state = capitalize(state);
  } else {
    state = state.toUpperCase();
  }
  
  // print location info
  var locationInfo = '<div class="header"><h4 class="title">' + location + ', ' + state + '</h4><label /*class="checkbox"*/><input name="toggleAll" id="toggleAll" type="checkbox" value="" data-toggle="checkbox" checked onclick="javascript:toggleAll(this)"></label><!-- .checkbox --><i class="fa fa-users"></i>&nbsp;<span id="selUsers">0</span>/<span id="totalUsers"></span><br><i class="fa fa-road"></i>&nbsp;<span id="selMiles">0</span>km/<span id="totalMiles"></span>km</div><!-- .header --><div class="content"><div class="table-full-width"><table class="table"><tbody id="userList"></tbody></table><!-- .table --></div><!-- .table-full-width --></div><!-- content -->'
  
  document.getElementById('result').innerHTML = locationInfo;
}

function printUser(id, name, coord, miles, color, location, state) {
  name = capitalize(name);
  state = state.toUpperCase();
  
  // print info on html
  var userInfo = '<tr><td><h6 class="id" style="display: none;">' + id + '</h6><h5><i class="fa fa-user"></i>&nbsp;<span>' + name + '</span></h5><p><i class="fa fa-map-marker"></i>&nbsp;' + capitalize(location) + ', ' + state + '</p><p><i class="fa fa-truck"></i>&nbsp;<span class="userMiles">' + miles + '</span>km</p></td><td><label /*class="checkbox"*/><input name="showPin" class="showPin" type="checkbox" value="" data-toggle="checkbox" checked onclick="javascript:ifSelected(this)"></label><!-- .checkbox --><br><br><br><button type="button" rel="tooltip" title="Remove" class="btn btn-danger btn-simple btn-xs" onclick="javascript:remove(this)"><i class="fa fa-times"></i></button><!-- btn btn-danger btn-simple btn-xs --></td><!-- .td-actions .text-right --></tr>';
  
  var table = document.getElementById('userList');
  var row = table.insertRow();
  row.innerHTML = userInfo;
  row.style.display = "none";
  
  // make marker on map
  makeMarker(name, coord, color, location, state);
}

function uQuery(userQuery) {
  userQuery = document.getElementById("userQuery").value;
  
  
  var li =  document.getElementsByClassName('id');
  
  // uncheck all checkboxes
  document.getElementById('toggleAll').checked = false;
  toggleAll(document.getElementById('toggleAll'));
  
  for(var i = 0; i < li.length; i++) {
    var id = li[i].innerHTML;
    var found = false;
    if(id == userQuery) {
      li[i].parentElement.parentElement.style.display = "table-row";
      
      // selected queried user checkbox
      li[i].parentElement.parentElement.getElementsByClassName('showPin')[0].checked = true;
      ifSelected(li[i].parentElement.parentElement.getElementsByClassName('showPin')[0]);
      
      found = true;
      return
    }
  }
  
  if(!found) {
    window.alert("Usuário não encontrado!");
  }
  
  
}

function calculateTotal() {
  // Total Users and Total Miles
  var totalUsers = 0;
  var totalMiles = 0;
  
  // Get list array
  var ul = document.getElementById('userList');
  var list = ul.getElementsByTagName('tr');
  
  // Loop through list items
  for (i = 0; i < list.length; i++) {
    totalUsers += 1;
    totalMiles += parseFloat(list[i].getElementsByClassName('userMiles')[0].innerHTML);
  }
  
  // Print Total Users and Total Miles
  document.getElementById('totalMiles').innerHTML = totalMiles.toFixed(1);
  document.getElementById('totalUsers').innerHTML = totalUsers;
  
  // Print Selected Users and Selected Miles
  document.getElementById('selUsers').innerHTML = totalUsers;
  document.getElementById('selMiles').innerHTML = totalMiles.toFixed(1);
}

function ifSelected(checkbox) {
  // find if it is checked
  var isChecked = checkbox.checked;
  
  // get name
  var name = checkbox.parentElement.parentElement.previousSibling.childNodes[1].lastChild.innerHTML;
  
  // get miles value
  var miles = parseFloat(  checkbox.parentElement.parentElement.previousSibling.childNodes[3].childNodes[2].innerHTML);
  
  // get users tag
  selUsers = parseInt(document.getElementById('selUsers').innerHTML);
  
  // get miles tag
  selMiles = parseFloat(document.getElementById('selMiles').innerHTML);
  
   if (isChecked) {
      selUsers += 1;
      selMiles += miles;
   } else {
     selUsers -= 1;
     selMiles -= miles;
   }
  
  // find name in markers array and toggle marker
  for(i = 0; i < markers.length; i++) {
    if (isChecked) {
      if(name == markers[i].title) {
        markers[i].setMap(map);
      }
    } else {
      if(name == markers[i].title) {
        markers[i].setMap(null);
      }
    }
  }
  
  // Print Selected Users and Selected Miles
  document.getElementById('selUsers').innerHTML = selUsers;
  document.getElementById('selMiles').innerHTML = selMiles.toFixed(1);
  
  // toggle main checkbox
  toggleMain();
}

function toggleAll(source) {
  var checkboxes = document.getElementsByClassName("showPin");
  for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = source.checked;
    //ifSelected(checkboxes[i]);
  }
  
  // loop through markers array
  for(i = 0; i < markers.length; i++) {
    if (source.checked) {
      markers[i].setMap(map);
    } else {
      markers[i].setMap(null);
    }
  }
  if(!source.checked) {
    // subtract user and user miles
    document.getElementById('selUsers').innerHTML = 0;
    document.getElementById('selMiles').innerHTML = 0;
  } else {
    calculateTotal();
  }
}

function toggleMain() {
  var checkbox = document.getElementById('toggleAll');
  var checkboxes = document.getElementsByClassName('showPin');
  var count = 0;
  for(var i = 0; i < checkboxes.length; i++) {
    if(checkboxes[i].checked) {
      count++;
    } else {
      count--;
    }
  }
  if (count == checkboxes.length) {
    checkbox.checked = true;
  } else {
    checkbox.checked = false;
  }
}

function capitalize(name) {
  // Capitalize first letter in word
  return name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

// #######################################
// Google Maps API
var map;
var largeInfoWindow;

function initMap() {
  //getLocation();
	mapConstructor(-25.4244, -49.2654);
	
	largeInfoWindow = new google.maps.InfoWindow();
}

function makeMarker(title, position, color, location, state) {
  
  var icon = makeIcon(color);
  
  // make marker
  var marker = new google.maps.Marker({
    position: position,
    icon: icon,
    title: title,
    location: capitalize(location) + ", " + state,
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
    infowindow.setContent('<h3 style="color: #' + marker.color + '">' + marker.title + '</h3>' + '<p>' + marker.location + '</p>');
    infowindow.open(map, marker);
    // Make sure the marker property is cleared if the infowindow is closed.
    infowindow.addListener('closeclick', function() {
      infowindow.marker = null;
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

function remove(source) {
  // Get index from element to be removed
  var element = source.parentElement.parentElement;
  var i = $("tr").index(element);
  
  // Remove marker
  if (i > -1) {
    markers[i].setMap(null);
  }
  
  source.parentElement.parentElement.style.display = "none";
}