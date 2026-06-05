import WeatherSnapshot from "../models/WeatherSnapshot.js";

const saveWeatherSnapshot = async (farmId, weatherData) => {
    return await WeatherSnapshot.create({
        farmId,
        temperature: weatherData.temperature,
        humidity: weatherData.humidity,
        rainfall: weatherData.rainfall,
        windSpeed: weatherData.windSpeed,
        forecastDate: weatherData.forecastDate,
        rawData: weatherData.rawData,
        precipitation: weatherData.precipitation,
        weatherCondition: weatherData.weatherCondition
    });
};

export { saveWeatherSnapshot };