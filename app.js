/* The Pub Website

Author: Fabricio Teixeira
Date:		04/24/2017

Filename: app.js

*/

/*jslint node: true */
"use strict";

// get form inputs
var nameInput = $("#name"), //document.getElementById("name"),
    emailInput = $("#email"), //document.getElementById("email"),
    guestsInput = $("#guests"), //document.getElementById("guests"),
    dateInput = $("#date"), //document.getElementById("date"),
    featuresInput = $('[name="fetures"]'), //document.getElementsByName("features"),
    subjectInput = $("#subject"), //document.getElementById("subject"),
    messageInput = $("#message"), //document.getElementById("message"),
    form = $("form"), //document.getElementsByTagName("form")[0],

    // get radio buttons
    reserveRadio = $("#reservationRadio"), //document.getElementById("reservationRadio"),
    contactRadio = $("#contactRadio"), //document.getElementById("contactRadio"),

    // get form warnings
    warningName = $("#warningName"), //document.getElementById("warningName"),
    warningEmail = $("#warningEmail"), //document.getElementById("warningEmail"),
    warningPurpose = $("#warningPurpose"), //document.getElementById("warningPurpose"),
    warningGuests = $("#warningGuests"), //document.getElementById("warningGuests"),
    warningDate = $("#warningDate"), //document.getElementById("warningDate"),
    warningSubject = $("#warningSubject"), //document.getElementById("warningSubject"),
    warningMessage = $("#warningMessage"), //document.getElementById("warningMessage"),

    // get form fields
    guestsField = $("#guestsField"), //document.getElementById("guestsField"),
    subjectField = $("#subjectField"), //document.getElementById("subjectField"),

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
    var numGuests = guestsInput.val(), //guestsInput.value,
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
            warningGuests.html(numTables + " tables will be reserved.");
            // warningGuests.innerHTML = numTables + " tables will be reserved.";
        } else {
            warningGuests.html(numTables + " table will be reserved.");
            // warningGuests.innerHTML = numTables + " table will be reserved.";
        }
        warningGuests.show();
        // warningGuests.style.display = "inherit";
    } else {
        warningGuests.hide();
        // warningGuests.style.display = "none";
    }
}

// checks purpose of the form
function checkPurpose() {
    // get the message label to change if necessary
    var messageLabel = $("label").eq($("label").length - 1); //document.getElementsByTagName("label")[document.getElementsByTagName("label").length - 1];

    if (reserveRadio.is(":checked")) {
        // if (reserveRadio.checked) {
        // if reservationRadio is selected show only the fields that deal with reservation information
        guestsField.show();
        subjectField.hide();
        messageLabel.html("Message");
        // guestsField.style.display = "block";
        // subjectField.style.display = "none";
        // messageLabel.innerHTML = "Message";
    } else if (contactRadio.is(":checked")) {
        // } else if (contactRadio.checked) {
        // if contactRadio is selected show only the fields that deal with contact information
        guestsField.hide();
        // guestsField.style.display = "none";
        guestsInput.val(0);
        // guestsInput.value = 0;
        warningGuests.hide();
        subjectField.show();
        messageLabel.html("Message<sup>*</sup>");
        // warningGuests.style.display = "none";
        // subjectField.style.display = "block";
        messageLabel.innerHTML = "Message<sup>*</sup>";
    }
}

// validate name input
function validateName() {
    var valid = true,
        warning,
        re = /\W+/;
    try {
        if (nameInput.val() === "") {
            // if (nameInput.value === "") {
            throw "Please enter a name.";
        }
        if (!re.test(nameInput.val())) {
            // if (!re.test(nameInput.value)) {
            throw "Invalid name. Try again."
        }
    } catch (message) {
        valid = false;
        warning = message;
        formValid = false;
        nameInput.focus();
    } finally {
        warningName.show();
        warningName.html(warning);
        // warningName.style.display = "block";
        // warningName.innerHTML = warning;

        if (valid) {
            warningName.hide();
            // warningName.style.display = "none";
        }
    }
}

// call API to validate email
function emailAPI() {
    var email = emailInput.val(), // emailInput.value,
        url = "https://apilayer.net/api/check?access_key=35140794d1f33c09d1707aa8f4e16a8b&email=" + email + "&smtp=1&callback=validateEmail",
        script = document.createElement("script");

    // create script element to access API
    script.id = "jsonp";
    script.src = url;
    document.body.appendChild(script);
}

