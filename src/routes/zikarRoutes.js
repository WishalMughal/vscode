import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { listZikar, randomZikar, createZikar } from "../controllers/zikarController.js";
const router = Router();
router.get("/", listZikar);
router.get("/random", randomZikar);
router.post("/", auth(["admin"]), createZikar);
export default router;
