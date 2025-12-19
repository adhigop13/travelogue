import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    time: {
        type: Date
    },
    taskDescription: {
        type: String
    },
    location: {
        type: String
    },
    notes: {
        type: String
    }
});

const Task = mongoose.model('Task', taskSchema);
export default Task;