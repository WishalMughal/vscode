import { Announcement } from "../models/index.js";

export const listAnnouncements = async (req, res) => {
  try {
    const data = await Announcement.findAll({ where: { active: true }, order: [["createdAt", "DESC"]] });
    res.json(data);
  } catch (error) {
    console.error("List Announcement Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const createAnnouncement = async (req, res) => {
  try {
    const { title, message, active = true } = req.body;
    const image = req.file ? `/uploads/announcements/${req.file.filename}` : null;

    const item = await Announcement.create({
      title,
      message,
      image,
      active: active === "true" || active === true,
      createdBy: req.user?.id,
    });

    res.status(201).json(item);
  } catch (error) {
    console.error("Create Announcement Error:", error);
    res.status(500).json({ message: error.message });
  }
};