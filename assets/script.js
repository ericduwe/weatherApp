var weatherContainerEl = document.getElementById("weatherContainer");
var searchForm = document.getElementById("search-form");
var searchButton = document.getElementById("button-addon2");

let apiKey = "aed951678fe40a952b0d63a1ad23589b";
let queryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Dallas&appid=${apiKey}`


function searchApi(query) {
    var apiKey = "aed951678fe40a952b0d63a1ad23589b";
    var queryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Dallas&appid=${apiKey}`


    fetch(queryUrl)

        .then(function (response) {
            console.log(response.ok)
            return response.json()
        })
        .then(function (data) {

            var cityName = document.createElement("h3");
            cityName.textContent = data.city.name;
            weatherContainerEl.appendChild(cityName);
            console.log(data);

            if (!data.results.length) {
                console.log("No results found");
                weatherContainerEl.innerHTML = "<h3>No results found, search again!</h3>";
            } else {
                weatherContainerEl.textContent = "";
                for (var i=0; i < data.results.length;i++) {
                     printResults(weatherContainer.results[i]);
                }
            }

        })
}

function handleSearchFormSubmit(event) {
    event.preventDefault();

    var searchInputVal = searchForm.value;

    if (!searchInputVal) {
        console.error("Please enter a city!");
        return;
    }

    searchApi(searchInputVal)
}

searchButton.addEventListener("click", handleSearchFormSubmit);

var displayWeather = function (data, searchTerm) {
    if (data.length === 0) {
        weatherContainerEl.textContent = "No data Found";
        return;

    }



}
