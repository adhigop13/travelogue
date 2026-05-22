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
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task", //reference task model
        required: true
    }]
});

const DayModel = mongoose.model("Day", daySchema);
export default DayModel;