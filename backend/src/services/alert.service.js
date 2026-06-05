export const detectAlerts = (weather) => {
  const alerts = [];

  if (weather.windSpeed > 40) {
    alerts.push({
      type: "WIND",
      severity: "HIGH",
      message: "Extreme winds expected."
    });
  }

  if (weather.temperature > 38) {
    alerts.push({
      type: "DROUGHT",
      severity: "HIGH",
      message: "High temperature may stress crops."
    });
  }

  return alerts;
};