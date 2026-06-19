import { Router } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { auth } from "../middleware/auth.js";

import {
  listBanners,
  createBanner,
  deleteBanner,
} from "../controllers/bannerController.js";

const router = Router();

const uploadPath = "uploads/banners";

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});

const upload = multer({ storage });

router.get("/", listBanners);
router.post("/", auth(["admin"]), upload.single("image"), createBanner);
router.delete("/:id", auth(["admin"]), deleteBanner);

export default router;