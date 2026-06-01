import { Router } from "express";
import {getTrips, createTrip, addNewDay, addNewTask} from "../controllers/trips.controller";
import requireSignIn from "../middleware/authMiddleware";

const router = Router();

router.get('/', requireSignIn, getTrips);

router.post('/createTrip', requireSignIn, createTrip);

router.post('/addDay', requireSignIn, addNewDay);
router.post('/addTask', requireSignIn, addNewTask);
export default router;  