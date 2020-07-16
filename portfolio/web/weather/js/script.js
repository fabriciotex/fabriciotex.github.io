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
      console.log(lat + " " + lon);
    });
  }
}

// Get weather info by location
function getWeather(call) {
  getLocation();

  $.getJSON("http://api.weatherstack.com/current?access_key=938e0c6aba6eb343d45c5ad8e0dfbedc&query=" + lat + "," + lon, function(data) {

    tempC = data.current.temperature;
    tempF = Math.round((tempC * 1.8) + 32, 2);

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