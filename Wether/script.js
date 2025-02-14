const apiKey = '8bd439bdf83cc8eef278edd2cf48992b'; // Replace with your OpenWeatherMap API key

document.getElementById('search-btn').addEventListener('click', () => {
  const city = document.getElementById('city-input').value;
  if (city) {
    fetchWeather(city);
  } else {
    showError('Please enter a city name.');
  }
});

async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  showLoading();

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      displayWeather(data);
    } else {
      showError('City not found. Please try again.');
    }
  } catch (error) {
    showError('An error occurred. Please try again later.');
  } finally {
    hideLoading();
  }
}

function displayWeather(data) {
  const weatherResult = document.getElementById('weather-result');
  const cityName = data.name;
  const temperature = data.main.temp;
  const weatherDescription = data.weather[0].description;
  const icon = data.weather[0].icon;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;
  const pressure = data.main.pressure;

  weatherResult.innerHTML = `
    <h2>${cityName}</h2>
    <p>Temperature: ${temperature}°C</p>
    <p>Weather: ${weatherDescription}</p>
    <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${weatherDescription}">
    <p>Humidity: ${humidity}%</p>
    <p>Wind Speed: ${windSpeed} m/s</p>
    <p>Pressure: ${pressure} hPa</p>
  `;

  // Change background based on weather condition
  changeBackground(weatherDescription);
}

function showLoading() {
  document.getElementById('loading').style.display = 'block';
  document.getElementById('weather-result').innerHTML = '';
}

function hideLoading() {
  document.getElementById('loading').style.display = 'none';
}

function showError(message) {
  const weatherResult = document.getElementById('weather-result');
  weatherResult.innerHTML = `<div class="error">${message}</div>`;
}

function changeBackground(weatherDescription) {
  const body = document.body;
  if (weatherDescription.includes('rain')) {
    body.style.background = 'linear-gradient(135deg, #4b6cb7, #182848)';
  } else if (weatherDescription.includes('cloud')) {
    body.style.background = 'linear-gradient(135deg, #6a85b6, #bac8e0)';
  } else if (weatherDescription.includes('clear')) {
    body.style.background = 'linear-gradient(135deg, #56ccf2, #2f80ed)';
  } else if (weatherDescription.includes('snow')) {
    body.style.background = 'linear-gradient(135deg, #e0e0e0, #f5f5f5)';
  } else {
    body.style.background = 'linear-gradient(135deg, #1e3c72, #2a5298)';
  }
}