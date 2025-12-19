import express from 'express';
import dotenv from 'dotenv';
import { Db, MongoClient } from 'mongodb';
import tripRoutes from './routes/trip.routes';
import userAuth from './routes/userAuth.routes';
dotenv.config();
const app = express();
app.use(express.json());
const port = Number(process.env.PORT) || 5000;
console.log(port);

app.get("/", (req, res) => {
    res.send("Hello World");
});

// Routes to use
app.use("/trips", tripRoutes);
app.use("/auth", userAuth);

const uri = process.env.MONGO_URI;

async function startServer() {
    let db: Db;
    if (!uri) {
        throw new Error("MONGO_URI is not defined");
    }
    const client = new MongoClient(uri);
    try {
        await client.connect();
        db = client.db("travelogueDB");
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