// validate email input
function validateEmail(obj) {
    // new validation based on API
    var valid = true,
        warning;

    try {
        // check if email has a valid format
        if (!obj.format_valid || !obj.mx_found) {
            throw "Please enter a valid email.";
        }

        // check if email is not disposable
        if (obj.disposable) {
            throw "We need your real email to contact you.";
        }
    } catch (message) {
        valid = false;
        warning = message;
        formValid = false;
        emailInput.focus();
    } finally {
        warningEmail.show();
        warningEmail.html(warning);
        // warningEmail.style.display = "block";
        // warningEmail.innerHTML = warning;
        if (valid && obj.did_you_mean !== "") {
            warningEmail.css("background-color", "#2ecc71");
            warningEmail.css("color", "#f1f1f1");
            warningEmail.html("Did you mean: " + obj.did_you_mean + "?");
            // warningEmail.style.backgroundColor = "#2ecc71";
            // warningEmail.style.color = "#f1f1f1";
            // warningEmail.innerHTML = "Did you mean: " + obj.did_you_mean + "?";
        } else if (valid) {
            warningEmail.hide();
            warningEmail.style.display = "none";
        }
        $("#jsonp").remove();
        // var script = document.getElementById("jsonp");
        // script.parentNode.removeChild(script);
    }

    // old validation based on regex
    // var valid = true,
    //     warning,
    //     re = /^[_\w\-]+(\.[_\w\-]+)*@[\w\-]+(\.[\w\-]+)*(\.[\D]{2,6})$/;

    // try {
    //     if (!re.test(emailInput.value)) {
    //         throw "Please enter a valid email.";
    //     }
    // } catch (message) {
    //     valid = false;
    //     warning = message;
    //     formValid = false;
    //     emailInput.focus();
    // } finally {
    //     warningEmail.style.display = "block";
    //     warningEmail.innerHTML = warning;
    //     if (valid) {
    //         warningEmail.style.display = "none";
    //     }
    // }
}

// validate purpose radio buttons
function validatePurpose() {
    var valid = true,
        warning;
    try {
        if (!reserveRadio.is(":checked") && !contactRadio.is(":checked")) {
            // if (!reserveRadio.checked && !contactRadio.checked) {
            throw "Please select an option.";
        }
    } catch (message) {
        valid = false;
        warning = message;
        formValid = false;
        reserveRadio.focus();
    } finally {
        warningPurpose.show();
        warningPurpose.html(warning);
        // warningPurpose.style.display = "block";
        // warningPurpose.innerHTML = warning;
        if (valid) {
            warningPurpose.hide();
            // warningPurpose.style.display = "none";
        }
    }
}

// validate number of guests if reservation radio is checked
function validateNumberGuests() {
    var valid = true,
        warning;
    try {
        if (guestsInput.val() === "" || !isNaN(guestsInput) || guestsInput.val() < 0) {
            // if (guestsInput.value === "" || !isNaN(guestsInput) || guestsInput.value < 0) {
            throw "Please enter the desired number of guests.";
        }

        if (guestsInput.val() > 20) {
            // if (guestsInput.value > 20) {
            throw "Please send a message about special reservation.";
        }
    } catch (message) {
        valid = false;
        warning = message;
        formValid = false;
        nameInput.focus();
    } finally {
        warningGuests.show();
        warningGuests.html(warning);
        // warningGuests.style.display = "block";
        // warningGuests.innerHTML = warning;

        if (valid) {
            warningGuests.hide();
            // warningGuests.style.display = "none";
        }
    }
}

