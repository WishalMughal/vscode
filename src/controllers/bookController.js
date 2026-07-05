import { Book } from "../models/index.js";

// =====================
// LIST BOOKS
// =====================
export const listBooks = async (req, res) => {
  try {
    const data = await Book.findAll({
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json(data);
  } catch (error) {
    console.error("List Books Error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// =====================
// CREATE BOOK
// =====================
export const createBook = async (req, res) => {
  try {
    const {
      title,
      author,
      pdfUrl,
      category,
    } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    if (!pdfUrl?.trim()) {
      return res.status(400).json({
        message: "PDF URL is required",
      });
    }

    const book = await Book.create({
      title: title.trim(),
      author: author?.trim() || "",
      pdfUrl: pdfUrl.trim(),
      category: category?.trim() || "",
      createdBy:
        req.user?.id ||
        req.user?.userId ||
        null,
    });

    return res.status(201).json({
      message: "Book added successfully",
      data: book,
    });
  } catch (error) {
    console.error("Create Book Error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// =====================
// UPDATE BOOK
// =====================
export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    await book.update(req.body);

    return res.status(200).json({
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    console.error("Update Book Error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// =====================
// DELETE BOOK
// =====================
export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Book.destroy({
      where: { id },
      force: true, // permanently remove from database
    });

    if (!deleted) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    return res.status(200).json({
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.error("Delete Book Error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};