import { Announcement } from "../models/index.js";

// LIST
export const listAnnouncements = async (req, res) => {
  try {
    const data = await Announcement.findAll({
      where: { active: true },
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json(data);
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
    console.log("ANNOUNCEMENT BODY:", req.body);
    console.log("ANNOUNCEMENT FILE:", req.file);
    console.log("ANNOUNCEMENT USER:", req.user);

    const title = (req.body.title || "").toString().trim();
    const message = (req.body.message || "").toString().trim();
    const activeValue = req.body.active;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
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
          : activeValue === true ||
            activeValue === "true" ||
            activeValue === 1 ||
            activeValue === "1",
      createdBy: req.user?.id || null,
    });

    return res.status(201).json({
      message: "Announcement saved successfully",
      data: item,
    });
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
    console.log("UPDATE ANNOUNCEMENT BODY:", req.body);
    console.log("UPDATE ANNOUNCEMENT FILE:", req.file);

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
      title: req.body.title !== undefined ? req.body.title : item.title,
      message: req.body.message !== undefined ? req.body.message : item.message,
      image,
      active:
        req.body.active === undefined || req.body.active === null
          ? item.active
          : req.body.active === true ||
            req.body.active === "true" ||
            req.body.active === 1 ||
            req.body.active === "1",
    });

    return res.status(200).json({
      message: "Announcement updated successfully",
      data: item,
    });
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

    return res.status(200).json({
      message: "Announcement deleted successfully",
    });
  } catch (error) {
    console.error("Delete Announcement Error:", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};