// validate date if reservation radio is checked
function validateDate() {
    var valid = true,
        warning,
        re = /(0?[1-9]|1[012])[- \/.](0?[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/;
    try {
        if (dateInput.val() === "") {
            // if (dateInput.value === "") {
            throw "Please enter the date of your reservation.";
        }

        if (!re.test(dateInput.val())) {
            // if (!re.test(dateInput.value)) {
            throw "Invalid date format. Try again.";
        }

        var fDate = new Date(dateInput.val()), //new Date(dateInput.value),
            cDate = new Date();
        if (fDate < cDate) {
            throw "Date should be on the future.";
        }
    } catch (message) {
        valid = false;
        warning = message;
        formValid = false;
        dateInput.focus();
    } finally {
        warningDate.show();
        warningDate.html(warning);
        // warningDate.style.display = "block";
        // warningDate.innerHTML = warning;

        if (valid) {
            warningDate.hide();
            // warningDate.style.display = "none";
        }
    }
}

// validate subject
function validateSubject() {
    var valid = true,
        warning,
        re = /\W/;
    try {
        if (subjectInput.val() === "") {
            // if (subjectInput.value === "") {
            throw "Please enter a subject for your message.";
        }

        if (re.test(subjectInput.val())) {
            // if (re.test(subjectInput.value)) {
            throw "Invalid subject.";
        }
    } catch (message) {
        valid = false;
        warning = message;
        formValid = false;
        nameInput.focus();
    } finally {
        warningSubject.show();
        warningSubject.html(warning);
        // warningSubject.style.display = "block";
        // warningSubject.innerHTML = warning;

        if (valid) {
            warningSubject.hide();
            // warningSubject.style.display = "none";
        }
    }
}

// validate message input
function validateMessage() {
    var valid = true,
        warning,
        re = /[\w\-\.\,\!\?\n]+/
    try {
        if (messageInput.val() === "" || messageInput.val() === messageInput.placeholder) {
            // if (messageInput.value === "" || messageInput.value === messageInput.placeholder) {
            throw "Please enter a message.";
        }

        if (!re.test(messageInput.val())) {
            // if (!re.test(messageInput.value)) {
            throw "Invalid message.";
        }
    } catch (message) {
        valid = false;
        warning = message;
        formValid = false;
        messageInput.focus();
    } finally {
        warningMessage.show();
        warningMessage.html(warning);
        // warningMessage.style.display = "block";
        // warningMessage.innerHTML = warning;

        if (valid) {
            warningMessage.hide();
            // warningMessage.style.display = "none";
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
    emailAPI();
    validatePurpose();
    if (reserveRadio.is(":checked")) {
        // if (reserveRadio.checked) {
        validateNumberGuests();
        validateDate();
    } else if (contactRadio.is(":checked")) {
        // } else if (contactRadio.checked) {
        validateSubject();
        validateMessage();
    }

    if (formValid) {
        // add information to the form object
        formObj.name = nameInput.val();
        formObj.email = emailInput.val();
        // formObj.name = nameInput.value;
        // formObj.email = emailInput.value;
        if (reserveRadio.is(":checked")) {
            // if (reserveRadio.checked) {
            formObj.purpose = "Reservation";
            formObj.guests = guestsInput.val();
            formObj.date = dateInput.val();
            // formObj.guests = guestsInput.value;
            // formObj.date = dateInput.value;
            formObj.features = features.join();
        } else {
            formObj.purpose = "Contact";
            formObj.subject = subjectInput.val();
            // formObj.subject = subjectInput.value;
        }
        formObj.message = messageInput.val();
        // formObj.message = messageInput.value;

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

    dateCells = $("td"); //document.getElementsByTagName("td");
    for (i = 0; i < dateCells.length; i += 1) {
        // clear existing table dates
        dateCells.eq(i).html("");
        dateCells.eq(i).attr("class", "");
        // dateCells[i].innerHTML = "";
        // dateCells[i].className = "";
    }

    for (i = dayOfWeek; i < daysInMonth + dayOfWeek; i += 1) {
        // add dates to days cells
        dateCells.eq(i).html(dateObj.getDate());
        dateCells.eq(i).addClass("date");
        // dateCells[i].innerHTML = dateObj.getDate();
        // dateCells[i].className = "date";

        if (dateToday < dateObj) {
            dateCells.eq(i).toggleClass("futuredate");
            // dateCells[i].className = "futuredate";
        }

        date = dateObj.getDate() + 1;
        dateObj.setDate(date);
    }

    dateObj.setMonth(dateObj.getMonth() - 1);
    // reset month to month shown
    $("#cal").show();
    // document.getElementById("cal").style.display = "block";
    // display calendar if it's not already visible
}

function hideCalendar() {
    $("#cal").hide();
    // document.getElementById("cal").style.display = "none";
}

// calculate elapsed date since unix epoch time
// and from present day based on input date
function calcDate() {
    var inputYear = new Date(dateInput.val()).getUTCFullYear(),
        inputMonth = new Date(dateInput.val()).getUTCMonth(),
        inputDay = new Date(dateInput.val()).getUTCDate(),
        // var inputYear = new Date(dateInput.value).getUTCFullYear(),
        //     inputMonth = new Date(dateInput.value).getUTCMonth(),
        //     inputDay = new Date(dateInput.value).getUTCDate(),
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
    warningDate.html(dateString);
    warningDate.show();
    // warningDate.innerHTML = dateString;
    // warningDate.style.display = "block";
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
        // if (callerElement.innerHTML === "") {
        // cell contains no date, so don't close the calendar
        $("#cal").show();
        // document.getElementById("cal").style.display = "block";
        return false;
    }

    dateObj.setDate(callerElement.innerHTML);

    fullDateToday = new Date();
    dateToday = Date.UTC(fullDateToday.getFullYear(), fullDateToday.getMonth(), fullDateToday.getDate());
    selectedDate = Date.UTC(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());

    if (selectedDate <= dateToday) {
        $("#cal").show();
        // document.getElementById("cal").style.display = "block";
        return false;
    }

    dateInput.val(dateObj.toLocaleDateString());
    // dateInput.value = dateObj.toLocaleDateString();

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
    reserveRadio.change(checkPurpose);
    // if (document.addEventListener) {
    //     reserveRadio.addEventListener("change", checkPurpose, false);
    // } else if (document.attachEvent) {
    //     reserveRadio.attachEvent("onchange", checkPurpose);
    // }

    // check form purpose for contactRadio
    contactRadio.change(checkPurpose);
    // if (document.addEventListener) {
    //     contactRadio.addEventListener("change", checkPurpose, false);
    // } else if (document.attachEvent) {
    //     contactRadio.attachEvent("onchange", checkPurpose);
    // }

    // get number of guests input
    guestsInput.change(calcTables);
    // if (document.addEventListener) {
    //     guestsInput.addEventListener("change", calcTables, false);
    // } else if (document.attachEvent) {
    //     guestsInput.attachEvent("onchange", calcTables);
    // }

    // get submit event from form
    form.submit(validate);
    // if (document.addEventListener) {
    //     form.addEventListener("submit", validate, false);
    // } else if (document.attachEvent) {
    //     form.attachEvent("onsubmit", validate);
    // }

    // display calendar
    dateInput.click(displayCalendar);
    // if (document.addEventListener) {
    //     dateInput.addEventListener("click", displayCalendar, false);
    // } else if (document.attachEvent) {
    //     dateInput.attachEvent("onclick", displayCalendar);
    // }

    // calendar elements
    var dateCells = $("td"), //document.getElementsByTagName("td"),
        i,
        closeBtn = $("#close"), //document.getElementById("close"),
        prevLink = $("#prev"), //document.getElementById("prev"),
        nextLink = $("#next"); //document.getElementById("next");

    // select date on calendar
    for (i = 0; i < dateCells.length; i += 1) {
        dateCells.eq(i).click(selectDate);
    }
    // if (document.addEventListener) {
    //     for (i = 0; i < dateCells.length; i += 1) {
    //         dateCells[i].addEventListener("click", selectDate, false);
    //     }
    // } else if (document.attachEvent) {
    //     for (i = 0; i < dateCells.length; i += 1) {
    //         dateCells[i].attachEvent("onclick", selectDate);
    //     }
    // }

    // hide calendar
    closeBtn.click(hideCalendar);
    // if (document.addEventListener) {
    //     closeBtn.addEventListener("click", hideCalendar, false);
    // } else if (document.attachEvent) {
    //     closeBtn.attachEvent("onclick", hideCalendar);
    // }

    // change month on calendar
    prevLink.click(prevMo);
    nextLink.click(nextMo);
    // if (document.addEventListener) {
    //     prevLink.addEventListener("click", prevMo, false);
    //     nextLink.addEventListener("click", nextMo, false);
    // } else if (document.attachEvent) {
    //     prevLink.attachEvent("onclick", prevMo);
    //     nextLink.attachEvent("onclick", nextMo);
    // }

    // get date change event
    dateInput.change(calcDate);
    // if (document.addEventListener) {
    //     dateInput.addEventListener("change", calcDate, false);
    // } else if (document.attachEvent) {
    //     dateInput.attachEvent("onchange", calcDate);
    // }

    // get checkbox change event
    for (i = 0; i < featuresInput.length; i += 1) {
        featuresInput[i].change(saveFeatures);
    }
    // if (document.addEventListener) {
    //     for (i = 0; i < featuresInput.length; i += 1) {
    //         featuresInput[i].addEventListener("change", saveFeatures, false);
    //     }
    // } else if (document.attachEvent) {
    //     for (i = 0; i < featuresInput.length; i += 1) {
    //         featuresInput[i].attachEvent("onchange", saveFeatures);
    //     }
    // }
}

// sets all form field values to defaults
function resetForm() {
    nameInput.val("");
    emailInput.val("");
    guestsInput.val(0);
    subjectInput.val("");
    messageInput.val("");
    guestsField.hide();
    subjectField.hide();
    // nameInput.value = "";
    // emailInput.value = "";
    // guestsInput.value = 0;
    // subjectInput.value = "";
    // messageInput.value = "";
    // guestsField.style.display = "none";
    // subjectField.style.display = "none";
    calcTables();
    createEventListeners();
    checkPurpose();
}

// resets form inputs
$(window).on("load", resetForm);
// if (document.addEventListener) {
//     window.addEventListener("load", resetForm, false);
// } else if (document.attachEvent) {
//     window.attachEvent("onload", resetForm);
// }
