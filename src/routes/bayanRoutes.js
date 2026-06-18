import { Router } from "express";
import { auth } from "../middleware/auth.js";
import {
  listBayans,
  createBayan,
  getLiveBayan,
} from "../controllers/bayanController.js";

const router = Router();

router.get("/", listBayans);

router.get("/live", getLiveBayan);

router.post("/", auth(["admin"]), createBayan);

export default router;