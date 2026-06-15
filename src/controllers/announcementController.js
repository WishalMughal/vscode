import { Announcement } from "../models/index.js";

export const listAnnouncements = async (req, res) => {
  try {
    const data = await Announcement.findAll({
      where: { active: true },
      order: [["createdAt", "DESC"]],
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createAnnouncement = async (req, res) => {
  try {
    const { title, message, image, active = true } = req.body;

    const item = await Announcement.create({
      title,
      message,
      image,
      active,
      createdBy: req.user.id,
    });

    res.json(item);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};