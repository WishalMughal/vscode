import { Bayan } from "../models/index.js";

const toBoolean = (value, defaultValue = false) => {
  if (value === undefined || value === null) return defaultValue;

  return (
    value === true ||
    value === "true" ||
    value === 1 ||
    value === "1"
  );
};

export const listBayans = async (req, res) => {
  try {
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

    const item = await Bayan.create({
      title,
      youtubeUrl,
      weekly: toBoolean(req.body.weekly),
      today: toBoolean(req.body.today),
      isLive: toBoolean(req.body.isLive),
      playlist: toBoolean(req.body.playlist),
      createdBy: req.user?.id || req.user?.userId || null,
    });

    return res.status(201).json({
      message: "Bayan saved successfully",
      data: item,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      sqlMessage: error?.parent?.sqlMessage,
    });
  }
};

export const getLiveBayan = async (req, res) => {
  try {
    const liveBayan = await Bayan.findOne({
      where: {
        isLive: true,
      },
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