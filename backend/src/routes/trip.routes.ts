import { Router } from "express";
import {getTrips} from "../controllers/trips.controller";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.get('/', authMiddleware, getTrips);

export default router;