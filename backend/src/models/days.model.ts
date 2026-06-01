import mongoose from "mongoose";

const daySchema = new mongoose.Schema({
    tripId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trip",
        required: true
    },
    dayName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    tasksArray: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task", //reference task model
        required: true
    }]
});

daySchema.index({ tripId: 1, date: 1 }, { unique: true });
const DayModel = mongoose.model("Day", daySchema);
export default DayModel;