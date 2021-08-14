var weatherContainerEl = document.getElementById("weatherContainer");
var forecastContainerEl = document.getElementById("forecast-container");
var searchForm = document.getElementById("search-form");
var searchButton = document.querySelector(".conditions")
var forecastButton = document.querySelector(".fiveDay")
var day1Container = document.getElementById("day1")
var day2Container = document.getElementById("day2")
var day3Container = document.getElementById("day3")
var day4Container = document.getElementById("day4")
var day5Container = document.getElementById("day5")
var fiveDayHeader = document.getElementById("fiveDayHeader")

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
                
                var day1High = document.createElement("h2");
                day1High.textContent = data.daily[1].temp.max;
                day1Container.appendChild(day1High);

                var day1Conditions = document.createElement("h3");
                day1Conditions.textContent = data.daily[1].weather[0].main;
                day1Container.appendChild(day1Conditions);

                var day2Conditions = document.createElement("h3");
                day2Conditions.textContent = data.daily[2].weather[0].main;
                day2Container.appendChild(day2Conditions);

                var day3Conditions = document.createElement("h3");
                day3Conditions.textContent = data.daily[3].weather[0].main;
                day3Container.appendChild(day3Conditions);

                var day4Conditions = document.createElement("h3");
                day4Conditions.textContent = data.daily[4].weather[0].main;
                day4Container.appendChild(day4Conditions);
                
                var day5Conditions = document.createElement("h3");
                day5Conditions.textContent = data.daily[5].weather[0].main;
                day5Container.appendChild(day5Conditions);
                

             
        })
            
        
            
        
    })
}

function handleSearchFormSubmit(event) {
    event.preventDefault();
    weatherContainerEl.innerHTML = "";
    day1Container.innerHTML = "";
    day2Container.innerHTML = "";
    day3Container.innerHTML = "";
    day4Container.innerHTML = "";
    day5Container.innerHTML = "";
    changeVis(fiveDayHeader, "hidden");
    changeVis(forecastButton, "visible")
    var searchInputVal = searchForm.value;

    if (!searchInputVal) {
        console.error("City name cannot be blank");
        return;
    }

    searchApi(searchInputVal)
}

function handleForecastFormSubmit(event) {
    event.preventDefault();
    day1Container.innerHTML = "";
    day2Container.innerHTML = "";
    day3Container.innerHTML = "";
    day4Container.innerHTML = "";
    day5Container.innerHTML = "";
    var searchInputVal = searchForm.value;
    changeVis(fiveDayHeader, "visible");
    changeVis(forecastButton, "hidden")
    forecastApi(searchInputVal);
}

function changeVis(element, hideOrShow) {
    element.style.visibility = hideOrShow;

};


searchButton.addEventListener("click", handleSearchFormSubmit);
forecastButton.addEventListener("click", handleForecastFormSubmit)





