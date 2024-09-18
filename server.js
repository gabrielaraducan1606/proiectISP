const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

// Folosește folderul public pentru a servi fișiere statice (index.html, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// API_KEY pentru OpenWeather
const API_KEY = '4364d4beb844ffb6da5e87e2b8e77106';

// Endpoint pentru a obține vremea în funcție de oraș
app.get('/weather', async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.status(400).send({ error: 'City is required' });
    }

    try {
        // Solicită date meteo de la OpenWeather
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const weatherData = response.data;
        
        res.send({
            temperature: weatherData.main.temp,
            sunrise: weatherData.sys.sunrise,
            sunset: weatherData.sys.sunset
        });
    } catch (error) {
        res.status(500).send({ error: 'Error fetching weather data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});