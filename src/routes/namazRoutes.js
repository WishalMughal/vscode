import { Router } from "express";
import { getKarachiTiming, getCityTiming, getCoordsTiming } from "../controllers/namazController.js";
const router = Router();
router.get("/karachi", getKarachiTiming);
router.get("/city", getCityTiming);
router.get("/coords", getCoordsTiming);
export default router;
