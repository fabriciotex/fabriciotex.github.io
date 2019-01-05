"use strict";

function setValidation() {
    var html = document.getElementById("htmlVal");
    var css = document.getElementById("cssVal")
    var htmlURL = "http://validator.w3.org/nu/?doc=";
    var cssURL = "https://jigsaw.w3.org/css-validator/validator?uri="
    var loc = window.location.href;
    htmlURL += loc;
    cssURL += loc + "&profile=css3&usermedium=all&warning=1&vextwarning=&lang=en";
    html.setAttribute("href", htmlURL);
    css.setAttribute("href", cssURL)
}

if (window.addEventListener) {
    window.addEventListener("load", setValidation, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", setValidation);
}
