/* The Pub Website

Author: Fabricio Teixeira
Date:		02/24/2017

Filename: app.js

*/

/*jslint node: true */
"use strict";

// get form inputs
var nameInput = document.getElementById("name"),
    emailInput = document.getElementById("email"),
    guestsInput = document.getElementById("guests"),
    dateInput = document.getElementById("date"),
    featuresInput = document.getElementsByName("features"),
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
    warningDate = document.getElementById("warningDate"),
    warningSubject = document.getElementById("warningSubject"),
    warningMessage = document.getElementById("warningMessage"),

    // get form fields
    guestsField = document.getElementById("guestsField"),
    subjectField = document.getElementById("subjectField"),

    // boolean value for form validity
    formValid = true,

    // create date object for dealing with calendar
    dateObj = new Date(),

    // create features array and form object and form JSON string
    features = [],
    formObj = {},
    formStr;

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
        re = /^[_\w\-]+(\.[_\w\-]+)*@[\w\-]+(\.[\w\-]+)*(\.[\D]{2,6})$/;
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

// validate date if reservation radio is checked
function validateDate() {
    var valid = true,
        warning;
    try {
        if (dateInput.value === "") {
            throw "Please enter the date of your reservation.";
        }
    } catch (message) {
        valid = false;
        warning = message;
        formValid = false;
        dateInput.focus();
    } finally {
        warningDate.style.display = "block";
        warningDate.innerHTML = warning;

        if (valid) {
            warningDate.style.display = "none";
        }
    }
}

