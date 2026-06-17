import { Announcement } from "../models/index.js";

export const listAnnouncements = async (req, res) => {
  try {
    const data = await Announcement.findAll({
      where: { active: true },
      order: [["createdAt", "DESC"]],
    });

    return res.json(data);
  } catch (error) {
    console.error("List Announcement Error:", error);
    return res.status(500).json({
      msg: "Failed to load announcements",
      message: error.message,
    });
  }
};

export const createAnnouncement = async (req, res) => {
  try {
    const title = (req.body.title || "").toString().trim();
    const message = (req.body.message || "").toString().trim();
    const activeValue = req.body.active;

    if (!title) {
      return res.status(400).json({ msg: "Announcement title is required" });
    }

    if (!message) {
      return res.status(400).json({ msg: "Announcement message is required" });
    }

    const image = req.file
      ? `/uploads/announcements/${req.file.filename}`
      : null;

    const item = await Announcement.create({
      title,
      message,
      image,
      active:
        activeValue === undefined || activeValue === null
          ? true
          : activeValue === true || activeValue === "true" || activeValue === "1" || activeValue === 1,
      createdBy: req.user?.id || null,
    });

    return res.status(201).json({
      msg: "Announcement saved successfully",
      announcement: item,
    });
  } catch (error) {
    console.error("Create Announcement Error:", error);
    return res.status(500).json({
      msg: "Failed to save announcement",
      message: error.message,
    });
  }
};
