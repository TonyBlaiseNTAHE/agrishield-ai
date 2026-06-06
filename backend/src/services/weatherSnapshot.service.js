import WeatherSnapshot from "../models/WeatherSnapshot.js";

const saveWeatherSnapshot = async (farmId, weatherData) => {
    const current = weatherData.data?.current || weatherData.current;
    const hourly = weatherData.data?.hourly || weatherData.hourly || [];
    
    if (!current) {
        throw new Error("Weather data missing 'current' property");
    }
    
    // Extract the hour from current time (e.g., "2026-06-05T23:15" -> "2026-06-05T23:00")
    const currentHour = current.time.substring(0, 13) + ":00";
    
    // Find the hourly entry that matches the current hour
    const currentHourly = hourly.find(h => h.time === currentHour);
    
    // Get humidity from hourly data, fallback to current if available
    const humidity = currentHourly?.humidity ?? current.humidity;
    
    if (humidity === undefined && humidity !== 0) {
        throw new Error(`Humidity not found for hour: ${currentHour}. Available hourly times: ${hourly.slice(0, 3).map(h => h.time).join(', ')}...`);
    }

    return await WeatherSnapshot.create({
        farmId,
        temperature: current.temperature,
        humidity: humidity,
        rainfall: current.precipitation || currentHourly?.precipitation || 0,
        precipitation: current.precipitation || currentHourly?.precipitation || 0,
        windSpeed: current.wind_speed,
        forecastDate: current.time,
        weatherCondition: current.condition_code,
        rawData: weatherData
    });
};

export { saveWeatherSnapshot };