import { Router } from "express";
import {getTrips} from "../controllers/trips.controller";
import requireSignIn from "../middleware/authMiddleware";

const router = Router();

router.get('/', requireSignIn, getTrips);

export default router;