const generateAdvisory = async (weather) => {
    const advisories = [];

    if (weather.temperature >=20 && weather.temperature <= 30) {
        advisories.push("temperature is suitable for planting.");
    }

    if (weather.windSpeed > 25) {
        advisories.push("strong winds expected. delay spraying activities.");

    }
    if (weather.precipitation > 20) {
        advisories.push("rain expected.consider planting within the next few days");
    }
    if (advisories.length === 0) {
        advisories.push("monitor weather conditions before taking action.");
    }
    return advisories;
};