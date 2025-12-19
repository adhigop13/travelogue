import { Request, Response } from 'express';
import Trip from '../models/trips.model';

export async function getTrips(req: Request, res: Response) {
    console.log("Endpoint hit!");
    try {
            const trips = Trip.find({tripOwner: res.locals.user._id})
            res.status(200).json({
            message: "Trips fetched",
            users: [],
        });
    }
    catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
}