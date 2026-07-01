import fetch from "node-fetch";
import { MasjidTiming, PrivacyPolicy } from "../models/index.js";

const todayISO = () => new Date().toISOString().split("T")[0];

const getAutoMaghribTime = async (city = "Karachi") => {
  try {
    const date = todayISO();
    const selectedCity = city && city.trim() ? city.trim() : "Karachi";

    const resp = await fetch(
      `https://api.aladhan.com/v1/timingsByCity/${date}?city=${encodeURIComponent(
        selectedCity
      )}&country=Pakistan&method=1&school=1`
    );

    const data = await resp.json();

    return data?.data?.timings?.Maghrib || "06:45";
  } catch (error) {
    console.error("Auto Maghrib Error:", error);
    return "06:45";
  }
};

export const createOrUpdateMasjidTiming = async (req, res) => {
  try {
    const {
      masjidName,
      city,
      fajr,
      dhuhr,
      asr,
      isha,
      jumma,
      notes,
    } = req.body;

    if (!masjidName || !fajr || !dhuhr || !asr || !isha) {
      return res.status(400).json({
        msg: "masjidName, fajr, dhuhr, asr and isha are required",
      });
    }

    const maghrib = await getAutoMaghribTime(city);

    let timing = await MasjidTiming.findOne();

    if (timing) {
      await timing.update({
        masjidName,
        city,
        fajr,
        dhuhr,
        asr,
        maghrib,
        isha,
        jumma,
        notes,
      });
    } else {
      timing = await MasjidTiming.create({
        masjidName,
        city,
        fajr,
        dhuhr,
        asr,
        maghrib,
        isha,
        jumma,
        notes,
      });
    }

    return res.json({
      msg: "Masjid timing saved successfully",
      timing,
    });
  } catch (error) {
    console.error("createOrUpdateMasjidTiming error:", error);
    return res.status(500).json({
      msg: "Failed to save masjid timing",
      message: error.message,
    });
  }
};

export const getMasjidTiming = async (req, res) => {
  try {
    const timing = await MasjidTiming.findOne({
      order: [["updatedAt", "DESC"]],
    });

    return res.json({
      timing,
    });
  } catch (error) {
    console.error("getMasjidTiming error:", error);
    return res.status(500).json({ msg: "Failed to load masjid timing" });
  }
};

export const createOrUpdatePrivacyPolicy = async (req, res) => {
  try {
    const { title = "Privacy Policy", content } = req.body;

    if (!content || content.trim().isEmpty) {
      return res.status(400).json({
        msg: "Privacy policy content is required",
      });
    }

    let policy = await PrivacyPolicy.findOne();

    if (policy) {
      await policy.update({ title, content });
    } else {
      policy = await PrivacyPolicy.create({ title, content });
    }

    return res.json({
      msg: "Privacy policy saved successfully",
      policy,
    });
  } catch (error) {
    console.error("createOrUpdatePrivacyPolicy error:", error);
    return res.status(500).json({ msg: "Failed to save privacy policy" });
  }
};

export const getPrivacyPolicy = async (req, res) => {
  try {
    const policy = await PrivacyPolicy.findOne({
      order: [["updatedAt", "DESC"]],
    });

    return res.json({
      policy,
    });
  } catch (error) {
    console.error("getPrivacyPolicy error:", error);
    return res.status(500).json({ msg: "Failed to load privacy policy" });
  }
};