$(document).ready(function() {
    
    $("#showWeather").click(function() {
        $('#load').css("display", "block");

        let cityName = $("#city").val().trim();
        if(cityName) {

            $('#errorMessage').css("display", "none");

            let http = new XMLHttpRequest();
            const method = 'GET';
            const apiKey = 'de84ad524245599125c451f567500c4e';
            const URL = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=matric&appid=' + apiKey;

            http.open(method, URL);
            http.onreadystatechange = function() {
                if(http.readyState === XMLHttpRequest.DONE && http.status === 200) {
                    let data = JSON.parse(http.responseText);
                    $("#city").val("");
                    $('#weatherData').slideDown();
                    $('body').css('height', '300px');
                    $('#weatherData').css("display", "block");
                    $('#temperatureBtn').css("display", "block");
                    $('#load').css("display", "none");

                    $("#weatherCity").text(data.name);
                    $("#weatherDescription").text(data.weather[0].description.toUpperCase());
                    let temp = data.main.temp;
                    $("#weatherTemperature").text((temp-273.15).toFixed(2) + ' C');
                    $("#celsiusBtn").click(function() {
                        $("#weatherTemperature").text((temp-273.15).toFixed(2) + ' C');
                    })
                    $("#fahrenheitBtn").click(function() {
                        $("#weatherTemperature").text(((temp-273.15)*9/5 + 32).toFixed(2) + ' F');
                    })
                    $("#kelvinBtn").click(function() {
                        $("#weatherTemperature").text(temp.toFixed(2)+ ' K');
                    })
                    $("#city").val("");
                } else if(http.readyState === XMLHttpRequest.DONE && http.status !== 200) {
                    
                    $('#load').css("display", "none");
                    $('#errorMessage').css("display", "block");
                    $('#weatherData').css("display", "none");
                    $('#temperatureBtn').css("display", "none");
                    $('body').css('height', '250px');
                    $('#weatherData').slideUp();
                }
            };
            http.send();
        } else {
            $('#load').css("display", "none");
            $('#errorMessage').css("display", "block");
            $('#weatherData').css("display", "none");
            $('#temperatureBtn').css("display", "none");
            $('body').css('height', '250px');
            $('#weatherData').slideUp("slow");
        }
    });
});