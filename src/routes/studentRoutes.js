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
  updateMyProfile,
  uploadMyProfileImage,
  uploadMyDocuments,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";

const router = Router();

// ==========================================
// Upload Configuration
// ==========================================

const uploadPath = path.join(
  process.cwd(),
  "uploads",
  "students"
);

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, {
    recursive: true,
  });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const extension = path
      .extname(file.originalname)
      .toLowerCase();

    const fileName =
      `${Date.now()}-${Math.round(
        Math.random() * 1e9
      )}${extension}`;

    cb(null, fileName);
  },
});

const allowedMimeTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "application/pdf",
];

const upload = multer({
  storage,

  limits: {
    fileSize: 10 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(
        new Error(
          "Only JPG, JPEG, PNG, WEBP and PDF files are allowed"
        )
      );
    }

    cb(null, true);
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
// STUDENT ROUTES
// IMPORTANT: Keep these before /:id routes
// ==========================================

// Student views own profile
router.get(
  "/me",
  auth(["student", "admin"]),
  getMyStudentRecord
);
router.patch(
  "/me",
  auth(["student", "admin"]),
  updateMyProfile
);

// Student uploads profile image
router.post(
  "/me/profile-image",
  auth(["student", "admin"]),
  upload.single("profileImage"),
  uploadMyProfileImage
);

// Student uploads documents
router.post(
  "/me/documents",
  auth(["student", "admin"]),
  uploadStudentFiles,
  uploadMyDocuments
);

// Admission form
router.post(
  "/admission",
  auth(["student", "admin"]),
  uploadStudentFiles,
  createAdmission
);

// Renewal form
router.post(
  "/renewal",
  auth(["student", "admin"]),
  createRenewal
);

// ==========================================
// ADMIN ROUTES
// ==========================================

// List all students
router.get(
  "/",
  auth(["admin"]),
  listStudents
);

// View a student by ID
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
// Multer Error Handler
// ==========================================

router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        msg: "File size must not exceed 10 MB",
      });
    }

    return res.status(400).json({
      msg: error.message,
    });
  }

  if (error) {
    return res.status(400).json({
      msg: error.message || "File upload failed",
    });
  }

  next();
});

export default router;