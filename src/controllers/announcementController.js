import { Announcement } from "../models/index.js";

// LIST
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
      message: error.message,
    });
  }
};

// CREATE
export const createAnnouncement = async (req, res) => {
  try {
    const { title, message, active = true } = req.body;

    const image = req.file
      ? `/uploads/announcements/${req.file.filename}`
      : null;

    const item = await Announcement.create({
      title,
      message,
      image,
      active:
        active === true ||
        active === "true" ||
        active === 1 ||
        active === "1",
      createdBy: req.user?.id || null,
    });

    return res.status(201).json(item);
  } catch (error) {
    console.error("Create Announcement Error:", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE
export const updateAnnouncement = async (req, res) => {
  try {
    const item = await Announcement.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Announcement not found",
      });
    }

    const image = req.file
      ? `/uploads/announcements/${req.file.filename}`
      : item.image;

    await item.update({
      title: req.body.title ?? item.title,
      message: req.body.message ?? item.message,
      image,
      active:
        req.body.active === undefined
          ? item.active
          : req.body.active === true ||
            req.body.active === "true" ||
            req.body.active === 1 ||
            req.body.active === "1",
    });

    return res.json(item);
  } catch (error) {
    console.error("Update Announcement Error:", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE
export const deleteAnnouncement = async (req, res) => {
  try {
    const item = await Announcement.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Announcement not found",
      });
    }

    await item.destroy();

    return res.json({
      message: "Announcement deleted successfully",
    });
  } catch (error) {
    console.error("Delete Announcement Error:", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};