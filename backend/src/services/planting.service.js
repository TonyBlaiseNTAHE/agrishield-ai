
const analyzePlantingWindow = (weather) => {
  const temp = weather.temperature;
  const rain = weather.rainProbability;
  const wind = weather.windSpeed;

  let score = 50;

  if (temp >= 20 && temp <= 30) score += 25;
  if (rain >= 30 && rain <= 70) score += 20;
  if (wind < 20) score += 10;

  let status = "UNSUITABLE";
  let recommendation = "Wait before planting";

  if (score >= 80) {
    status = "OPTIMAL";
    recommendation = "Good planting window in next 3–5 days";
  } else if (score >= 60) {
    status = "MODERATE";
    recommendation = "Possible planting, monitor weather closely";
  }

  return {
    score,
    status,
    recommendation
  };
};

export default analyzePlantingWindow;