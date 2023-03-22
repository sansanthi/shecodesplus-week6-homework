let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
// current date
let day = document.querySelector(".day");
let time = document.querySelector(".time");
let date = new Date();

day.innerHTML = days[date.getDay()];
time.innerHTML = `${date.getHours()}:${date.getMinutes()}`;

//Search city
let apiKey = "6abba6e892082f6e99ff3292ea97c423";
let searchForm = document.querySelector("#search-form");
let currentButton = document.querySelector(".current-btn");

function showTemperatureInfo(response) {
  let city = document.querySelector(".city");
  let description = document.querySelector(".description");
  let humidity = document.querySelector(".humidity");
  let speed = document.querySelector(".speed");
  let temperature = document.querySelector(".temperature");

  city.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].main;
  let tempValue = Math.round(response.data.main.temp);
  temperature.innerHTML = tempValue;
  humidity.innerHTML = response.data.main.humidity;
  speed.innerHTML = response.data.wind.speed;
}
function searchCity(city) {
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiURL).then(showTemperatureInfo);
}

function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  if (searchInput.value) {
    searchCity(searchInput.value);
  }
}

function showCurrentPositon(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemperatureInfo);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentPositon);
}

searchForm.addEventListener("submit", handleSearch);

currentButton.addEventListener("click", getCurrentLocation);

searchCity("Switzerland");
