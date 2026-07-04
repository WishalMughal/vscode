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
      sqlMessage: error?.parent?.sqlMessage,
    });
  }
};

// CREATE
export const createAnnouncement = async (req, res) => {
  try {
    const title = (req.body.title || "").toString().trim();
    const message = (req.body.message || "").toString().trim();
    const activeValue = req.body.active;

    // Image is optional
    const image = req.file
      ? `/uploads/announcements/${req.file.filename}`
      : null;

    // At least one field must exist
    if (!title && !message && !image) {
      return res.status(400).json({
        message: "Please add title, message, or image",
      });
    }

    const createdBy =
      req.user?.id ||
      req.user?.userId ||
      req.user?.uid ||
      null;

    const item = await Announcement.create({
      title: title || null,
      message: message || null,
      image,
      active:
        activeValue === undefined || activeValue === null
          ? true
          : activeValue === true ||
            activeValue === "true" ||
            activeValue === 1 ||
            activeValue === "1",
      createdBy,
    });

    return res.status(201).json({
      message: "Announcement saved successfully",
      data: item,
    });
  } catch (error) {
    console.error("Create Announcement Error:", error);

    return res.status(500).json({
      message: error.message,
      sqlMessage: error?.parent?.sqlMessage,
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

    const title =
      req.body.title !== undefined
        ? req.body.title.toString().trim()
        : item.title;

    const message =
      req.body.message !== undefined
        ? req.body.message.toString().trim()
        : item.message;

    const image = req.file
      ? `/uploads/announcements/${req.file.filename}`
      : item.image;

    // Prevent completely empty announcement
    if (!title && !message && !image) {
      return res.status(400).json({
        message: "Announcement must contain title, message, or image",
      });
    }

    await item.update({
      title: title || null,
      message: message || null,
      image,
      active:
        req.body.active === undefined ||
        req.body.active === null
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
      sqlMessage: error?.parent?.sqlMessage,
    });
  }
};

// DELETE
export const deleteAnnouncement = async (req, res) => {
  try {
    const deletedCount = await Announcement.destroy({
      where: { id: req.params.id },
      force: true,
    });

    if (deletedCount === 0) {
      return res.status(404).json({
        message: "Announcement not found",
      });
    }

    return res.status(200).json({
      message: "Announcement deleted successfully",
    });
  } catch (error) {
    console.error("Delete Announcement Error:", error);

    return res.status(500).json({
      message: error.message,
      sqlMessage: error?.parent?.sqlMessage,
    });
  }
};