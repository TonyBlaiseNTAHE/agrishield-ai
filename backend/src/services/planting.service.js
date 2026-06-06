// Simple planting logic based on weather snapshot
export const getPlantingAdvice = (weatherSnapshot, cropType = 'maize') => {
    const { temperature, humidity, windSpeed } = weatherSnapshot;
    
    // Simple rules for assessment
    const tempIdeal = temperature >= 18 && temperature <= 32;
    const humidityIdeal = humidity >= 60;
    const windIdeal = windSpeed <= 20;
    
    if (tempIdeal && humidityIdeal && windIdeal) {
        return {
            canPlant: true,
            message: "✅ Perfect conditions! Consider planting today.",
            confidence: "high"
        };
    } else if (tempIdeal && humidityIdeal) {
        return {
            canPlant: true,
            message: "⚠️ Good conditions, but watch the wind.",
            confidence: "medium"
        };
    } else {
        return {
            canPlant: false,
            message: `❌ Wait ${getWaitDays(weatherSnapshot)} days for better conditions.`,
            confidence: "high"
        };
    }
};