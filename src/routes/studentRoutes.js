import { Router } from "express";
import { auth } from "../middleware/auth.js";
import multer from "multer";
import fs from "fs";
import path from "path";

import {
  listStudents,
  getStudentById,
  getMyStudentRecord,
  createAdmission,
  createRenewal,
  uploadMyProfileImage,
  uploadMyDocuments,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";

const router = Router();

// ==========================================
// Upload Configuration
// ==========================================

const uploadPath = "uploads/students";

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;

    cb(null, fileName);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, //10MB
  },
});

const uploadStudentFiles = upload.fields([
  {
    name: "profileImage",
    maxCount: 1,
  },
  {
    name: "studentDocument",
    maxCount: 1,
  },
  {
    name: "fatherCnic",
    maxCount: 1,
  },
  {
    name: "educationalDocument",
    maxCount: 1,
  },
]);

// ==========================================
// ADMIN ROUTES
// ==========================================

// All students
router.get(
  "/",
  auth(["admin"]),
  listStudents
);

// Student detail
router.get(
  "/:id",
  auth(["admin"]),
  getStudentById
);

// Update student
router.patch(
  "/:id",
  auth(["admin"]),
  uploadStudentFiles,
  updateStudent
);

// Delete student
router.delete(
  "/:id",
  auth(["admin"]),
  deleteStudent
);

// ==========================================
// STUDENT ROUTES
// ==========================================

// My profile
router.get(
  "/me",
  auth(["student", "admin"]),
  getMyStudentRecord
);

// Admission Form
router.post(
  "/admission",
  auth(["student", "admin"]),
  uploadStudentFiles,
  createAdmission
);

// Renewal Form
router.post(
  "/renewal",
  auth(["student", "admin"]),
  createRenewal
);

// Upload profile image
router.post(
  "/me/profile-image",
  auth(["student", "admin"]),
  upload.single("profileImage"),
  uploadMyProfileImage
);

// Upload student documents
router.post(
  "/me/documents",
  auth(["student", "admin"]),
  uploadStudentFiles,
  uploadMyDocuments
);

export default router;