import { Router } from "express";
import { auth } from "../middleware/auth.js";
import multer from "multer";
import fs from "fs";
import path from "path";
import { listAnnouncements, createAnnouncement } from "../controllers/announcementController.js";
const router = Router();
const uploadPath = "uploads/announcements";
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath,{recursive:true});
const storage = multer.diskStorage({
 destination:(req,file,cb)=>cb(null,uploadPath),
 filename:(req,file,cb)=>cb(null,Date.now()+"-"+Math.round(Math.random()*1e9)+path.extname(file.originalname))
});
const upload=multer({storage,limits:{fileSize:5*1024*1024}});
router.get("/", listAnnouncements);
router.post("/", auth(["admin"]), upload.single("image"), createAnnouncement);
export default router;