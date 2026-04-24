import { Router } from "express";
import { getChannel, getPlaylists, getLive } from "../controllers/youtubeController.js";

const router = Router();
router.get("/channel", getChannel);
router.get("/playlists", getPlaylists);
router.get("/live", getLive);
export default router;
