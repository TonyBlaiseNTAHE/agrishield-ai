import mongoose  from "mongoose";

const farmSchema = new mongoose.Schema({
    farmerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Farmer",
        required: true
    },
    cropType: {
        type: String,
        required: true
    },
    location: String,
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    size: {
        type: Number,
        default: 0
    },
    soilType: String,
    irrigationType: String
}, { timestamps: true });   

const Farm = mongoose.model("Farm", farmSchema);
export default Farm;