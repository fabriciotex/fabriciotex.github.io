// Set weather icon
function customize(icon, text) {
    $("#iconWeather").attr("src", icon);
    $("#iconWeather").attr("alt", text);
}

// Get coordinates to determine the location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
        });
    }
}

// Get weather info by location
function getWeather(call) {
    getLocation();

    $.getJSON("https://api.apixu.com/v1/current.json?key=788c2d49694442639aa34454161203&q=" + lat + "," + lon, function(data) {

        tempF = data.current.temp_f;
        tempC = data.current.temp_c;

        if (call === "F") {
            $("#temperature").html(tempF + "&deg;F");
        } else {
            $("#temperature").html(tempC + "&deg;C");
        }
        $("#location").html(data.location.name + ", " + data.location.region);

        icon = data.current.condition.icon;
        text = data.current.condition.text

        customize(icon, text);
    });

}

// Get to work!
$(document).ready(function() {

    // if Farenheit
    $("#fahrenheit ").on('click', function() {
        call = 'F';
        getWeather(call);
        this.style.display = "none";
        $("#celsius").show();
        $("main").css("background-color", "hsla(0, 100%, 50%, 0.5)");
    });

    // if Celsius
    $("#celsius").on('click', function() {
        call = 'C';
        getWeather();
        this.style.display = "none";
        $("#fahrenheit").show();
        $("main").css("background-color", "hsla(180, 100%, 50%, 0.5)");
    });

});