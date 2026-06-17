import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { listBooks, createBook, updateBook, deleteBook } from "../controllers/bookController.js";
const router = Router();
router.get("/", listBooks);
router.post("/", auth(["admin"]), createBook);
router.put("/:id", auth(["admin"]), updateBook);
router.delete("/:id", auth(["admin"]), deleteBook);
export default router;
