import { Zikar } from "../models/index.js";
import { Op } from "sequelize";

export const listZikar = async (req, res) => {
  const { category } = req.query;
  const where = {};
  if (category) where.category = category;
  const data = await Zikar.findAll({ where, order: [["createdAt", "DESC"]] });
  res.json(data);
};

// GET /api/zikar/random?category=dua
export const randomZikar = async (req, res) => {
  const { category } = req.query;
  const where = {};
  if (category) where.category = category;
  const count = await Zikar.count({ where });
  if (!count) return res.json(null);
  const offset = Math.floor(Math.random() * count);
  const item = await Zikar.findOne({ where, offset, order: [["id", "ASC"]] });
  res.json(item);
};
export const createZikar = async (req, res) => {
  const { arabic, urdu, category } = req.body;
  const z = await Zikar.create({ arabic, urdu, category, createdBy: req.user.id });
  res.json(z);
};
