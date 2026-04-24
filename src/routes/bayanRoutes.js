import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { listBayans, createBayan } from "../controllers/bayanController.js";
const router = Router();
router.get("/", listBayans);
router.post("/", auth(["admin"]), createBayan);
export default router;
