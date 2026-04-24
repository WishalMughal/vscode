import { Announcement } from "../models/index.js";

export const listAnnouncements = async (req, res) => {
  const data = await Announcement.findAll({ where: { active: true }, order: [["createdAt","DESC"]] });
  res.json(data);
};

export const createAnnouncement = async (req, res) => {
  const { title, message, active=true } = req.body;
  const item = await Announcement.create({ title, message, active, createdBy: req.user.id });
  res.json(item);
};
