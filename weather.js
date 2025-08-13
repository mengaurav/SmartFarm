document.addEventListener('DOMContentLoaded', function() {
    // Manual weather data for selected cities
    const manualWeatherData = {
        'Delhi': {
            name: 'Delhi',
            main: { temp: 32, humidity: 45 },
            weather: [{ main: 'Clear', description: 'Sunny', icon: '01d' }],
            wind: { speed: 10 },
            rain: null,
            uvi: 7,
            forecast: [
                { date: getFutureDate(1), temp: 33, description: 'Sunny', icon: '01d' },
                { date: getFutureDate(2), temp: 34, description: 'Partly Cloudy', icon: '02d' },
                { date: getFutureDate(3), temp: 31, description: 'Cloudy', icon: '03d' },
                { date: getFutureDate(4), temp: 30, description: 'Rain Showers', icon: '09d' },
                { date: getFutureDate(5), temp: 29, description: 'Thunderstorm', icon: '11d' },
            ]
        },
        'Mumbai': {
            name: 'Mumbai',
            main: { temp: 28, humidity: 80 },
            weather: [{ main: 'Rain', description: 'Heavy Rain', icon: '10d' }],
            wind: { speed: 15 },
            rain: { '1h': 12 },
            uvi: 5,
            forecast: [
                { date: getFutureDate(1), temp: 29, description: 'Rain', icon: '10d' },
                { date: getFutureDate(2), temp: 28, description: 'Cloudy', icon: '03d' },
                { date: getFutureDate(3), temp: 27, description: 'Rain Showers', icon: '09d' },
                { date: getFutureDate(4), temp: 28, description: 'Thunderstorm', icon: '11d' },
                { date: getFutureDate(5), temp: 30, description: 'Sunny', icon: '01d' },
            ]
        },
        'Kolkata': {
            name: 'Kolkata',
            main: { temp: 30, humidity: 70 },
            weather: [{ main: 'Clouds', description: 'Cloudy', icon: '03d' }],
            wind: { speed: 8 },
            rain: null,
            uvi: 6,
            forecast: [
                { date: getFutureDate(1), temp: 31, description: 'Cloudy', icon: '03d' },
                { date: getFutureDate(2), temp: 32, description: 'Sunny', icon: '01d' },
                { date: getFutureDate(3), temp: 30, description: 'Rain', icon: '10d' },
                { date: getFutureDate(4), temp: 29, description: 'Partly Cloudy', icon: '02d' },
                { date: getFutureDate(5), temp: 28, description: 'Sunny', icon: '01d' },
            ]
        },
        'Chennai': {
            name: 'Chennai',
            main: { temp: 34, humidity: 60 },
            weather: [{ main: 'Clear', description: 'Sunny', icon: '01d' }],
            wind: { speed: 12 },
            rain: null,
            uvi: 8,
            forecast: [
                { date: getFutureDate(1), temp: 35, description: 'Sunny', icon: '01d' },
                { date: getFutureDate(2), temp: 36, description: 'Sunny', icon: '01d' },
                { date: getFutureDate(3), temp: 34, description: 'Partly Cloudy', icon: '02d' },
                { date: getFutureDate(4), temp: 33, description: 'Cloudy', icon: '03d' },
                { date: getFutureDate(5), temp: 32, description: 'Rain Showers', icon: '09d' },
            ]
        },
        'Bangalore': {
            name: 'Bangalore',
            main: { temp: 26, humidity: 55 },
            weather: [{ main: 'Clouds', description: 'Partly Cloudy', icon: '02d' }],
            wind: { speed: 9 },
            rain: null,
            uvi: 6,
            forecast: [
                { date: getFutureDate(1), temp: 27, description: 'Partly Cloudy', icon: '02d' },
                { date: getFutureDate(2), temp: 28, description: 'Sunny', icon: '01d' },
                { date: getFutureDate(3), temp: 26, description: 'Rain', icon: '10d' },
                { date: getFutureDate(4), temp: 25, description: 'Cloudy', icon: '03d' },
                { date: getFutureDate(5), temp: 24, description: 'Sunny', icon: '01d' },
            ]
        }
    };

    // DOM Elements
    const locationInput = document.getElementById('locationInput');
    const searchBtn = document.getElementById('searchBtn');
    const locationBtns = document.querySelectorAll('.location-btn');
    const weatherLoader = document.getElementById('weatherLoader');
    const weatherContainer = document.getElementById('weatherContainer');
    const errorMessage = document.getElementById('errorMessage');
    const retryBtn = document.getElementById('retryBtn');
    
    // Weather display elements
    const locationName = document.getElementById('locationName');
    const currentDate = document.getElementById('currentDate');
    const weatherIcon = document.getElementById('weatherIcon');
    const temperature = document.getElementById('temperature');
    const weatherDescription = document.getElementById('weatherDescription');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('windSpeed');
    const precipitation = document.getElementById('precipitation');
    const uvIndex = document.getElementById('uvIndex');
    const farmingTips = document.getElementById('farmingTips');
    const forecastContainer = document.getElementById('forecastContainer');
    
    // Event Listeners
    searchBtn.addEventListener('click', function() {
        const location = getLocationInput();
        if (location) {
            getManualWeatherData(location);
        } else {
            showError('Please enter a location');
        }
    });
    
    locationInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const location = getLocationInput();
            if (location) {
                getManualWeatherData(location);
            } else {
                showError('Please enter a location');
            }
        }
    });
    
    locationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const location = this.getAttribute('data-location');
            locationInput.value = location;
            // Do NOT call getManualWeatherData here; require user to click 'Get Weather'
        });
    });
    
    retryBtn.addEventListener('click', function() {
        const location = getLocationInput();
        if (location) {
            getManualWeatherData(location);
        } else {
            hideError();
        }
    });
    
    function getLocationInput() {
        return locationInput.value.trim().toLowerCase();
    }
    
    // Function to get manual weather data
    function getManualWeatherData(location) {
        hideError();
        setTimeout(() => { // Simulate loading
            // Find matching city in manualWeatherData (case-insensitive)
            const matchedKey = Object.keys(manualWeatherData).find(
                key => key.toLowerCase() === location
            );
            if (matchedKey) {
                displayWeatherData(manualWeatherData[matchedKey]);
            } else {
                showError('Weather data not available for this location. Please select a popular location.');
            }
        }, 300); // Shorter delay for instant feel
    }
    
    // Function to display weather data
    function displayWeatherData(data) {
        weatherContainer.style.display = 'block';
        weatherContainer.classList.remove('visible');
        void weatherContainer.offsetWidth;
        weatherContainer.classList.add('visible');
        
        // Set current weather data
        locationName.textContent = data.name;
        currentDate.textContent = formatDate(new Date());
        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        humidity.textContent = `${data.main.humidity}%`;
        windSpeed.textContent = `${data.wind.speed} km/h`;
        precipitation.textContent = data.rain ? `${data.rain['1h']} mm` : '0 mm';
        uvIndex.textContent = data.uvi || 'N/A';
        
        // Generate farming tips based on weather
        generateFarmingTips(data);
        
        // Generate forecast
        generateForecast(data.forecast);
    }
    
    // Function to generate farming tips based on weather conditions
    function generateFarmingTips(data) {
        farmingTips.innerHTML = '';
        
        const weather = data.weather[0].main.toLowerCase();
        const temp = data.main.temp;
        const humidityVal = data.main.humidity;
        const windSpeedVal = data.wind.speed;
        
        const tips = [];
        
        // Temperature based tips
        if (temp > 35) {
            tips.push({
                title: 'High Temperature Alert',
                icon: 'fa-thermometer-full',
                text: 'Ensure adequate irrigation. Water crops during early morning or evening to reduce evaporation.'
            });
        } else if (temp < 10) {
            tips.push({
                title: 'Cold Weather Alert',
                icon: 'fa-snowflake',
                text: 'Protect sensitive crops from frost. Consider using row covers or mulch.'
            });
        } else if (temp >= 25 && temp <= 35) {
            tips.push({
                title: 'Optimal Growing Conditions',
                icon: 'fa-seedling',
                text: 'Good temperature for most crops. Maintain regular irrigation and monitor for pests.'
            });
        }
        
        // Weather condition based tips
        if (weather.includes('rain') || weather.includes('drizzle')) {
            tips.push({
                title: 'Rainy Conditions',
                icon: 'fa-cloud-rain',
                text: 'Avoid pesticide application as it may wash away. Check for water logging and ensure proper drainage.'
            });
        } else if (weather.includes('clear')) {
            tips.push({
                title: 'Clear Weather',
                icon: 'fa-sun',
                text: 'Ideal time for pesticide application if needed. Good day for harvesting mature crops.'
            });
        } else if (weather.includes('cloud')) {
            tips.push({
                title: 'Cloudy Conditions',
                icon: 'fa-cloud',
                text: 'Good time for transplanting seedlings. Reduced water evaporation, adjust irrigation accordingly.'
            });
        } else if (weather.includes('storm') || weather.includes('thunder')) {
            tips.push({
                title: 'Storm Warning',
                icon: 'fa-bolt',
                text: 'Secure farm equipment and structures. Ensure proper drainage to prevent waterlogging.'
            });
        }
        
        // Humidity based tips
        if (humidityVal > 80) {
            tips.push({
                title: 'High Humidity Alert',
                icon: 'fa-tint',
                text: 'Monitor for fungal diseases. Ensure proper spacing between plants for air circulation.'
            });
        } else if (humidityVal < 30) {
            tips.push({
                title: 'Low Humidity Alert',
                icon: 'fa-sun',
                text: 'Increase irrigation frequency. Consider mulching to retain soil moisture.'
            });
        }
        
        // Wind speed based tips
        if (windSpeedVal > 20) {
            tips.push({
                title: 'High Wind Alert',
                icon: 'fa-wind',
                text: 'Avoid spraying pesticides. Provide support to tall crops and young trees.'
            });
        }
        
        // Display tips
        tips.forEach(tip => {
            const tipCard = document.createElement('div');
            tipCard.className = 'tip-card';
            tipCard.innerHTML = `
                <h4><i class="fas ${tip.icon}"></i> ${tip.title}</h4>
                <p>${tip.text}</p>
            `;
            farmingTips.appendChild(tipCard);
        });
    }
    
    // Function to generate 5-day forecast
    function generateForecast(forecastData) {
        forecastContainer.innerHTML = '';
        
        forecastData.forEach(day => {
            const forecastItem = document.createElement('div');
            forecastItem.className = 'forecast-item';
            forecastItem.innerHTML = `
                <div class="forecast-date">${formatDay(new Date(day.date))}</div>
                <div class="forecast-icon">
                    <img src="https://openweathermap.org/img/wn/${day.icon}@2x.png" alt="Weather Icon">
                </div>
                <div class="forecast-temp">${Math.round(day.temp)}°C</div>
                <div class="forecast-desc">${day.description}</div>
            `;
            forecastContainer.appendChild(forecastItem);
        });
    }
    
    // Utility functions
    function formatDate(date) {
        return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
    }
    
    function formatDay(date) {
        return date.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });
    }
    
    function getFutureDate(daysAhead) {
        const date = new Date();
        date.setDate(date.getDate() + daysAhead);
        return date.toISOString().split('T')[0];
    }
    
    // Show error message
    function showError(message) {
        errorMessage.style.display = 'block';
        document.getElementById('errorText').textContent = message;
        weatherContainer.style.display = 'none';
        weatherContainer.classList.remove('visible');
    }
    
    // Hide error message
    function hideError() {
        errorMessage.style.display = 'none';
    }
});