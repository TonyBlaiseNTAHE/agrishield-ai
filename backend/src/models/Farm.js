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
    latitude: Number,
    longitude: Number,
    area: Number,
    soilType: String,
    irrigationType: String
}, { timestamps: true });   

const Farm = mongoose.model("Farm", farmSchema);