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

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    fetch(queryURL)
    .then(Response => {
        console.log(Response);
        return Response.json();
    
    })
    .then(weather => {
        console.log(weather);
    })
}

searchFormEl.addEventListener('click', searchFormSubmit);
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
