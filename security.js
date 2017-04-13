/* The Pub Website

Author: Fabricio Teixeira
Date:		03/05/2017

Filename: app.js

*/

/*jslint node: true */
'use strict';

// get form inputs
var online = document.getElementById("navigatorOnline"),
    platform = document.getElementById("navigatorPlatform"),
    userAgent = document.getElementById("navigatorUserAgent"),
    geolocation = document.getElementById("navigatorGeolocation"),
    width = document.getElementById("screenWidth"),
    height = document.getElementById("screenHeight"),
    // controls the time for user response on the geolocation authorization
    waitForUser;

//show user position
function showPosition(position) {
    // saves the values on variables
    // to build the map using
    // the google maps API
    var lat = position.coords.latitude,
        lng = position.coords.longitude,
        alt = position.coords.altitude,
        acc = position.coords.accuracy,
        mapOptions = {
            center: new google.maps.LatLng(lat, lng),
            zoom: 13
        },
        map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // clear timeout that waits for user response
    clearTimeout(waitForUser);

    // prints the information about the gathered position data
    geolocation.innerHTML = "<br><p>Your location:<br><small>(with an approximate accuracy of " + acc + " meters)</small><br>Latitude: " + lat +
        "&deg;<br>Longitude: " + lng + "&deg;<br>Altitude: " + alt + " meters above sea level</p>";
}

// show error if denied
function errorPosition(error) {
    // prints error message
    document.getElementById("map").innerHTML = "Unable to access your current location.";
}

// get user position if authorized
function getLocation() {
    waitForUser = setTimeout(errorPosition, 10000);
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, errorPosition);
    } else {
        geolocation.innerHTML = "<p>Location: " + "Geolocation is not supported by this browser.</p>";
    }
}

// set gathered information
online.innerHTML = "<p>Is the navigator online: " + navigator.onLine + "</p>";
platform.innerHTML = "<p>Platform: " + navigator.platform + "</p>";
userAgent.innerHTML = "<p>User agent:<br>" + navigator.userAgent + "</p>";
width.innerHTML = "<p>Width: " + screen.width + "px</p>";
height.innerHTML = "<p>Height: " + screen.height + "px</p>";
