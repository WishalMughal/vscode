import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";
import {
  listAnnouncements,
  createAnnouncement,
} from "../controllers/announcementController.js";

const router = Router();

router.get("/", listAnnouncements);

// 👇 IMPORTANT FIX HERE
router.post("/", auth(["admin"]), upload.single("image"), createAnnouncement);

export default router;