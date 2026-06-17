import { ok } from "../utils/response.js";

// Configure via .env
// YOUTUBE_CHANNEL_URL=https://youtube.com/@YourChannel
// YOUTUBE_PLAYLISTS_JSON=[{"title":"Live Bayanat","url":"..."}]

export const getChannel = async (req, res) => {
  ok(res, {
    channelUrl: process.env.YOUTUBE_CHANNEL_URL || "",
  });
};

export const getPlaylists = async (req, res) => {
  let playlists = [];
  try {
    playlists = JSON.parse(process.env.YOUTUBE_PLAYLISTS_JSON || "[]");
  } catch (_) {
    playlists = [];
  }

  ok(res, {
    playlists,
  });
};

// Convenience live URL (many channels expose a /live shortcut)
export const getLive = async (req, res) => {
  const base = process.env.YOUTUBE_CHANNEL_URL || "";
  ok(res, {
    liveUrl: base ? `${base.replace(/\/$/, "")}/live` : "",
  });
};