// validate subject
function validateSubject() {
    var valid = true,
        warning;
    try {
        if (subjectInput.value === "") {
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
        validateDate();
    } else if (contactRadio.checked) {
        validateSubject();
        validateMessage();
    }

    if (formValid) {
        // add information to the form object
        formObj.name = nameInput.value;
        formObj.email = emailInput.value;
        if (reserveRadio.checked) {
            formObj.purpose = "Reservation";
            formObj.guests = guestsInput.value;
            formObj.date = dateInput.value;
            formObj.features = features.join();
        } else {
            formObj.purpose = "Contact";
            formObj.subject = subjectInput.value;
        }
        formObj.message = messageInput.value;

        // stringify the form object
        formStr = JSON.stringify(formObj);
        form.submit();
    }
}

function displayCalendar(whichMonth) {
    var date,
        dateToday = new Date(),
        dayOfWeek,
        daysInMonth,
        dateCells,
        captionValue,
        month,
        year,
        monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        i;

    if (whichMonth === -1) {
        dateObj.setMonth(dateObj.getMonth() - 1);
    } else if (whichMonth === 1) {
        dateObj.setMonth(dateObj.getMonth() + 1);
    }

    month = dateObj.getMonth();
    year = dateObj.getFullYear();
    dateObj.setDate(1);
    dayOfWeek = dateObj.getDay();
    captionValue = monthArray[month] + " " + year;
    document.getElementById("caption").innerHTML = captionValue;

    if (month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9 || month === 11) { // Jan, Mar, Jul, Aug, Oct, Dec
        daysInMonth = 31;
    } else if (month === 1) { //Feb
        if (year % 4 === 0) { // leap year test
            if (year % 100 === 0) {
                // year ending in 00 not a leap year unless
                // divisible by 400
                if (year % 400 === 0) {
                    daysInMonth = 29;
                } else {
                    daysInMonth = 28;
                }
            } else {
                daysInMonth = 29;
            }
        } else {
            daysInMonth = 28;
        }
    } else { // Apr, Jun, Sep, Nov
        daysInMonth = 30;
    }

    dateCells = document.getElementsByTagName("td");
    for (i = 0; i < dateCells.length; i += 1) {
        // clear existing table dates
        dateCells[i].innerHTML = "";
        dateCells[i].className = "";
    }

    for (i = dayOfWeek; i < daysInMonth + dayOfWeek; i += 1) {
        // add dates to days cells
        dateCells[i].innerHTML = dateObj.getDate();
        dateCells[i].className = "date";

        if (dateToday < dateObj) {
            dateCells[i].className = "futuredate";
        }

        date = dateObj.getDate() + 1;
        dateObj.setDate(date);
    }

    dateObj.setMonth(dateObj.getMonth() - 1);
    // reset month to month shown
    document.getElementById("cal").style.display = "block";
    // display calendar if it's not already visible
}

function hideCalendar() {
    document.getElementById("cal").style.display = "none";
}

// calculate elapsed date since unix epoch time
// and from present day based on input date
function calcDate() {
    var inputYear = new Date(dateInput.value).getUTCFullYear(),
        inputMonth = new Date(dateInput.value).getUTCMonth(),
        inputDay = new Date(dateInput.value).getUTCDate(),
        epochYear = 1970,
        epochMonth = 0,
        epochDay = 1,
        currentYear = new Date().getFullYear(),
        currentMonth = new Date().getMonth(),
        currentDay = new Date().getDate(),
        years,
        months,
        days,
        dateString,
        isLeap = false;

    // calculations based on epoch date
    // get elapsed years from the input date
    years = inputYear - epochYear;
    // get elapsed months from the input date
    months = inputMonth - epochMonth;
    // get elapsed days from the input date
    days = inputDay - epochDay;

    // start the string to print
    dateString = "Your event is going to take place ";

    // set the values to the string to print to the user
    if (months === 0 && days === 0) {
        dateString += "exactly " + years + " years";
    } else if (months === 0) {
        dateString += years + " years and ";
        if (days > 1) {
            dateString += days + " days";
        } else {
            dateString += days + " day";
        }
    } else if (days === 0) {
        dateString += years + " years and ";
        if (months > 1) {
            dateString += months + " months";
        } else {
            dateString += months + " month";
        }
    } else {
        dateString += years + " years, ";
        if (months > 1) {
            dateString += months + " months";
        } else {
            dateString += months + " month";
        }
        dateString += ", and ";
        if (days > 1) {
            dateString += days + " days";
        } else {
            dateString += days + " day";
        }
    }

    dateString += " after Unix epoch time (1/1/1970) and in ";

    // calculations based on current date
    // get elapsed years from the input date
    years = inputYear - currentYear;
    // get elapsed months from the input date
    months = inputMonth - currentMonth;
    // get elapsed days from the input date
    days = inputDay - currentDay;

    // check if input year is a leap year
    if (inputYear % 4 === 0) {
        if (inputYear % 100 === 0) {
            if (inputYear % 400 === 0) {
                isLeap = true;
            }
        } else {
            isLeap = true;
        }
    }

    // check if days is negative
    if (days < 0) {
        if (currentMonth === 1 && isLeap) {
            days += 29;
        } else if (currentMonth === 1 && !isLeap) {
            days += 28;
        } else if (currentMonth === 3 || currentMonth === 5 || currentMonth === 8 || currentMonth === 10) {
            days += 30;
        } else {
            days += 31;
        }
        months -= 1;
    }

    // check if months is negative
    if (months < 0) {
        months += 12;
        years -= 1;
    }

    // set values to string to print to the user
    // format string to print years
    if (years > 1) {
        if (months === 0 && days === 0) {
            dateString += "exactly ";
        }
        dateString += years + " years";
    } else if (years > 0) {
        if (months === 0 && days === 0) {
            dateString += "exactly ";
        }
        dateString += years + " year";
    }

    // format string to print
    if (years > 0 && months > 0 && days > 0) {
        dateString += ", ";
    } else if (years > 0 && months > 0) {
        dateString += " and ";
    }

    // format string to print months
    if (months > 1) {
        if (years === 0 && days === 0) {
            dateString += "exactly ";
        }
        dateString += months + " months";
    } else if (months > 0) {
        if (years === 0 && days === 0) {
            dateString += "exactly ";
        }
        dateString += months + " month";
    }

    // format string to print
    if (months > 0 && days > 0) {
        dateString += " and ";
    }

    // format string to print days
    if (days > 1) {
        if (years === 0 && months === 0) {
            dateString += "exactly ";
        }
        dateString += days + " days";
    } else if (days > 0) {
        if (years === 0 && months === 0) {
            dateString += "exactly ";
        }
        dateString += days + " day";
    }

    // if event is the same day, format stirng to print
    if (years === 0 && months === 0 && days === 0) {
        dateString = dateString.slice(0, dateString.length - 3);
        dateString += "tonight!";
    } else {
        dateString += " from now!";
    }

    // print the string and show it to the user
    warningDate.innerHTML = dateString;
    warningDate.style.display = "block";
}

function selectDate(event) {
    var callerElement,
        fullDateToday,
        dateToday,
        selectedDate;

    if (event === undefined) { // get caller element in IE8
        event = window.event;
    }

    callerElement = event.target || event.srcElement;

    if (callerElement.innerHTML === "") {
        // cell contains no date, so don't close the calendar
        document.getElementById("cal").style.display = "block";
        return false;
    }

    dateObj.setDate(callerElement.innerHTML);

    fullDateToday = new Date();
    dateToday = Date.UTC(fullDateToday.getFullYear(), fullDateToday.getMonth(), fullDateToday.getDate());
    selectedDate = Date.UTC(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());

    if (selectedDate <= dateToday) {
        document.getElementById("cal").style.display = "block";
        return false;
    }

    dateInput.value = dateObj.toLocaleDateString();

    hideCalendar();
    calcDate();
}

function prevMo() {
    displayCalendar(-1);
}

function nextMo() {
    displayCalendar(1);
}

// save the features into an array
function saveFeatures(evt) {
    if (evt === undefined) { // get caller element in IE8
        evt = window.event;
    }
    var caller = evt.target || evt.srcElement,
        feature = caller.value,
        i;

    if (caller.checked) { // if checkbox checked
        // add features to the feature array;
        features.push(feature);
    } else { // if unchecked
        for (i = 0; i < features.length; i += 1) {
            if (features[i] === feature) {
                features.splice(i, 1);
            }
        }
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

    // display calendar
    if (document.addEventListener) {
        dateInput.addEventListener("click", displayCalendar, false);
    } else if (document.attachEvent) {
        dateInput.attachEvent("onclick", displayCalendar);
    }

    // calendar elements
    var dateCells = document.getElementsByTagName("td"),
        i,
        closeBtn = document.getElementById("close"),
        prevLink = document.getElementById("prev"),
        nextLink = document.getElementById("next");

    // select date on calendar
    if (document.addEventListener) {
        for (i = 0; i < dateCells.length; i += 1) {
            dateCells[i].addEventListener("click", selectDate, false);
        }
    } else if (document.attachEvent) {
        for (i = 0; i < dateCells.length; i += 1) {
            dateCells[i].attachEvent("onclick", selectDate);
        }
    }

    // hide calendar
    if (document.addEventListener) {
        closeBtn.addEventListener("click", hideCalendar, false);
    } else if (document.attachEvent) {
        closeBtn.attachEvent("onclick", hideCalendar);
    }

    // change month on calendar
    if (document.addEventListener) {
        prevLink.addEventListener("click", prevMo, false);
        nextLink.addEventListener("click", nextMo, false);
    } else if (document.attachEvent) {
        prevLink.attachEvent("onclick", prevMo);
        nextLink.attachEvent("onclick", nextMo);
    }

    // get date change event
    if (document.addEventListener) {
        dateInput.addEventListener("change", calcDate, false);
    } else if (document.attachEvent) {
        dateInput.attachEvent("onchange", calcDate);
    }

    // get checkbox change event
    if (document.addEventListener) {
        for (i = 0; i < featuresInput.length; i += 1) {
            featuresInput[i].addEventListener("change", saveFeatures, false);
        }
    } else if (document.attachEvent) {
        for (i = 0; i < featuresInput.length; i += 1) {
            featuresInput[i].attachEvent("onchange", saveFeatures);
        }
    }
}

// sets all form field values to defaults
function resetForm() {
    nameInput.value = "";
    emailInput.value = "";
    guestsInput.value = 0;
    subjectInput.value = "";
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
