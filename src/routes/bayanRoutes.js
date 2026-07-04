import { Router } from "express";
import { auth } from "../middleware/auth.js";

import {
  listBayans,
  createBayan,
  getLiveBayan,
  deleteBayan,
} from "../controllers/bayanController.js";

const router = Router();

// ==================== PUBLIC ROUTES ====================

// All bayans
// Examples:
// /api/bayans
// /api/bayans?weekly=true
// /api/bayans?today=true
// /api/bayans?playlist=true
// /api/bayans?isLive=true
router.get("/", listBayans);

// Current live bayan
router.get("/live", getLiveBayan);

// ==================== ADMIN ROUTES ====================

// Create bayan
router.post(
  "/",
  auth(["admin"]),
  createBayan
);

// Delete bayan (normal, weekly, today, playlist, live)
router.delete(
  "/:id",
  auth(["admin"]),
  deleteBayan
);

export default router;