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
	height = document.getElementById("screenHeight");

//show user position
function showPosition(position) {
	geolocation.innerHTML = "<p>Location:<br>Latitude: " + position.coords.latitude +
		"<br>Longitude: " + position.coords.longitude + "</p>";
}

// show error if denied
function errorPosition(error) {
	if (error.code === error.PERMISSION_DENIED) {
		geolocation.innerHTML = "<p>Location gathering denied</p>";
	}
}

// get user position if authorized
function getLocation() {
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
getLocation();
width.innerHTML = "<p>Width: " + screen.width + "px</p>";
height.innerHTML = "<p>Height: " + screen.height + "px</p>";