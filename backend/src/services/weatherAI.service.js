
import fetch from 'node-fetch';
const getWeather = async (lat, lon) => {
    try {
        const res = await fetch(`https://api.weatherai.com/v1/weather?lat=${lat}&lon=${lon}`, {
            headers: {
                'Authorization': `Bearer ${process.env.WEATHER_AI_KEY}`
            }
        });
        
        if (!res.ok) {
            throw new Error(`Weather API error: ${res.statusText}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
};
export default getWeather;