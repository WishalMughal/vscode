import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import bayanRoutes from "./routes/bayanRoutes.js";
import announcementRoutes from "./routes/announcementRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import zikarRoutes from "./routes/zikarRoutes.js";
import namazRoutes from "./routes/namazRoutes.js";
import quranRoutes from "./routes/quranRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import weatherRoutes from "./routes/weatherRoutes.js";
import youtubeRoutes from "./routes/youtubeRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.json({ ok: true, service: "Islamic Academy API (Phase A)" }));

app.use("/api/auth", authRoutes);
app.use("/api/bayans", bayanRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/zikar", zikarRoutes);
app.use("/api/namaz", namazRoutes);
app.use("/api/quran", quranRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/youtube", youtubeRoutes);

app.use(errorHandler);
export default app;
