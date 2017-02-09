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
	calcTables();
	createEventListeners();
}

// create event listeners
function createEventListeners() {
	document.getElementById("guests").addEventListener("change", calcTables, false);
}

// resets form inputs
window.addEventListener("load", resetForm, false);