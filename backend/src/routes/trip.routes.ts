import { Router } from "express";
import {getTrips, createTrip} from "../controllers/trips.controller";
import requireSignIn from "../middleware/authMiddleware";

const router = Router();

router.get('/', requireSignIn, getTrips);

router.post('/createTrip', requireSignIn, createTrip);

export default router;  