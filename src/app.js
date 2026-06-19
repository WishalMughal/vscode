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
import adminContentRoutes from "./routes/adminContentRoutes.js";
import bannerRoutes from "./routes/bannerRoutes.js";

import { PrivacyPolicy } from "./models/index.js"; // ✅ ADD THIS
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) =>
  res.json({ ok: true, service: "Islamic Academy API (Phase A)" })
);

// ===================== ✅ PUBLIC PRIVACY POLICY PAGE =====================
app.get("/privacy-policy", async (req, res) => {
  try {
    const policy = await PrivacyPolicy.findOne({
      order: [["updatedAt", "DESC"]],
    });

    const title = policy?.title || "Privacy Policy";
    const content =
      policy?.content ||
      "Privacy policy content will be updated soon.";

    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background: #f6f8fb;
            color: #222;
            line-height: 1.7;
            padding: 24px;
            max-width: 900px;
            margin: auto;
          }
          .card {
            background: white;
            padding: 28px;
            border-radius: 18px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.06);
          }
          h1 { color: #0D8B6F; }
          pre {
            white-space: pre-wrap;
            font-family: inherit;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>${title}</h1>
          <pre>${content}</pre>
        </div>
      </body>
      </html>
    `);
  } catch (e) {
    res.status(500).send("Failed to load privacy policy");
  }
});
// ========================================================================

// ✅ All API routes
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
app.use("/api/banners", bannerRoutes);

app.use("/api/admin-content", adminContentRoutes);

// ❗ Always last
app.use(errorHandler);

export default app;