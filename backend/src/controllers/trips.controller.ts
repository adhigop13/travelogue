import { Request, Response } from 'express';
import Trip from '../models/trips.model';

export async function getTrips(req: Request, res: Response) {
    console.log("Received trips!");
    try {
            console.log(res.locals.user.username)
            const tripOwner: string = res.locals.user.username;
            const trips = await Trip.find({tripOwner: tripOwner});
            console.log("Trips found:", trips);
            res.status(200).json(trips);
    }
    catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
}