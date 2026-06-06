export const checkWeatherRisks = (weatherSnapshot) => {
    const alerts = [];
    const { temperature, humidity, windSpeed, rainfall } = weatherSnapshot;
    
    if (temperature > 35) alerts.push("🔥 Heat stress risk - water crops");
    if (temperature < 10) alerts.push("❄️ Frost risk - protect seedlings");
    if (windSpeed > 30) alerts.push("💨 Strong winds - secure structures");
    if (humidity > 85) alerts.push("💧 High humidity - watch for fungal diseases");
    if (rainfall > 50) alerts.push("🌊 Heavy rain - check drainage");
    
    return alerts;
};
export const detectAlerts = (weather) => {
    const alerts = [];
    const { temperature, humidity, windSpeed, rainfall } = weather;
    
    if (temperature > 35) alerts.push({ type: 'heat', severity: 'high', message: "🔥 Heat stress risk - water crops" });
    if (temperature < 10) alerts.push({ type: 'frost', severity: 'high', message: "❄️ Frost risk - protect seedlings" });
    if (windSpeed > 30) alerts.push({ type: 'wind', severity: 'medium', message: "💨 Strong winds - secure structures" });
    if (humidity > 85) alerts.push({ type: 'humidity', severity: 'medium', message: "💧 High humidity - watch for fungal diseases" });
    if (rainfall > 50) alerts.push({ type: 'rain', severity: 'high', message: "🌊 Heavy rain - check drainage" });
    
    return alerts;
};