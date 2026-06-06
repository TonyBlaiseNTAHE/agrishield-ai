import WeatherSnapshot from '../models/WeatherSnapshot.js';
import { getPlantingAdvice } from '../services/planting.service.js';
import { checkWeatherRisks } from '../services/alert.service.js';

export const getFarmerRecommendation = async (req, res) => {
    try {
        const { farmId, crop = 'maize' } = req.params;
        
        // Use your existing weather data
        const latestWeather = await WeatherSnapshot.findOne({ farmId })
            .sort({ forecastDate: -1 });
        
        if (!latestWeather) {
            return res.status(404).json({ 
                message: "No weather data available for this farm" 
            });
        }
        
        const plantingAdvice = getPlantingAdvice(latestWeather, crop);
        const risks = checkWeatherRisks(latestWeather);
        
        res.json({
            success: true,
            data: {
                currentWeather: {
                    temperature: latestWeather.temperature,
                    humidity: latestWeather.humidity,
                    windSpeed: latestWeather.windSpeed,
                    condition: latestWeather.weatherCondition
                },
                plantingAdvice,
                alerts: risks,
                timestamp: latestWeather.forecastDate
            }
        });
        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};