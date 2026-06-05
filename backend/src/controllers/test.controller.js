import getWeather from '../services/weatherAI.service.js';

const testWeatherAI = async (req, res) => {
    try {  
        const { lat, lon } = req.query;
        if (!lat || !lon) {
            return res.status(400).json({
                success: false,
                message: 'Latitude and longitude are required'
            });
        }
        const weatherData = await getWeather(lat, lon);
        res.status(200).json({
            success: true,
            data: weatherData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export { testWeatherAI };