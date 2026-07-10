import { Router } from "express";
import { auth } from "../middleware/auth.js";

import {
  listBooks,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";

const router = Router();

// ==================== PUBLIC ROUTES ====================

// Get all books
router.get("/", listBooks);

// ==================== ADMIN ROUTES ====================

// Create new book
router.post(
  "/",
  auth(["admin"]),
  createBook
);

// Update book
router.put(
  "/:id",
  auth(["admin"]),
  updateBook
);

// Delete book permanently from database
router.delete(
  "/:id",
  auth(["admin"]),
  deleteBook
);

// Test delete route
router.get("/delete-test/:id", (req, res) => {
  return res.status(200).json({
    status: true,
    message: "Book delete route working",
    bookId: req.params.id,
  });
});

export default router;