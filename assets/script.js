var weatherContainerEl = document.getElementById("weatherContainer");
var forecastContainerEl = document.getElementById("forecast-container");
var searchForm = document.getElementById("search-form");
var searchButton = document.querySelector(".conditions")
var forecastButton = document.querySelector(".fiveDay")



function searchApi(query) {
    var apiKey = "aed951678fe40a952b0d63a1ad23589b";
    var queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=imperial&appid=${apiKey}`


    fetch(queryUrl)

        .then(function (response) {
            console.log(response.ok)
            return response.json()
        })
        .then(function (data) {
            console.log(data)

            var cityName = document.createElement("h3");
            cityName.textContent = data.name;
            weatherContainerEl.appendChild(cityName);
            console.log(data);

            var countryName = document.createElement("h3");
            countryName.textContent = ", " + data.sys.country;
            weatherContainerEl.appendChild(countryName);
            
            var currentConditions = document.createElement("h4");
            currentConditions.textContent = data.weather[0].main
            weatherContainerEl.appendChild(currentConditions);

            var currentTemp = document.createElement("h2");
            currentTemp.textContent = data.main.temp.toFixed(0) + "\u00B0 F";
            weatherContainerEl.appendChild(currentTemp);
            
            // var 
            // if (!data.results.length) {
            //     console.log("No results found");
            //     weatherContainerEl.innerHTML = "<h3>No results found, search again!</h3>";
            // } else {
            //     weatherContainerEl.textContent = "";
            //     for (var i=0; i < data.results.length;i++) {
            //          printResults(weatherContainer.results[i]);
            //     }
            // }

        })
}

function forecastApi(query) {
    var apiKey = "aed951678fe40a952b0d63a1ad23589b";
    var queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=imperial&appid=${apiKey}`
    
    


    fetch(queryUrl)

        .then(function (response) {
            console.log(response.ok)
            return response.json()
        })
        .then(function (data) {
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            var forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&units=imperial&appid=${apiKey}`
            fetch (forecastUrl)
            .then(function (response) {
                console.log(response.ok)
                return response.json()
            })
            .then(function (data) {
                console.log(data);

                var

            }) 
        })
            
        
            
        
    }

function handleSearchFormSubmit(event) {
    event.preventDefault();
    weatherContainerEl.innerHTML = "";
    var searchInputVal = searchForm.value;

    if (!searchInputVal) {
        console.error("City name cannot be blank");
        return;
    }

    searchApi(searchInputVal)
}

function handleForecastFormSubmit(event) {
    event.preventDefault();
    forecastContainerEl.innerHTML = "";
    var searchInputVal = searchForm.value;

    forecastApi(searchInputVal)
}

searchButton.addEventListener("click", handleSearchFormSubmit);
forecastButton.addEventListener("click", handleForecastFormSubmit)





