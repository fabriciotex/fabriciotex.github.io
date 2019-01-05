$(document).ready(function() {

    var math = [],
        operand = [],
        result = 0;

    function doMath(arr) {
        for (var i = 0; i < arr.length; i++) {
            if (i !== 0 && i % 2 !== 0) {
                switch (arr[i]) {
                    case '+':
                        arr[i + 1] = arr[i - 1] + arr[i + 1];
                        break;
                    case '−':
                        arr[i + 1] = arr[i - 1] - arr[i + 1];
                        break;
                    case '÷':
                        arr[i + 1] = arr[i - 1] / arr[i + 1];
                        break;
                    case '×':
                        arr[i + 1] = arr[i - 1] * arr[i + 1];
                        break;
                }
            }
        }
        return arr[arr.length - 1];
    }

    $("#clearEverything").click(function() {
        $("#screenChars").html('');
        math = [];
        operand = [];
    });

    $(".value").click(function() {
        var value = $(this).text();
        operand.push(value);
        if (value === '+' || value === '−' || value === '÷' || value === '×') {
            operand.pop();
            if (operand.length === 0) {
                var rem = $("#screenChars").text();
                if (rem !== "")
                    operand.unshift(rem);
                else
                    operand.unshift(0);
            }
            math.push(parseFloat(operand.join('')));
            operand = [];
            math.push(value);
        } else if (value === '=') {
            operand.pop();
            if (operand.length === 0) {
                var rem = $("#screenChars").text();
                if (rem !== "")
                    operand.unshift(rem);
                else
                    operand.unshift(0);
            }
            math.push(parseFloat(operand.join('')));
            operand = [];
            result = doMath(math);
            math = [];
        } else if (value === '√') {
            operand.pop();
            if (operand.length === 0) {
                var rem = $("#screenChars").text();
                if (rem !== "")
                    operand.unshift(rem);
                else
                    operand.unshift(0);
            }
            math.push(parseFloat(operand.join('')));
            operand = [];
            result = doMath(math);
            result = Math.sqrt(result);
            math = [];
        }

        if (value !== '=' && value !== '√')
            $("#screenChars").append(value);
        else
            $("#screenChars").html(result);
    });

});