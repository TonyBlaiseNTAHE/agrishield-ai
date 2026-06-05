import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
    farmId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Farm",
        required: true
    },
    type: {
        type: String,
        enum: ['flood', 'drought', 'pest', 'disease', 'frost', 'heatwave', 'wind'],
    },
    message: {
        type: String,
        required: true
    },
    severity: {
        type: String,
        enum: ['Low', 'Medium', 'High']
    },
    isresolved: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Alert = mongoose.model("Alert", alertSchema);

export default Alert;