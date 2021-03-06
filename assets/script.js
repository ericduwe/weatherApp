var weatherContainerEl = document.getElementById("weatherContainer");
var forecastContainerEl = document.getElementById("forecast-container");
var searchContainerEl = document.getElementById("search-history")
var searchForm = document.getElementById("search-form");
var searchButton = document.querySelector(".conditions")
var forecastButton = document.querySelector(".fiveDay")
var day1Container = document.getElementById("day1")
var day2Container = document.getElementById("day2")
var day3Container = document.getElementById("day3")
var day4Container = document.getElementById("day4")
var day5Container = document.getElementById("day5")
var conditionsHeader = document.getElementById("conditions-title")
var fiveDayHeader = document.getElementById("fiveDayHeader")
var alertContainer = document.getElementById("alert-text")
var alerts = document.getElementById("alert-container")
var apiKey = "aed951678fe40a952b0d63a1ad23589b";
var recentlyViewed = [];

function searchApi(city,state,country) {

    var apiKey = "aed951678fe40a952b0d63a1ad23589b";
    var queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&units=imperial&appid=${apiKey}`




    //Fetch Request for current conditions
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
            countryName.textContent = getFlagEmoji(data.sys.country)
            weatherContainerEl.appendChild(countryName);

            var timeZoneOffset = (data.timezone) / 3600
            var timeInUTC = moment().utc()
            var timeInZone = timeInUTC.add(timeZoneOffset, "hour")
            var currentDate = document.createElement("h5");
            currentDate.textContent = timeInZone.format("dddd MMM Do, YYYY hh:mm a")
            weatherContainerEl.appendChild(currentDate);

            var currentConditions = document.createElement("h4");
            currentConditions.textContent = data.weather[0].main
            weatherContainerEl.appendChild(currentConditions);

            var currentIcon = document.createElement("img");
            var weatherCode = data.weather[0].icon;
            currentIcon.src = `https://openweathermap.org/img/wn/${weatherCode}@2x.png`;
            weatherContainerEl.appendChild(currentIcon);

            var currentTemp = document.createElement("h2");
            currentTemp.textContent = data.main.temp.toFixed(0) + "\u00B0 F";
            weatherContainerEl.appendChild(currentTemp);

            var currentHumidity = document.createElement("h6");
            currentHumidity.textContent = "Humidity: " + data.main.humidity + "%"
            weatherContainerEl.appendChild(currentHumidity);

            var windSpeed = document.createElement("h6");
            windSpeed.textContent = "Wind Speed: " + data.wind.speed + "mph"
            weatherContainerEl.appendChild(windSpeed);

            var uvIndex = document.createElement("h6");
            uvIndex.textContent = "UV Index: " + data.wind.speed + "mph"
            weatherContainerEl.appendChild(windSpeed);

        })
}

