import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
  farmId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Farm",
    required: true
  },
  type: {
    type: String,
    enum: ["FROST", "HEAVY_RAIN", "DROUGHT", "HIGH_WIND", "EXTREME_HEAT"],
    required: true
  },
  severity: {
    type: String,
    enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
    required: true
  },
  message: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  resolvedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Alert", alertSchema);