import { Bayan } from "../models/index.js";

export const listBayans = async (req, res) => {
  const where = {};
  // Optional filters: /api/bayans?weekly=1 or ?today=1
  if (req.query.weekly === "1" || req.query.weekly === "true") where.weekly = true;
  if (req.query.today === "1" || req.query.today === "true") where.today = true;

  const data = await Bayan.findAll({ where, order: [["createdAt", "DESC"]] });
  res.json(data);
};

export const createBayan = async (req, res) => {
  const { title, youtubeUrl, weekly=false, today=false } = req.body;
  const item = await Bayan.create({ title, youtubeUrl, weekly, today, createdBy: req.user.id });
  res.json(item);
};
