// const keyApi='6ea6bc9b8d904ba79f8114752222310';
// const baseURL='http://api.weatherapi.com/v1';

//? API URL 
// https://api.weatherapi.com/v1/forecast.json?key=ab665c02dc384b38902150930242803&q=london&days=3

// Variables
let searchInput = document.querySelector('#searchInput');
let weatherData;

// Functions
searchInput.addEventListener('input', function () {
    if (searchInput.value.length > 3) {
        startApp(searchInput.value);
    }
});

async function startApp(city) {
    try {
        weatherData = await getData(city);
        console.log(weatherData);
        todayWeather();
        tomorrowWeather();
        afterTomorrowWeather();
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("An error occurred while fetching weather data. Please try again.");
    }
}

async function getData(city) {
    try {
        let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=ab665c02dc384b38902150930242803&q=${city}&days=3`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        let data = await response.json();
        return data;
    } catch (error) {
        console.error("Error in getData:", error);
        throw error;
    }
}

function todayWeather() {
    document.querySelector('.today .city').innerHTML = weatherData.location.name;
    document.querySelector('.today .degree').innerHTML = weatherData.current.temp_c + 'C';
    document.querySelector('.today #todayImg').setAttribute('src', weatherData.current.condition.icon);
    document.querySelector('.today .weatherCondition').innerHTML = weatherData.current.condition.text;
    document.querySelector('.today .humidity #humidity').innerHTML = weatherData.current.humidity;
    document.querySelector('.today .winds #winds').innerHTML = weatherData.current.wind_mph;
}

function tomorrowWeather() {
    document.querySelector('.tomorrow .forecast-body .degree #tomImg').setAttribute('src', 'https:' + weatherData.forecast.forecastday[1].day.condition.icon);
    document.querySelector('.tomorrow .maxTemperature').innerHTML = weatherData.forecast.forecastday[1].day.maxtemp_c;
    document.querySelector('.tomorrow .minTemperature').innerHTML = weatherData.forecast.forecastday[1].day.mintemp_c;
    document.querySelector('.tomorrow .weatherCondition').innerHTML = weatherData.forecast.forecastday[1].day.condition.text;
}

function afterTomorrowWeather() {
    document.querySelector('.after-tomorrow #afterimage').setAttribute('src', 'https:' + weatherData.forecast.forecastday[2].day.condition.icon);
    document.querySelector('.after-tomorrow .maxTemperature').innerHTML = weatherData.forecast.forecastday[2].day.maxtemp_c;
    document.querySelector('.after-tomorrow .minTemperature').innerHTML = weatherData.forecast.forecastday[2].day.mintemp_c;
    document.querySelector('.after-tomorrow .weatherCondition').innerHTML = weatherData.forecast.forecastday[2].day.condition.text;
}

// Live Location
navigator.geolocation.getCurrentPosition(
    position => {
        const liveLocation = position.coords.latitude + ',' + position.coords.longitude;
        console.log("Live location:", liveLocation);
        startApp(liveLocation);
    },
    error => {
        console.error("Error getting location:", error);
        alert("Unable to access your location. Please allow location access or use the search field.");
    }
);
