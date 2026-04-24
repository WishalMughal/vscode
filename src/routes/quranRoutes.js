import { Router } from "express";
import { listSurahs, getSurah, getJuz } from "../controllers/quranController.js";
const router = Router();
router.get("/list", listSurahs);
router.get("/surah/:id", getSurah);
router.get("/juz/:id", getJuz);
export default router;
