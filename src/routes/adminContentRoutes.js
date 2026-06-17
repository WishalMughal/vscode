import { Router } from "express";
import {
  createOrUpdateMasjidTiming,
  getMasjidTiming,
  createOrUpdatePrivacyPolicy,
  getPrivacyPolicy,
} from "../controllers/adminContentController.js";

const router = Router();

router.get("/masjid-timing", getMasjidTiming);
router.post("/masjid-timing", createOrUpdateMasjidTiming);

router.get("/privacy-policy", getPrivacyPolicy);
router.post("/privacy-policy", createOrUpdatePrivacyPolicy);

export default router;