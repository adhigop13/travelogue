import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    dayId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    time: {
        type: String
    },
    location: {
        type: String
    },
    notes: {
        type: String
    }
});

const TaskModel = mongoose.model('Task', taskSchema);
export default TaskModel;