const iconElement = document.querySelector('.weather-icon');
const tempElement = document.querySelector('.temperature-value p');
const descElement = document.querySelector('.temperature-description p');

// App data
const weather = {};
weather.temperature = {
  unit: 'fahrenheit',
};

// Change to 'F' for Fahrenheit
var tempUnit = 'F';

const KELVIN = 273.15;
// Use your own key for the Weather, Get it here: https://openweathermap.org/
const key = 'eee09ac317c33c3bdc0c87e857ba763e';

// Set Position function
setPosition();

function setPosition(position) {
  // Here you can change your position
  // You can use https://www.latlong.net/ to get it! (I use San Francisco as an example)
  // let latitude = 40.716270; // new york city
  // let longitude = -73.987590;

  // let latitude = 41.2939386; // Oberlin, OH 
  // let longitude = -82.2173786;

  let latitude = 43.130745; // Rochester, NY
  let longitude = -77.635386;

  getWeather(latitude, longitude);
}

// Get the Weather data
function getWeather(latitude, longitude) {
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

  console.log(api);

  fetch(api)
    .then(function (response) {
      let data = response.json();
      return data;
    })
    .then(function (data) {
      let fahrenheit = Math.floor((data.main.temp - KELVIN)*9/5+32);
      weather.temperature.value =
        tempUnit == 'C' ? fahrenheit : fahrenheit;
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
    })
    .then(function () {
      displayWeather();
    });
}

// Display Weather info
function displayWeather() {
  iconElement.innerHTML = `<img src="icons/Nord/${weather.iconId}.png"/>`;
  tempElement.innerHTML = `${weather.temperature.value}°<span class="darkfg">${tempUnit}</span>`;
  descElement.innerHTML = weather.description;
}
