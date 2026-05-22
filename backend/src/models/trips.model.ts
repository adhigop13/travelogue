import mongoose, { mongo } from "mongoose";

const tripSchema = new mongoose.Schema({
    tripName: {
        type: String,
        required: true,
        unique: true
    },
    daysArray: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Day",
        required: true
    }],
    tripOwner: {
        type: String,
        ref: "User",
        required: true
    }
});

const TripModel = mongoose.model("Trip", tripSchema);
export default TripModel;
