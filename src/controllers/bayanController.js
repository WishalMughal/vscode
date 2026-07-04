import { Bayan } from "../models/index.js";
import { Op } from "sequelize";

const toBoolean = (value, defaultValue = false) => {
  if (value === undefined || value === null) return defaultValue;

  return (
    value === true ||
    value === "true" ||
    value === 1 ||
    value === "1"
  );
};

// Disable expired live bayans
const expireOldLiveBayans = async () => {
  await Bayan.update(
    { isLive: false },
    {
      where: {
        isLive: true,
        liveExpiresAt: {
          [Op.lt]: new Date(),
        },
      },
    }
  );
};

// LIST
export const listBayans = async (req, res) => {
  try {
    await expireOldLiveBayans();

    const where = {};

    if (req.query.weekly === "1" || req.query.weekly === "true") {
      where.weekly = true;
    }

    if (req.query.today === "1" || req.query.today === "true") {
      where.today = true;
    }

    if (req.query.playlist === "1" || req.query.playlist === "true") {
      where.playlist = true;
    }

    if (req.query.isLive === "1" || req.query.isLive === "true") {
      where.isLive = true;
    }

    const data = await Bayan.findAll({
      where,
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      sqlMessage: error?.parent?.sqlMessage,
    });
  }
};

// CREATE
export const createBayan = async (req, res) => {
  try {
    const title = (req.body.title || "").toString().trim();
    const youtubeUrl = (req.body.youtubeUrl || "").toString().trim();

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    if (!youtubeUrl) {
      return res.status(400).json({ message: "YouTube URL is required" });
    }

    const isLive = toBoolean(req.body.isLive);
    const playlist = toBoolean(req.body.playlist);

    const liveExpiresAt = isLive
      ? new Date(Date.now() + 60 * 60 * 1000)
      : null;

    const item = await Bayan.create({
      title,
      youtubeUrl,
      weekly: toBoolean(req.body.weekly),
      today: toBoolean(req.body.today),
      isLive,
      playlist,
      liveExpiresAt,
      createdBy: req.user?.id || req.user?.userId || null,
    });

    return res.status(201).json({
      message: isLive
        ? "Live Bayan saved successfully. It will expire after 1 hour."
        : "Bayan saved successfully",
      data: item,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      sqlMessage: error?.parent?.sqlMessage,
    });
  }
};

// LIVE
export const getLiveBayan = async (req, res) => {
  try {
    await expireOldLiveBayans();

    const liveBayan = await Bayan.findOne({
      where: { isLive: true },
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      status: true,
      data: liveBayan,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
      sqlMessage: error?.parent?.sqlMessage,
    });
  }
};

// DELETE
export const deleteBayan = async (req, res) => {
  try {
    const deleted = await Bayan.destroy({
      where: { id: req.params.id },
    });

    if (!deleted) {
      return res.status(404).json({
        message: "Bayan not found",
      });
    }

    return res.status(200).json({
      message: "Bayan deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      sqlMessage: error?.parent?.sqlMessage,
    });
  }
};