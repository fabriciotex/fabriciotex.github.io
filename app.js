/* The Pub Website

Author: Fabricio Teixeira
Date:		02/08/2017

Filename: app.js

*/


// warning about number of tables reserved
var warning = document.getElementById("numTables");

function calcTables() {
	var guests = document.getElementById("guests").value;

	var tables;

	// calculate number of tables according to number of guests
	// each table can comport up to 4 people
	tables = Math.floor(guests / 4);

	// if the there is a remainder on the division of the guests on places add another table
	(guests % 4 > 0) ? tables++ : false;

	(tables != 1) ? warning.innerHTML = tables + " tables will be reserved.": warning.innerHTML = tables + " table will be reserved.";

	(tables == 0) ? warning.style.display = "none": warning.style.display = "inherit";

}

// sets all form field values to defaults
function resetForm() {
	document.getElementById("name").value = "";
	document.getElementById("email").value = "";
	document.getElementById("guests").value = 0;
	document.getElementById("message").value = "";
	document.getElementById("guestsField").style.display = "none";
	document.getElementById("subjectField").style.display = "none";
	calcTables();
	createEventListeners();
	checkPurpose();
}

// create event listeners
function createEventListeners() {
	if (document.addEventListener) {
		document.getElementById("guests").addEventListener("change", calcTables, false);
	} else if (document.attachEvent) {
		document.getElementById("guests").attachEvent("onchange", calcTables);
	}
}

// resets form inputs
if (document.addEventListener) {
	window.addEventListener("load", resetForm, false);
} else if (document.attachEvent) {
	window.attachEvent("onload", resetForm);
}

// checks purpose of the form
function checkPurpose() {
	if (reserve.checked) {
		// if reservationRadio is selected show only the fields that deal with reservation information
		document.getElementById("guestsField").style.display = "block";
		document.getElementById("subjectField").style.display = "none";
		document.getElementById("subject").value = "Reservation";
	} else if (contact.checked) {
		// if contactRadio is selected show only the fields that deal with contact information
		document.getElementById("guestsField").style.display = "none";
		document.getElementById("subjectField").style.display = "block";
		document.getElementById("subject").value = "";
	}
}

// get radio buttons
var reserve = document.getElementById("reservationRadio");
var contact = document.getElementById("contactRadio");

// check form purpose for reservationRadio
if (document.addEventListener) {
	reserve.addEventListener("change", checkPurpose, false);
} else if (document.attachEvent) {
	reserve.attachEvent("onchange", checkPurpose);
}

// check form purpose for contactRadio
if (document.addEventListener) {
	contact.addEventListener("change", checkPurpose, false);
} else if (document.attachEvent) {
	contact.attachEvent("onchange", checkPurpose);
}