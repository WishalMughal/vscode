import { Router } from "express";
import { auth } from "../middleware/auth.js";
import multer from "multer";
import fs from "fs";
import path from "path";

import {
  listAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from "../controllers/announcementController.js";

const router = Router();

const uploadPath = "uploads/announcements";

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error("Only JPG, PNG, and WEBP images are allowed"), false);
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

const uploadImage = (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        message: err.message,
      });
    }

    next();
  });
};

// Public
router.get("/", listAnnouncements);

// Admin create
// title/message/image are all optional,
// but controller requires at least one of them.
router.post(
  "/",
  auth(["admin"]),
  uploadImage,
  createAnnouncement
);

// Admin update
router.put(
  "/:id",
  auth(["admin"]),
  uploadImage,
  updateAnnouncement
);

// Admin delete
router.delete(
  "/:id",
  auth(["admin"]),
  deleteAnnouncement
);

export default router;