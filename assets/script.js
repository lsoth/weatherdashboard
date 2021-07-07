var APIKey = "9c1cf60e6ddac2dd60ea87d2e91c6a50";

var searchFormEl = document.getElementById("srchBox");

//THIS FUNCTION RUNS ONCE THE SUBMIT BUTTON IS PRESSED AND VERIFIES THAT THERE IS A RESPONSE ENTERED,
//FURTHERMORE CREATES A WEATHER OBJECT GIVEN DATA FROM THE API

function searchFormSubmit(event) {

    event.preventDefault();

    var city = $("#srchForm").val();

    if (!city) {
        console.error('Please enter a search input value');
        return;

    }

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";

    fetch(queryURL)
    .then(Response => {
        console.log(Response);
        return Response.json();
    
    })
    .then(weather => {
        console.log(weather);
        addWeatherInfo(weather)
    })
}

//THIS FUNCTION IS USED TO ADD SELECTED WEATHER DATA TO THE PAGE

function addWeatherInfo(weather) {
    var iconUrl = "http://openweathermap.org/img/wn/" +weather.weather[0].icon+"@2x.png"
    $('#weatherToday').html('');
    $('#uvIndex').html('');
    $('#fiveDay').html('');
    $('#weatherToday').append(`<p>
    ${weather.name} ${' '} ${moment.unix(weather.dt).format("MMM DD, YY")}
    </p>`);
    $('#weatherToday').append('<img src="' + iconUrl + '" />');
    $('#weatherToday').append('<p> Today\'s Weather: ' + weather.main.feels_like + '&deg;f</p>')
    $('#weatherToday').append('<p> Humidity Levels: ' + weather.main.humidity + '% </p>')
    $('#weatherToday').append('<p> Wind Speed: ' + weather.wind.speed + 'mph </p>')

    //THIS PORTION OF THE FUNCTION GRABS THE UV INDEX NUMBER AND ADDS A CLASS TO CHANGE FONT COLOR DEPENDING ON WEATHER CONDITIONS

    var uvIndexURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + weather.coord.lat + '&lon=' +weather.coord.lon+ '&exclude=minutely,hourly,daily,alerts&appid=' +APIKey
    
    fetch (uvIndexURL)
    .then(res3 => {
        console.log(res3);
        return res3.json();
    })
    .then(uvi => {
        console.log(uvi);
        $('#uvIndex').append('<p> UV Index: ' + uvi.current.uvi + '</p>');
        if (uvi.current.uvi <= 2){
            $('#uvIndex').addClass("safe")
        }else if(uvi.current.uvi > 7){
            $('#uvIndex').addClass("danger")
        }else{
            $('uvIndex').addClass("moderate")
        }
    })
    

    // creating the five day forcast!
    var fiveDayUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + weather.name + "&appid=" + APIKey + "&units=imperial"
    
    fetch(fiveDayUrl)
    .then(res => {
        console.log(res);
        return res.json();
    })
    .then(fiveDay => {
        console.log(fiveDay)
        for (let i = 0; i < fiveDay.list.length; i += 8) {
            console.log(fiveDay.list[i])
            var FiconUrl = "http://openweathermap.org/img/wn/" +fiveDay.list[i].weather[0].icon+"@2x.png"
            // console.log(fiveDay.list[i].weather[0].icon)
            $('#fiveDay').append(`<p>
            ${moment.unix(fiveDay.list[i].dt).format("MMM DD, YY")}
            </p>`);
            $('#fiveDay').append('<img src="' + FiconUrl + '" />');
            $('#fiveDay').append('<p> Weather Day Temperature: ' + fiveDay.list[i].main.feels_like + '&deg;f</p>')
            $('#fiveDay').append('<p> Humidity Levels: ' + fiveDay.list[i].main.humidity + '% </p>')
            $('#fiveDay').append('<p> Wind Speed: ' + fiveDay.list[i].wind.speed + 'mph </p>' + '<hr>')

        }
    })
}



searchFormEl.addEventListener("submit", searchFormSubmit);




// lastCityBtn.addEventListener ("click", function() {
// alert("did something");
// });
// GIVEN a weather dashboard with form inputs

// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history\

// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index


// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe


// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity


// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
