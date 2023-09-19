// Function to fetch weather data from the OpenWeatherMap API based on the given location
function getWeatherData(location) {
  // API key for authentication
  const apiKey = "apikey";
  
  // Construct the URL for the API request
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
      // Return the extracted weather data
      return weatherData;
    });
}

// Function to update the user interface (UI) with weather data
function updateUI(weatherData) {
  // Select elements in the HTML document to display weather information
  const temperature = document.querySelector("#temperature");
  const condition = document.querySelector("#condition");
  const location = document.querySelector("#location");
  const humidity = document.querySelector("#humidity");
  const wind = document.querySelector("#wind");
  const weatherIcon = document.querySelector("#weather-icon");

  // Map weather conditions to corresponding image URLs
  switch (weatherData.condition.toLowerCase()) {
    case "rain": 
      weatherIcon.src = "images/rain.png";
      break;
    case "clouds":
      weatherIcon.src = "images/cloudy.png";
      break;
    case "clear":
      weatherIcon.src = "images/sunny.png";
      break;
    case "thunderstorm":
      weatherIcon.src = "images/stormy.png";
      break;
    default:
      // Set a default image for unknown conditions
      weatherIcon.src = "";
  }
  
  // Display temperature in Fahrenheit with 1 decimal place
  temperature.textContent = `${weatherData.temperature.toFixed(1)}°F`;
  condition.textContent = weatherData.condition;
  location.textContent = weatherData.location;
  humidity.textContent = `Humidity ${weatherData.humidity}% `;
  wind.textContent = `Wind Speed ${weatherData.wind.toFixed(0)} mph`;
}

// Get references to the search button and search bar in the HTML document
const searchBtn = document.querySelector("#search-btn");
const searchBar = document.querySelector("#search-bar");

// Add a click event listener to the search button
searchBtn.addEventListener("click", () => {
  // Get the user-entered location from the search bar
  const location = searchBar.value;
  
  // Call the getWeatherData function to fetch weather data based on the location
  getWeatherData(location)
    .then(weatherData => {
      // Update the UI with the fetched weather data
      updateUI(weatherData);
    })
    .catch(error => {
      // Handle any errors that occur during the API request
      console.log(error);
    });
});

// default information to New York
function fetchWeatherForNewYork() {
  const defaultLocation = "New York"; // Set the default location to New York
  getWeatherData(defaultLocation)
    .then(weatherData => {
      // Update the UI with the fetched weather data
      updateUI(weatherData);
    })
    .catch(error => {
      // Handle any errors that occur during the API request
      console.log(error);
    });
}

// Call the default function when the app loads
fetchWeatherForNewYork();
