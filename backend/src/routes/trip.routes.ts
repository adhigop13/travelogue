import { Router } from "express";
import {getTrips, createTrip, addNewDay, addNewTask, deleteTrip, getTripDetails} from "../controllers/trips.controller";
import requireSignIn from "../middleware/authMiddleware";

const router = Router();

router.get('/', requireSignIn, getTrips);

router.post('/createTrip', requireSignIn, createTrip);
router.post('/addDay', requireSignIn, addNewDay);
router.post('/addTask', requireSignIn, addNewTask);

router.delete('/deleteTrip', requireSignIn, deleteTrip);

router.get('/getTripDetails', requireSignIn, getTripDetails);
export default router;  