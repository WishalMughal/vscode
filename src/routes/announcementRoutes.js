import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { listAnnouncements, createAnnouncement } from "../controllers/announcementController.js";
const router = Router();
router.get("/", listAnnouncements);
router.post("/", auth(["admin"]), createAnnouncement);
export default router;
