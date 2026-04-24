import fetch from "node-fetch";
import { ok, fail } from "../utils/response.js";

const todayISO = () => new Date().toISOString().split("T")[0];

// 🔥 Common params
const DEFAULT_METHOD = 1; // Karachi method
const HANAFI_SCHOOL = 1; // Hanafi

// 🔧 Clean timings (optional but recommended)
const cleanTimings = (timings = {}) => {
  const keys = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];
  const result = {};
  keys.forEach((k) => {
    if (timings[k]) result[k] = timings[k];
  });
  return result;
};

// ==========================
// ✅ Karachi Timing (Hanafi)
// ==========================
export const getKarachiTiming = async (req, res) => {
  try {
    const date = req.query.date || todayISO();

    const resp = await fetch(
      `https://api.aladhan.com/v1/timingsByCity/${date}?city=Karachi&country=Pakistan&method=${DEFAULT_METHOD}&school=${HANAFI_SCHOOL}`
    );

    const data = await resp.json();

    ok(res, {
      city: "Karachi",
      timings: cleanTimings(data.data.timings),
      meta: data.data.meta,
    });
  } catch (err) {
    console.error(err);
    fail(res, "Failed to fetch Karachi timings");
  }
};

// ==========================
// ✅ City Timing (Hanafi)
// ==========================
export const getCityTiming = async (req, res) => {
  try {
    const date = req.query.date || todayISO();
    const city = req.query.city;
    const country = req.query.country || "Pakistan";

    if (!city) return fail(res, "city is required", 400);

    const resp = await fetch(
      `https://api.aladhan.com/v1/timingsByCity/${date}?city=${encodeURIComponent(
        city
      )}&country=${encodeURIComponent(
        country
      )}&method=${DEFAULT_METHOD}&school=${HANAFI_SCHOOL}`
    );

    const data = await resp.json();

    ok(res, {
      city,
      timings: cleanTimings(data.data.timings),
      meta: data.data.meta,
    });
  } catch (err) {
    console.error(err);
    fail(res, "Failed to fetch city timings");
  }
};

// ==========================
// ✅ Coords Timing (Hanafi)
// ==========================
export const getCoordsTiming = async (req, res) => {
  try {
    const date = req.query.date || todayISO();
    const lat = Number(req.query.lat);
    const lon = Number(req.query.lon);

    if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
      return fail(res, "lat and lon are required", 400);
    }

    const resp = await fetch(
      `https://api.aladhan.com/v1/timings/${date}?latitude=${lat}&longitude=${lon}&method=${DEFAULT_METHOD}&school=${HANAFI_SCHOOL}`
    );

    const data = await resp.json();

    ok(res, {
      city: "Current Location",
      timings: cleanTimings(data.data.timings),
      meta: data.data.meta,
    });
  } catch (err) {
    console.error(err);
    fail(res, "Failed to fetch location timings");
  }
};