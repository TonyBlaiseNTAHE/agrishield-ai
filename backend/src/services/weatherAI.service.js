
import fetch from 'node-fetch';
import https from 'https';
const getWeather = async (lat, lon) => {
    try {
        const apiKey = process.env.WEATHER_AI_KEY;
        const httpsAgent = new https.Agent({ servername: 'api.weatherai.co' });
        const res = await fetch(`https://api.weatherai.co/v1/weather?lat=${lat}&lon=${lon}`, {
            agent: httpsAgent,
            headers: {
                'Authorization': `Bearer ${process.env.WEATHER_AI_KEY}`
            }
        });
        console.log("API KEY:", apiKey);
        
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