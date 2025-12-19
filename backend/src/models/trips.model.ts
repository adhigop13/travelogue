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
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const Trip = mongoose.model("Trips", tripSchema);
export default Trip;
