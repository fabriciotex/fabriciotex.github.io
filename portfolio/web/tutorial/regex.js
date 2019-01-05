"use strict";

// hadle with buttons for testing
var nameBtn = document.getElementById("nameBtn");
var emailBtn = document.getElementById("emailBtn");


function testName() {
    /* this function test a name input in the following way:
     * ^        anchors the beggining of string
     * ()       everything that is between parenthesis is required
     * ?:       the group is not captured (saved in memory) and therefore
                there's no need to appear again in the expression
     * \w+      has to contains one or more word characters
     * [.\']?   matches any character (.) followed by a literal quote character (')
                the '?' says that is optional for this to occurr
     *  ?       matches a space character 0 or more times
     * {1,7}    has to contain the whole expression from 1 to 7 times
     *          (1 to 7 names, separated by a space char)
     * $        anchors the end of the string
     */
    var regex = /^(?:\w+[.\']? ?){1,7}$/;
    var name = document.getElementById("name").value;
    var returnVal = document.getElementById("nameReturn");
    returnVal.innerHTML = "Returns: " + regex.test(name);
}

function testEmail() {
    /* this function test an email input in the following way:
     * ^                anchors the beggining of string
     * [_\w\-]+         must have word characters or "_" (underscore character)
                        or "-" (dash) one or more times
     * (\.[_\w\-]+)*    should to contain any character followed by any of those
                        described above 0 or more times
     * @                must have an "@" character
     * [_\w\-]+         must have word characters or "_" (underscore character)
                        or "-" (dash) one or more times
     * (\.[_\w\-]+)*    should to contain any character followed by any of those
                        described above 0 or more times
     * (\.[\D]{2,6})    must have a "." character followed by a non-digit
                        from 2 to 6 times
     * $                anchors the end of the string
     */
    var regex = /^[_\w\-]+(\.[_\w\-]+)*@[\w\-]+(\.[\w\-]+)*(\.[\D]{2,6})$/;
    var email = document.getElementById("email").value;
    var returnVal = document.getElementById("emailReturn");
    returnVal.innerHTML = "Returns: " + regex.test(email);
}

// set event listeners
if (nameBtn.addEventListener) {
    nameBtn.addEventListener("click", testName, false);
    emailBtn.addEventListener("click", testEmail, false);
} else if (nameBtn.attachEvent) {
    nameBtn.attachEvent("onclick", testName);
    emailBtn.attachEvent("onclick", testEmail);
}
