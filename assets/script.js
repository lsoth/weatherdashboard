var APIKey = "9c1cf60e6ddac2dd60ea87d2e91c6a50";
// var city = $("#srchForm").val()
// var city = "seattle"
var searchFormEl = document.getElementById("srchBox")

function searchFormSubmit(event) {

    event.preventDefault();

    var city = $("#srchForm").val();

    if (!city) {
        console.error('Please enter a search input value');
        return;

    }

    // var lastCityBtn = document.createElement("button");
    // lastCityBtn.innerHTML = city;


    // var searchHistory = document.getElementById("srchHist");
    // searchHistory.appendChild(button);


    // button.addEventListener ("click", function() {
    // alert("did something");
    // });

    //save city in local storage list out using append function

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

function addWeatherInfo(weather) {
    var iconUrl = "http://openweathermap.org/img/wn/" +weather.weather[0].icon+"@2x.png"
    $('#weatherToday').html('');
    $('#weatherToday').append(`<p>
    ${weather.name} ${' '} ${moment.unix(weather.dt).format("MMM DD, YY")}
    </p>`);
    $('#weatherToday').append('<img src="' + iconUrl + '" />');
    $('#weatherToday').append('<p> Today\'s Weather: ' + weather.main.feels_like + '&deg;f</p>')
    $('#weatherToday').append('<p> Humidity Levels: ' + weather.main.humidity + '% </p>')
    $('#weatherToday').append('<p> Wind Speed: ' + weather.wind.speed + 'mph </p>')

}

var fiveDayUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + "seattle" + "&appid=" + APIKey + "&units=imperial"

fetch(fiveDayUrl)
.then(res => {
    console.log(res);
    return res.json();
})
.then(fiveDay => {
    console.log(fiveDay)
    // use a for loop
    // add 8 to i
})

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
