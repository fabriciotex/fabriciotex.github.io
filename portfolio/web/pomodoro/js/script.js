$(document).ready(function() {
    var minute = 0,
        count = 0,
        cDown;

    // Set rest time
    $("#restMenu .btn").click(function() {
        var button = $(this).text(),
            value = $("#rest").text();
        if (button === "+") {
            value++;
            minute++;
        } else {
            value--;
            minute--;
        }
        if (value < 5)
            value = 5;
        $("#rest").html(value);
    });

    // Set pomodoro time
    $("#pomodoroMenu .btn").click(function() {
        var button = $(this).text(),
            value = $("#pomodoro").text();
        if (button === "+") {
            value++;
        } else {
            value--;
        }
        if (value < 5)
            value = 5;
        $("#pomodoro").html(value);
    });

    // Rest
    function rest() {
        $("#clock").css({
            "background": "#2ecc71",
            "border-color": "#27ae60",
            "border-width": "0px"
        }).stop();
        minute = parseInt($("#rest").text());

        var animTime = minute * 60000;
        $("#clock").animate({
            "border-width": "280px"
        }, animTime, "linear");

        var second = 60;

        $("#timer").html("Play harder!");

        cDown = setInterval(function() {

            if (second < 10) {
                $("#timer").html(minute + ":0" + second);
            } else if (second === 60) {
                $("#timer").html(minute + ":00");
                minute--;
            } else {
                $("#timer").html(minute + ":" + second);
            }

            if (minute === 0 && second === 0) {
                clearInterval(cDown);
                window.alert("Work hard!");
                pomodoro();
            } else if (second === 0) {
                second = 60;
                minute--;
            }

            second--;

        }, 1000);
    }

    // Pomodoro
    function pomodoro() {
        $("#clock").css({
            "background": "#e74c3c",
            "border-color": "#c0392b",
            "border-width": "0px"
        }).stop();
        minute = parseInt($("#pomodoro").text());

        var animTime = minute * 60000;
        $("#clock").animate({
            "border-width": "280px"
        }, animTime, "linear");

        var second = 60;

        $("#timer").html("Work hard!");

        cDown = setInterval(function() {

            if (second < 10) {
                $("#timer").html(minute + ":0" + second);
            } else if (second === 60) {
                $("#timer").html(minute + ":00");
                minute--;
            } else {
                $("#timer").html(minute + ":" + second);
            }

            if (minute === 0 && second === 0) {
                clearInterval(cDown);
                window.alert("Play harder!");
                rest();
            } else if (second === 0) {
                second = 60;
                minute--;
            }

            second--;

        }, 1000);
    }

    //Start pomodoro
    $("#timer").click(function() {
        count++;
        if (count % 2 !== 0)
            pomodoro();
        else {
            clearInterval(cDown);
            $("#clock").css({
                "background": "#e74c3c",
                "border-color": "#c0392b",
                "border-width": "0px"
            }).stop();
            $("#timer").html('Pomodoro <i class="fa fa-clock-o"></i>');
        }
    });



});