import fetch from "node-fetch";
import { ok, fail } from "../utils/response.js";

// Simple weather proxy (no API key) using Open-Meteo.
// GET /api/weather?lat=24.86&lon=67.00
export const getWeather = async (req, res) => {
  try {
    const lat = Number(req.query.lat);
    const lon = Number(req.query.lon);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
      return fail(res, "lat and lon are required", 400);
    }

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&timezone=auto`;
    const r = await fetch(url);
    const j = await r.json();
    ok(res, j);
  } catch (e) {
    fail(res, "Failed to fetch weather");
  }
};
