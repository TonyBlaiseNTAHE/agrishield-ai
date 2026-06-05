import Farm from "../models/Farm.js";
import getWeather from "../services/weatherAI.service.js";
import { saveWeatherSnapshot } from "../services/weatherSnapshot.service.js";
import { generateAdvisory } from "../services/advisory.service.js";
import { detectAlerts } from "../services/alert.service.js";


const getFarmInsight = async (req, res) => {
    try {
        const { farmId } = req.params;
        const farm = await Farm.findById(farmId);
        if (!farm) {
            return res.status(404).json({
                success: false,
                message: 'Farm not found'
            });
        }
        const weather = await getWeather(farm.latitude, farm.longitude);

        const snapshot = await saveWeatherSnapshot(farm._id, weather);
        const advisories = generateAdvisory(weather);
        const alerts = detectAlerts(weather);

        res.status(200).json({
            success: true,
            data: {
                farm,
                weather,
                snapshot,
                advisories,
                alerts
            }
        }); 
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export { getFarmInsight };