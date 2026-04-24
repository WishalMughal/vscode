import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { createContact, listContacts } from "../controllers/contactController.js";
const router = Router();
router.post("/", createContact);
router.get("/", auth(["admin"]), listContacts);
export default router;
