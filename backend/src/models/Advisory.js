import mongoose from 'mongoose';

const advisorySchema = new mongoose.Schema({
    farmId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Farm",
    },
    message: {
        type: String,
        required: true
    },
    risklevel: {
        type: String,
        enum: ['Low', 'Medium', 'High']
    }
}, { timestamps: true });

const Advisory = mongoose.model("Advisory", advisorySchema);

export default Advisory;