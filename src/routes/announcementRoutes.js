import { Router } from "express";
import { auth } from "../middleware/auth.js";
import multer from "multer";

import {
  listAnnouncements,
  createAnnouncement,
} from "../controllers/announcementController.js";

const router = Router();

// ✅ Multer setup (basic local storage)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/announcements");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// ✅ GET all announcements (public or admin)
router.get("/", listAnnouncements);

// ✅ CREATE announcement (admin only + image upload)
router.post(
  "/",
  auth(["admin"]),
  upload.single("image"), // 👈 image field from admin form
  createAnnouncement
);

export default router;