import { Router } from "express";

import { auth } from "../middleware/auth.js";
import {
  exportStudentsExcel,
} from "../controllers/exportController.js";

const router = Router();

// Admin-only student Excel export
router.get(
  "/students",
  auth(["admin"]),
  exportStudentsExcel
);

export default router;