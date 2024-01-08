// UNIQUE KEY FOR API
const API_KEY = "e4f2171454923a6da6ba10aa7234409a";
let city;
const TEMP_UNITS = "metric"; // imperial for fahrenheit

let weatherData;

const moreCities = [
  "pune",
  "ahmedabad",
  "gujarat",
  "delhi",
  "tamil nadu",
  "jaipur",
  "rajasthan",
  "chennai",
  "mumbai",
];

let input = document.querySelector(".city-input");
const submitBtn = document.querySelector(".submit-btn");
const weatherUI = document.querySelector(".weather-ui");

const locationName = document.querySelector(".location-name");
const temperature = document.querySelector(".weather-temp");
const weatherDescription = document.querySelector(".description");
const locationVisibilty = document.querySelector(".visibility");
const locationHumidity = document.querySelector(".humidity");
const locationPressure = document.querySelector(".pressure");
const locationWind = document.querySelector(".wind");
const feelsLike = document.querySelector(".feels-like");
const citiesContainer = document.querySelector(".cities");
const emoji = document.querySelector(".emoji");
const tempDesc = document.querySelector(".temp-description span");

window.onload = function () {
  input.focus();
  fetchData();
};

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  fetchData();
});

function fetchData() {
  city = input.value;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${TEMP_UNITS}`
  )
    .then((res) => res.json())
    .then((data) => {
      if (city.toLowerCase() === data.name.toLowerCase()) {
        weatherData = data;

        const visibility = weatherData.visibility;
        const cityName = weatherData.name;
        const [{ description }] = [...weatherData.weather];
        const { speed, deg, gust } = weatherData.wind;
        const { temp, feels_like, humidity, pressure } = {
          ...weatherData.main,
        };

        userSearchCity(
          cityName,
          temp,
          description,
          visibility,
          humidity,
          pressure,
          speed,
          feels_like
        );
      }
    })
    .catch((err) => console.log(err));

  input.value = "";
}

function userSearchCity(
  name,
  temp,
  description,
  visibility,
  humidity,
  pressure,
  speed,
  feels_like
) {
  tempDesc.innerText = `Weather is ${weatherTemp(temp)}`;

  locationName.innerText = name;
  temperature.innerText = `${temp} °c`;

  emoji.innerText = weatherEmoji(description);

  weatherDescription.innerText =
    description[0].toUpperCase() + description.slice(1);

  locationVisibilty.innerText = weatherData.visibility;
  locationHumidity.innerText = humidity;
  locationPressure.innerText = pressure;
  locationWind.innerText = speed;
  feelsLike.innerText = feels_like;
}

function weatherTemp(temp) {
  if (temp > 30 && temp < 40) {
    return "very hot 🔥";
  } else if (temp > 25 && temp <= 30) {
    return "hot 🥵";
  } else if (temp > 20 && temp <= 25) {
    return "warm ♨️";
  } else if (temp > 5 && temp < 20) {
    return "cool 🤧";
  } else if (temp <= 5 && temp > 0) {
    return "cold 🧊";
  } else if (temp <= 0) {
    return "Quite cold 🥶";
  }
}

function weatherEmoji(description) {
  const desc = description.toLowerCase();
  if (
    desc === "smoke" ||
    desc === "few clouds" ||
    desc === "broken clouds" ||
    desc === "scattered clouds"
  ) {
    return "☁️";
  } else if (desc === "mist") {
    return "🌫️";
  } else if (desc === "overcast clouds") {
    return "😶‍🌫️";
  } else if (desc === "clear sky") {
    return "⛅";
  } else if (desc === "snow") {
    return "☃️";
  }
}

moreCities.forEach((city) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${TEMP_UNITS}`
  )
    .then((res) => res.json())
    .then((data) => {
      if (city.toLowerCase() === data.name.toLowerCase()) {
        weatherData = data;

        const cityName = weatherData.name;
        const [{ description }] = [...weatherData.weather];
        const { temp } = {
          ...weatherData.main,
        };

        createCityEl(cityName, description, temp);
      }
    })
    .catch((err) => console.log(`There's an error. ${err}`));
});

function createCityEl(cityName, description, temp) {
  const div = document.createElement("div");
  const p = document.createElement("p");
  const h3 = document.createElement("h3");
  const h2 = document.createElement("h2");

  h3.classList.add("weather-temp", "mt-s-sm");
  p.classList.add("city-description");
  div.classList.add("city");
  div.classList.add("city-name");

  p.innerText = `Description: ${description.toUpperCase()}`;
  h3.innerText = `${temp} °c`;
  h2.innerText = cityName;

  div.append(h2);
  div.append(h3);
  div.append(p);

  citiesContainer.append(div);
}
