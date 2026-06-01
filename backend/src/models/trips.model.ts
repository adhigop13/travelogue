import mongoose, { mongo } from "mongoose";

const tripSchema = new mongoose.Schema({
    tripName: {
        type: String,
        required: true,
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
tripSchema.index({ tripOwner: 1, tripName: 1 }, { unique: true });

const TripModel = mongoose.model("Trip", tripSchema);
export default TripModel;
