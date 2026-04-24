import { Book } from "../models/index.js";
export const listBooks = async (req, res) => {
  const data = await Book.findAll({ order: [["createdAt", "DESC"]] });
  res.json(data);
};
export const createBook = async (req, res) => {
  const { title, author, pdfUrl, category } = req.body;
  const book = await Book.create({ title, author, pdfUrl, category, createdBy: req.user.id });
  res.json(book);
};
export const updateBook = async (req, res) => {
  const { id } = req.params;
  await Book.update(req.body, { where: { id } });
  res.json({ msg: "Book updated" });
};
export const deleteBook = async (req, res) => {
  const { id } = req.params;
  await Book.destroy({ where: { id } });
  res.json({ msg: "Book deleted" });
};
