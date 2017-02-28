/* The Pub Website

Author: Fabricio Teixeira
Date:		02/24/2017

Filename: app.js

*/

/*jslint node: true */
'use strict';

// get form inputs
var nameInput = document.getElementById("name"),
	emailInput = document.getElementById("email"),
	guestsInput = document.getElementById("guests"),
	subjectInput = document.getElementById("subject"),
	messageInput = document.getElementById("message"),
	submitButton = document.getElementById("submit"),

	// get radio buttons
	reserveRadio = document.getElementById("reservationRadio"),
	contactRadio = document.getElementById("contactRadio"),

	// get form warnings
	warningName = document.getElementById("warningName"),
	warningEmail = document.getElementById("warningEmail"),
	warningGuests = document.getElementById("numTables"),

	// get form fields
	guestsField = document.getElementById("guestsField"),
	subjectField = document.getElementById("subjectField");

// calculate number of tables necessary depending on number og guests
function calcTables() {
	var numGuests = guestsInput.value,
		numTables;

	// calculate number of tables according to number of guests
	// each table can comport up to 4 people
	numTables = Math.floor(numGuests / 4);

	// if the there is a remainder on the division of the guests on places add another table
	if (numGuests % 4 > 0) {
		numTables += 1;
	}

	if (numTables !== 1) {
		warningGuests.innerHTML = numTables + " tables will be reserved.";
	} else {
		warningGuests.innerHTML = numTables + " table will be reserved.";
	}

	if (numTables === 0) {
		warningGuests.style.display = "none";
	} else {
		warningGuests.style.display = "inherit";
	}
}

// checks purpose of the form
function checkPurpose() {
	if (reserveRadio.checked) {
		// if reservationRadio is selected show only the fields that deal with reservation information
		guestsField.style.display = "block";
		subjectField.style.display = "none";
		subjectInput.value = "Reservation";
	} else if (contactRadio.checked) {
		// if contactRadio is selected show only the fields that deal with contact information
		guestsField.style.display = "none";
		guestsInput.value = 0;
		warningGuests.style.display = "none";
		subjectField.style.display = "block";
		subjectInput.value = "";
	}
}

// validate name input
function validateName() {
	var valid = true,
		warning;
	try {
		if (nameInput.value === "") {
			throw "Please enter a name.";
		}
	} catch (message) {
		valid = false;
		warning = message;
	} finally {
		warningName.style.display = "block";
		warningName.innerHTML = warning;
		nameInput.focus();
		if (valid) {
			warningName.style.display = "none";
		}
	}
}

// validate email input
function validateEmail() {
	var valid = true,
		warning,
		re = /\S+@\S+\.\S+/;
	try {
		if (!re.test(emailInput.value)) {
			throw "Please enter a valid email.";
		}
	} catch (message) {
		valid = false;
		warning = message;
	} finally {
		warningEmail.style.display = "block";
		warningEmail.innerHTML = warning;
		emailInput.focus();
		if (valid) {
			warningEmail.style.display = "none";
		}
	}
}

function validateMessage() {
	var valid = true,
		warning;
	try {
		if (messageInput.value === "") {
			throw "Are you sure you are sending an empty message?";
		}
	} catch (message) {
		valid = false;
		warning = message;
	} finally {
		valid = confirm(warning);
		if (!valid) {
			messageInput.focus();
		}
	}
}

// validate required input fields
function validate() {
	validateName();
	validateEmail();
	validateMessage();
}

// create event listeners
function createEventListeners() {

	// check form purpose for reservationRadio
	if (document.addEventListener) {
		reserveRadio.addEventListener("change", checkPurpose, false);
	} else if (document.attachEvent) {
		reserveRadio.attachEvent("onchange", checkPurpose);
	}

	// check form purpose for contactRadio
	if (document.addEventListener) {
		contactRadio.addEventListener("change", checkPurpose, false);
	} else if (document.attachEvent) {
		contactRadio.attachEvent("onchange", checkPurpose);
	}

	// get number of guests input
	if (document.addEventListener) {
		guestsInput.addEventListener("change", calcTables, false);
	} else if (document.attachEvent) {
		guestsInput.attachEvent("onchange", calcTables);
	}

	// get submit button object click event
	if (document.addEventListener) {
		submitButton.addEventListener("click", validate, false);
	} else if (document.attachEvent) {
		submitButton.attachEvent("onclick", validate);
	}
}

// sets all form field values to defaults
function resetForm() {
	nameInput.value = "";
	emailInput.value = "";
	guestsInput.value = 0;
	subjectInput = "";
	messageInput.value = "";
	guestsField.style.display = "none";
	subjectField.style.display = "none";
	calcTables();
	createEventListeners();
	checkPurpose();
}

// resets form inputs
if (document.addEventListener) {
	window.addEventListener("load", resetForm, false);
} else if (document.attachEvent) {
	window.attachEvent("onload", resetForm);
}