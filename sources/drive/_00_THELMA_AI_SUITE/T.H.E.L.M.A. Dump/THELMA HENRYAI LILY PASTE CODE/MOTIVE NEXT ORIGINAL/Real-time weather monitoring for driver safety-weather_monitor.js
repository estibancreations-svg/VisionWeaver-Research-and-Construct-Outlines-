Original name: Real-time weather monitoring for driver safety-weather_monitor.js
Drive ID: 1ZiQIP3ii3-GIc2sIG8MjBkwnwZR1wd5P
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/MOTIVE NEXT ORIGINAL/
Modified: 2025-11-06T00:06:21.000Z

// netlify/functions/weather-monitor.js
// Real-time weather monitoring for driver safety

exports.handler = async (event, context) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        const { latitude, longitude, route } = event.httpMethod === 'POST' 
            ? JSON.parse(event.body) 
            : event.queryStringParameters;

        const openWeatherKey = process.env.OPENWEATHER_API_KEY;

        if (!openWeatherKey) {
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    demo: true,
                    message: 'Configure OPENWEATHER_API_KEY for live weather data',
                    conditions: 'Clear',
                    temperature: 72,
                    alerts: []
                })
            };
        }

        // Current weather conditions
        const currentWeather = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${openWeatherKey}&units=imperial`
        );
        const currentData = await currentWeather.json();

        // Weather alerts
        const alertsResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${openWeatherKey}&exclude=minutely,daily`
        );
        const alertsData = await alertsResponse.json();

        // Evaluate hazardous conditions
        const hazards = [];
        if (currentData.weather[0].main === 'Snow') hazards.push('SNOW');
        if (currentData.weather[0].main === 'Rain' && currentData.rain?.['1h'] > 0.5) hazards.push('HEAVY_RAIN');
        if (currentData.wind.speed > 25) hazards.push('HIGH_WINDS');
        if (currentData.visibility < 1000) hazards.push('LOW_VISIBILITY');

        const response = {
            location: { latitude, longitude },
            current: {
                temperature: Math.round(currentData.main.temp),
                feels_like: Math.round(currentData.main.feels_like),
                conditions: currentData.weather[0].main,
                description: currentData.weather[0].description,
                humidity: currentData.main.humidity,
                wind_speed: Math.round(currentData.wind.speed),
                wind_direction: currentData.wind.deg,
                visibility: currentData.visibility,
                pressure: currentData.main.pressure
            },
            hazards: hazards,
            alerts: alertsData.alerts || [],
            recommendation: hazards.length > 0 ? 'CAUTION_ADVISED' : 'SAFE_TO_PROCEED',
            timestamp: new Date().toISOString()
        };

        // Send alert if hazardous conditions
        if (hazards.length > 0) {
            await sendWeatherAlert(response);
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(response)
        };

    } catch (error) {
        console.error('Weather Monitor Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Weather monitoring failed' })
        };
    }
};

async function sendWeatherAlert(weatherData) {
    console.log('Weather Alert:', weatherData.hazards);
}