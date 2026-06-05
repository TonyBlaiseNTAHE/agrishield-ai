import mongoose from 'mongoose';


const weatherSnapshotSchema = new mongoose.Schema({
    farmId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Farm",
        required: true
    },
    temperature: {
        type: Number,
        required: true
    },
    humidity: {
        type: Number,
        required: true
    },
    rainfall: {
        type: Number,
        required: true
    },
    windSpeed: {
        type: Number,
        required: true
    },
    forecastDate: {
        type: Date,
        required: true
    },
    rawData: {
        type: Object,
        required: true
    },
    precipitation: {
        type: Number,
        required: true
    },
    weatherCondition: {
        type: String,
        required: true
    },
    snapshotDate: {
        type: Date,
        default: Date.now
    },
}, { timestamps: true });

const WeatherSnapshot = mongoose.model("WeatherSnapshot", weatherSnapshotSchema);

export default WeatherSnapshot;