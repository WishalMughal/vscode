import { Router } from "express";

import { auth } from "../middleware/auth.js";
import {
  exportStudentsExcel,
} from "../controllers/exportController.js";

const router = Router();

// ==========================================
// ADMIN EXPORT ROUTES
// ==========================================

// Download all student records as Excel
router.get(
  "/students",
  auth(["admin"]),
  exportStudentsExcel
);

export default router;