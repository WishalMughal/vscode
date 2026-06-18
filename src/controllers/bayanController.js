import { Bayan } from "../models/index.js";

export const listBayans = async (req, res) => {
  try {
    const where = {};

    if (req.query.weekly === "1" || req.query.weekly === "true") {
      where.weekly = true;
    }

    if (req.query.today === "1" || req.query.today === "true") {
      where.today = true;
    }

    const data = await Bayan.findAll({
      where,
      order: [["createdAt", "DESC"]],
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBayan = async (req, res) => {
  try {
    const {
      title,
      youtubeUrl,
      weekly = false,
      today = false,
      isLive = false,
    } = req.body;

    const item = await Bayan.create({
      title,
      youtubeUrl,
      weekly,
      today,
      isLive,
      createdBy: req.user?.id || null,
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
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

    return res.json({
      status: true,
      data: liveBayan,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};