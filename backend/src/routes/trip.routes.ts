import { Router } from "express";
import {getTrips, createTrip, addNewDay} from "../controllers/trips.controller";
import requireSignIn from "../middleware/authMiddleware";

const router = Router();

router.get('/', requireSignIn, getTrips);

router.post('/createTrip', requireSignIn, createTrip);

router.post('/addDay', requireSignIn, addNewDay);
export default router;  