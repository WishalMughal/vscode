import fetch from "node-fetch";
import { ok, fail } from "../utils/response.js";

export const listSurahs = async (req, res) => {
  try {
    const r = await fetch("https://api.alquran.cloud/v1/surah");
    const j = await r.json();
    ok(res, j.data);
  } catch (e) { fail(res, "Failed to load surah list"); }
};
export const getSurah = async (req, res) => {
  try {
    const id = req.params.id;
  //  const r = await fetch(`https://api.alquran.cloud/v1/surah/${id}/ur.maududi`);
   const r = await fetch(`https://api.alquran.cloud/v1/surah/${id}`);
    const j = await r.json();
    ok(res, j.data);
  } catch (e) { fail(res, "Failed to load surah"); }
};

// Juz (Para) endpoints
export const getJuz = async (req, res) => {
  try {
    const id = req.params.id;
    // alquran.cloud supports /juz/{id}/quran-uthmani (arabic)
    const r = await fetch(`https://api.alquran.cloud/v1/juz/${id}/quran-uthmani`);
    const j = await r.json();
    ok(res, j.data);
  } catch (e) {
    fail(res, "Failed to load juz");
  }
};
