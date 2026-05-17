import mongoose from "mongoose";

export interface Day {
    dayName: String,
    date: Date,
    tasks: mongoose.Schema.Types.ObjectId
}
