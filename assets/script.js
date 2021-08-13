let apiKey = "aed951678fe40a952b0d63a1ad23589b";
let queryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Dallas&appid=${apiKey}`



fetch(queryUrl)

.then(headers => headers.json())
.then(weatherData => {
    console.log(weatherData);

})