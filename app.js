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
    form = document.getElementsByTagName("form")[0],

    // get radio buttons
    reserveRadio = document.getElementById("reservationRadio"),
    contactRadio = document.getElementById("contactRadio"),

    // get form warnings
    warningName = document.getElementById("warningName"),
    warningEmail = document.getElementById("warningEmail"),
    warningPurpose = document.getElementById("warningPurpose"),
    warningGuests = document.getElementById("warningGuests"),
    warningSubject = document.getElementById("warningSubject"),
    warningMessage = document.getElementById("warningMessage"),

    // get form fields
    guestsField = document.getElementById("guestsField"),
    subjectField = document.getElementById("subjectField"),

    // boolean value for form validity
    formValid = true;

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

    if (numTables > 0) {
        if (numTables !== 1) {
            warningGuests.innerHTML = numTables + " tables will be reserved.";
        } else {
            warningGuests.innerHTML = numTables + " table will be reserved.";
        }
        warningGuests.style.display = "inherit";
    } else {
        warningGuests.style.display = "none";
    }
}

// checks purpose of the form
function checkPurpose() {
    // get the message label to change if necessary
    var messageLabel = document.getElementsByTagName("label")[document.getElementsByTagName("label").length - 1];

    if (reserveRadio.checked) {
        // if reservationRadio is selected show only the fields that deal with reservation information
        guestsField.style.display = "block";
        subjectField.style.display = "none";
        messageLabel.innerHTML = "Message";
    } else if (contactRadio.checked) {
        // if contactRadio is selected show only the fields that deal with contact information
        guestsField.style.display = "none";
        guestsInput.value = 0;
        warningGuests.style.display = "none";
        subjectField.style.display = "block";
        messageLabel.innerHTML = "Message<sup>*</sup>";
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
        formValid = false;
        nameInput.focus();
    } finally {
        warningName.style.display = "block";
        warningName.innerHTML = warning;

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
        formValid = false;
        emailInput.focus();
    } finally {
        warningEmail.style.display = "block";
        warningEmail.innerHTML = warning;
        if (valid) {
            warningEmail.style.display = "none";
        }
    }
}

// validate purpose radio buttons
function validatePurpose() {
    var valid = true,
        warning;
    try {
        if (!reserveRadio.checked && !contactRadio.checked) {
            throw "Please select an option.";
        }
    } catch (message) {
        valid = false;
        warning = message;
        formValid = false;
        reserveRadio.focus();
    } finally {
        warningPurpose.style.display = "block";
        warningPurpose.innerHTML = warning;
        if (valid) {
            warningPurpose.style.display = "none";
        }
    }
}

// validate number of guests if reservation radio is checked
function validateNumberGuests() {
    var valid = true,
        warning;
    try {
        if (guestsInput.value === "" || !isNaN(guestsInput) || guestsInput.value < 0) {
            throw "Please enter the desired number of guests.";
        }
    } catch (message) {
        valid = false;
        warning = message;
        formValid = false;
        nameInput.focus();
    } finally {
        warningGuests.style.display = "block";
        warningGuests.innerHTML = warning;

        if (valid) {
            warningGuests.style.display = "none";
        }
    }
}

// validate subject
function validateSubject() {
    var valid = true,
        warning;
    try {
        if (subjectInput.length === 0) {
            throw "Please enter a subject for your message.";
        }
    } catch (message) {
        valid = false;
        warning = message;
        formValid = false;
        nameInput.focus();
    } finally {
        warningSubject.style.display = "block";
        warningSubject.innerHTML = warning;

        if (valid) {
            warningSubject.style.display = "none";
        }
    }
}

// validate message input
function validateMessage() {
    var valid = true,
        warning;
    try {
        if (messageInput.value === "" || messageInput.value === messageInput.placeholder) {
            throw "Please enter a message.";
        }
    } catch (message) {
        valid = false;
        warning = message;
        formValid = false;
        messageInput.focus();
    } finally {
        warningMessage.style.display = "block";
        warningMessage.innerHTML = warning;

        if (valid) {
            warningMessage.style.display = "none";
        }
    }
}

// validate required input fields
function validate(evt) {
    if (evt.preventDefault) {
        evt.preventDefault(); // prevent form from submitting
    } else {
        evt.returnValue = false; // prevent form from submitting in IE8
    }
    formValid = true;

    validateName();
    validateEmail();
    validatePurpose();
    if (reserveRadio.checked) {
        validateNumberGuests();
    } else if (contactRadio.checked) {
        validateSubject();
        validateMessage();
    }


    if (formValid) {
        form.submit();
    }
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

    // get submit event from form
    if (document.addEventListener) {
        form.addEventListener("submit", validate, false);
    } else if (document.attachEvent) {
        form.attachEvent("onsubmit", validate);
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
