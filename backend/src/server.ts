import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import tripRoutes from './routes/trip.routes';
import userAuth from './routes/userAuth.routes';
dotenv.config();
const app = express();

// Use the CORS middleware
app.use(cors({
    origin: 'http://localhost:3000', // Allow your specific frontend URL
    methods: ['GET', 'POST'],        // Allow these methods
    credentials: true                // Allow cookies/headers if needed
}));

app.use(express.json());
const port = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Hello World");
});

// Routes to use
app.use("/trips", tripRoutes);
app.use("/auth", userAuth);

const uri = process.env.MONGO_URI;

async function startServer() {
    if (!uri) {
        throw new Error("MONGO_URI is not defined");
    }
    if (!port) {
        throw new Error("Port not defined");
    }
    try {
        await mongoose.connect(uri, {dbName: 'travelogueDB'});        
        console.log("Database connected!");
    } catch (e) {
        console.error(e);
    }

    app.listen(port, () => {
        console.log("Server running on port: " + port);
    });
};


startServer().catch(console.error);
export default app;