import { Banner } from "../models/index.js";

export const listBanners = async (req, res) => {
  try {
    const data = await Banner.findAll({
      where: { active: true },
      order: [["createdAt", "DESC"]],
    });

    return res.json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createBanner = async (req, res) => {
  try {
    const title = (req.body.title || "").toString().trim();

    const image = req.file
      ? `/uploads/banners/${req.file.filename}`
      : null;

    if (!image) {
      return res.status(400).json({ message: "Banner image is required" });
    }

    const item = await Banner.create({
      title,
      image,
      active: true,
      createdBy: req.user?.id || null,
    });

    return res.status(201).json({
      message: "Banner saved successfully",
      data: item,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteBanner = async (req, res) => {
  try {
    const item = await Banner.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Banner not found" });
    }

    await item.destroy();

    return res.json({ message: "Banner deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};