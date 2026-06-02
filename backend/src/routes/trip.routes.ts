import { Router } from "express";
import {getTrips, createTrip, addNewDay, addNewTask, deleteTrip} from "../controllers/trips.controller";
import requireSignIn from "../middleware/authMiddleware";

const router = Router();

router.get('/', requireSignIn, getTrips);

router.post('/createTrip', requireSignIn, createTrip);
router.post('/addDay', requireSignIn, addNewDay);
router.post('/addTask', requireSignIn, addNewTask);

router.delete('/deleteTrip', requireSignIn, deleteTrip);
export default router;  