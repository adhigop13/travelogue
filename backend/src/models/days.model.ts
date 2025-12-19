import mongoose from "mongoose";

const daySchema = new mongoose.Schema({
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

const Day = mongoose.model("Days", daySchema);
export default Day;