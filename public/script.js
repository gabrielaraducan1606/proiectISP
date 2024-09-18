const API_KEY = '4364d4beb844ffb6da5e87e2b8e77106'; 

document.getElementById('city-selector').addEventListener('change', function() {
    const city = this.value;
    if (city) {
        fetchWeatherData(city);
    }
});

function fetchWeatherData(city) {
    // Fetch data for time and weather based on the selected city
    fetch(`http://worldtimeapi.org/api/timezone/Etc/UTC`)
    .then(response => response.json())
    .then(data => {
        const dateTime = data.datetime;
        const currentDate = new Date(dateTime);

        const day = currentDate.getDate();
        const weekday = currentDate.toLocaleString('en-US', { weekday: 'short' });
        const month = currentDate.toLocaleString('en-US', { month: 'long' });

        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const seconds = String(currentDate.getSeconds()).padStart(2, '0');
        const time = `${hours}:${minutes}:${seconds}`;

        document.querySelector('.day').textContent = day;
        document.querySelector('.weekday').textContent = weekday;
        document.querySelector('.month').textContent = month;
        document.querySelector('.time').textContent = time;

        // Fetch weather data from OpenWeather API
        return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    })
    .then(response => response.json())
    .then(weatherData => {
        // Extract temperature, sunrise, and sunset
        const temp = weatherData.main.temp;
        const sunrise = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
        const sunset = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

        document.querySelector('.temperature').textContent = `${temp} °C`;
        document.querySelector('.sunrise').textContent = sunrise;
        document.querySelector('.sunset').textContent = sunset;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        document.querySelector('.temperature').textContent = 'Error';
        document.querySelector('.sunrise').textContent = 'Error';
        document.querySelector('.sunset').textContent = 'Error';
    });
}