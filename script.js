const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');
const weatherImage = document.getElementById('weatherImage');

searchBtn.addEventListener('click', () => {
    const cityName = cityInput.value.trim();
    if (cityName) {
        getWeather(cityName);
    } else {
        weatherInfo.innerHTML = 'Please enter a city.';
    }
});

async function getWeather(cityName) {
    const apiKey = '4862887cedf2ef1a27d4b078649921f0';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Weather data not available.');
        }

        const data = await response.json();
        const weatherDescription = data.weather[0].description;
        const temperature = (data.main.temp - 273.15).toFixed(2); // Convert to Celsius

        weatherInfo.innerHTML = `
            <h2>Weather in ${cityName}</h2>
            <p>Description: ${weatherDescription}</p>
            <p>Temperature: ${temperature} &#8451;</p>
        `;

        setWeatherImage(weatherDescription);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherInfo.innerHTML = 'Error fetching weather data. Please try again later.';
        weatherImage.src = '';
    }
}

function setWeatherImage(description) {
    const imageName = getDescriptionImageName(description);
    if (imageName) {
        weatherImage.src = `images/${imageName}.png`;
        weatherImage.alt = description;
    } else {
        weatherImage.src = '';
        weatherImage.alt = 'Weather image';
    }
}

function getDescriptionImageName(description) {
    const imageMappings = {
        'clear sky': 'clear',
        'few clouds': 'cloudy',
        'scattered clouds': 'cloudy',
        'broken clouds': 'cloudy',
        'overcast clouds': 'cloudy',
        'shower rain': 'rain',
        'rain': 'rain',
        'thunderstorm': 'storm',
        'snow': 'snow',
        'mist': 'mist',
    };
    return imageMappings[description.toLowerCase()] || '';
}