function forecastApi(city,state,country) {
    var apiKey = "aed951678fe40a952b0d63a1ad23589b";
    var queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&units=imperial&appid=${apiKey}`




    fetch(queryUrl)

        .then(function (response) {
            console.log(response.ok)
            return response.json()
        })
        .then(function (data) {
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            var forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&units=imperial&appid=${apiKey}`
            fetch(forecastUrl)
                .then(function (response) {
                    console.log(response.ok)
                    return response.json()
                })
                .then(function (data) {
                    console.log(data);


                    //Day Headers for Forecast
                    var timeZoneOffset = (data.timezone_offset) / 3600
                    var timeInUTC = moment().utc()
                    var timeInZone = timeInUTC.add(timeZoneOffset, "hour")




                    day1Day = timeInZone.add(1, "day");
                    var day1DayEl = document.createElement("h4");
                    day1DayEl.textContent = day1Day.format("dddd")
                    day1Container.appendChild(day1DayEl);


                    day2Day = day1Day.add(1, "day");
                    var day2DayEl = document.createElement("h4");
                    day2DayEl.textContent = day2Day.format("dddd")
                    day2Container.appendChild(day2DayEl);


                    day3Day = day2Day.add(1, "day");
                    var day3DayEl = document.createElement("h4");
                    day3DayEl.textContent = day3Day.format("dddd")
                    day3Container.appendChild(day3DayEl);


                    day4Day = day3Day.add(1, "day");
                    var day4DayEl = document.createElement("h4");
                    day4DayEl.textContent = day4Day.format("dddd")
                    day4Container.appendChild(day4DayEl);


                    day5Day = day4Day.add(1, "day");
                    var day5DayEl = document.createElement("h4");
                    day5DayEl.textContent = day5Day.format("dddd")
                    day5Container.appendChild(day5DayEl);



                    //Day 1 Forecast
                    var day1High = document.createElement("h2");
                    day1High.textContent = data.daily[1].temp.max.toFixed(0) + "\u00B0 F";;
                    day1Container.appendChild(day1High);

                    var day1Conditions = document.createElement("h3");
                    day1Conditions.textContent = data.daily[1].weather[0].main;
                    day1Container.appendChild(day1Conditions);

                    var day1Icon = document.createElement("img");
                    var day1WeatherCode = data.daily[1].weather[0].icon;
                    day1Icon.src = `https://openweathermap.org/img/wn/${day1WeatherCode}@2x.png`;
                    day1Container.appendChild(day1Icon);

                    var day1Humidity = document.createElement("h6");
                    day1Humidity.textContent = "Forecast Humidity: " + data.daily[1].humidity + "%"
                    day1Container.appendChild(day1Humidity);

                    var day1WindSpeed = document.createElement("h6");
                    day1WindSpeed.textContent = "Wind Speed: " + data.daily[1].wind_speed.toFixed(0) + "mph"
                    day1Container.appendChild(day1WindSpeed);

                    var day1UVIndex = document.createElement("h6");
                    day1UVIndex.classList.add("uv-index");
                    day1UVIndex.textContent = "UV Index: " + data.daily[1].uvi.toFixed(0);
                    day1Container.appendChild(day1UVIndex);



                    //Day 2 Forecast
                    var day2High = document.createElement("h2");
                    day2High.textContent = data.daily[2].temp.max.toFixed(0) + "\u00B0 F";;
                    day2Container.appendChild(day2High);

                    var day2Conditions = document.createElement("h3");
                    day2Conditions.textContent = data.daily[2].weather[0].main;
                    day2Container.appendChild(day2Conditions);

                    var day2Icon = document.createElement("img");
                    var day2WeatherCode = data.daily[2].weather[0].icon;
                    day2Icon.src = `https://openweathermap.org/img/wn/${day1WeatherCode}@2x.png`;
                    day2Container.appendChild(day2Icon);

                    var day2Humidity = document.createElement("h6");
                    day2Humidity.textContent = "Forecast Humidity: " + data.daily[2].humidity + "%"
                    day2Container.appendChild(day2Humidity);

                    var day2WindSpeed = document.createElement("h6");
                    day2WindSpeed.textContent = "Wind Speed: " + data.daily[2].wind_speed.toFixed(0) + "mph"
                    day2Container.appendChild(day2WindSpeed);

                    var day2UVIndex = document.createElement("h6");
                    day2UVIndex.classList.add("uv-index");
                    day2UVIndex.textContent = "UV Index: " + data.daily[2].uvi.toFixed(0);
                    day2Container.appendChild(day2UVIndex);

                    //Day 3 Forecast
                    var day3High = document.createElement("h2");
                    day3High.textContent = data.daily[3].temp.max.toFixed(0) + "\u00B0 F";;
                    day3Container.appendChild(day3High);

                    var day3Conditions = document.createElement("h3");
                    day3Conditions.textContent = data.daily[3].weather[0].main;
                    day3Container.appendChild(day3Conditions);

                    var day3Icon = document.createElement("img");
                    var day3WeatherCode = data.daily[3].weather[0].icon;
                    day3Icon.src = `https://openweathermap.org/img/wn/${day1WeatherCode}@2x.png`;
                    day3Container.appendChild(day3Icon);

                    var day3Humidity = document.createElement("h6");
                    day3Humidity.textContent = "Forecast Humidity: " + data.daily[3].humidity + "%"
                    day3Container.appendChild(day3Humidity);

                    var day3WindSpeed = document.createElement("h6");
                    day3WindSpeed.textContent = "Wind Speed: " + data.daily[3].wind_speed.toFixed(0) + "mph"
                    day3Container.appendChild(day3WindSpeed);

                    var day3UVIndex = document.createElement("h6");
                    day3UVIndex.classList.add("uv-index");
                    day3UVIndex.textContent = "UV Index: " + data.daily[3].uvi.toFixed(0);
                    day3Container.appendChild(day3UVIndex);

                    //Day 4 Forecast
                    var day4High = document.createElement("h2");
                    day4High.textContent = data.daily[4].temp.max.toFixed(0) + "\u00B0 F";;
                    day4Container.appendChild(day4High);

                    var day4Conditions = document.createElement("h3");
                    day4Conditions.textContent = data.daily[4].weather[0].main;
                    day4Container.appendChild(day4Conditions);

                    var day4Icon = document.createElement("img");
                    var day4WeatherCode = data.daily[4].weather[0].icon;
                    day4Icon.src = `https://openweathermap.org/img/wn/${day1WeatherCode}@2x.png`;
                    day4Container.appendChild(day4Icon);

                    var day4Humidity = document.createElement("h6");
                    day4Humidity.textContent = "Forecast Humidity: " + data.daily[4].humidity + "%"
                    day4Container.appendChild(day4Humidity);

                    var day4WindSpeed = document.createElement("h6");
                    day4WindSpeed.textContent = "Wind Speed: " + data.daily[4].wind_speed.toFixed(0) + "mph"
                    day4Container.appendChild(day4WindSpeed);

                    var day4UVIndex = document.createElement("h6");
                    day4UVIndex.classList.add("uv-index");
                    day4UVIndex.textContent = "UV Index: " + data.daily[4].uvi.toFixed(0);
                    day4Container.appendChild(day4UVIndex);

                    //Day 5 Forecast
                    var day5High = document.createElement("h2");
                    day5High.textContent = data.daily[5].temp.max.toFixed(0) + "\u00B0 F";;
                    day5Container.appendChild(day5High);

                    var day5Conditions = document.createElement("h3");
                    day5Conditions.textContent = data.daily[5].weather[0].main;
                    day5Container.appendChild(day5Conditions);

                    var day5Icon = document.createElement("img");
                    var day5WeatherCode = data.daily[5].weather[0].icon;
                    day5Icon.src = `https://openweathermap.org/img/wn/${day1WeatherCode}@2x.png`;
                    day5Container.appendChild(day5Icon);

                    var day5Humidity = document.createElement("h6");
                    day5Humidity.textContent = "Forecast Humidity: " + data.daily[5].humidity + "%"
                    day5Container.appendChild(day5Humidity);

                    var day5WindSpeed = document.createElement("h6");
                    day5WindSpeed.textContent = "Wind Speed: " + data.daily[5].wind_speed.toFixed(0) + "mph"
                    day5Container.appendChild(day5WindSpeed);

                    var day5UVIndex = document.createElement("h6");
                    day5UVIndex.classList.add("uv-index");
                    day5UVIndex.textContent = "UV Index: " + data.daily[5].uvi.toFixed(0);
                    day5Container.appendChild(day5UVIndex);


                    //Weather Alerts
                    if (data.alerts) {
                        changeVis(alerts, "visible")
                        var weatherAlertTitle = document.createElement("h3")
                        weatherAlertTitle.textContent = data.alerts[0].event.toUpperCase() + " Alert from " + data.alerts[0].sender_name
                        alertContainer.appendChild(weatherAlertTitle);

                        var weatherAlertText = document.createElement("p")
                        weatherAlertText.textContent = data.alerts[0].description
                        alertContainer.appendChild(weatherAlertText);
                    }
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
    alertContainer.innerHTML = "";
    changeVis(alerts, "hidden")
    changeVis(fiveDayHeader, "hidden");
    changeVis(forecastButton, "visible")
    changeVis(forecastContainerEl, "hidden")
    changeVis(conditionsHeader, "visible")
    changeVis(weatherContainerEl, "visible");
    var searchInputVal = searchForm.value;

    if (!searchInputVal) {
        console.error("City name cannot be blank");
        return;
    }

    searchApi(searchInputVal);


}


function handleForecastFormSubmit(event) {
    event.preventDefault();
    day1Container.innerHTML = "";
    day2Container.innerHTML = "";
    day3Container.innerHTML = "";
    day4Container.innerHTML = "";
    day5Container.innerHTML = "";
    alertContainer.innerHTML = "";
    var searchInputVal = searchForm.value;
    changeVis(fiveDayHeader, "visible");
    changeVis(forecastButton, "hidden")
    changeVis(forecastContainerEl, "visible")
    forecastApi(searchInputVal);
}

function changeVis(element, hideOrShow) {
    element.style.visibility = hideOrShow;

};

function changeBackground(element, color) {
    element.style.color = color;
}

function getFlagEmoji(countryCode) {
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}


searchButton.addEventListener("click", handleSearchFormSubmit);
forecastButton.addEventListener("click", handleForecastFormSubmit)





