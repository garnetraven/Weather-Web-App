function getWeatherData(location) {
  const apiKey = "24d0d5e0c0610c8ba8dfcc6a8da46724";
  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`;
  
  // Make a fetch request to the API and process the response
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      // Extract relevant weather data from the API response
      const weatherData = {
        temperature: data.main.temp,
        condition: data.weather[0].main,
        location: data.name,
        humidity: data.main.humidity,
        wind: data.wind.speed,
      };
      return weatherData;
    });
}

function updateUI(weatherData) {
  const temperature = document.querySelector("#temperature");
  const condition = document.querySelector("#condition");
  const location = document.querySelector("#location");
  const humidity = document.querySelector("#humidity");
  const wind = document.querySelector("#wind");
  const weatherIcon = document.querySelector("#weather-icon");

  // Map weather conditions to corresponding image URLs
  switch (weatherData.condition.toLowerCase()) {
    case "rain": 
      weatherIcon.src = "../images/rain.png";
      break;
    case "clouds":
      weatherIcon.src = "../images/cloudy.png";
      break;
    case "clear":
      weatherIcon.src = "../images/sunny.png";
      break;
    case "thunderstorm":
      weatherIcon.src = "../images/stormy.png";
      break;
    default:
      weatherIcon.src = "";
  }
  
  temperature.textContent = `${weatherData.temperature.toFixed(1)}°F`;
  condition.textContent = weatherData.condition;
  location.textContent = weatherData.location;
  humidity.textContent = `Humidity ${weatherData.humidity}% `;
  wind.textContent = `Wind Speed ${weatherData.wind.toFixed(0)} mph`;
}

const searchBtn = document.querySelector("#search-btn");
const searchBar = document.querySelector("#search-bar");

searchBtn.addEventListener("click", () => {
  const location = searchBar.value;
  
  getWeatherData(location)
    .then(weatherData => {
      updateUI(weatherData);
    })
    .catch(error => {
      console.log(error);
    });
});

function fetchWeatherForNewYork() {
  const defaultLocation = "New York"; 
  getWeatherData(defaultLocation)
    .then(weatherData => {
      updateUI(weatherData);
    })
    .catch(error => {
      console.log(error);
    });
}

fetchWeatherForNewYork();
