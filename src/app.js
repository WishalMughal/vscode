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

import { PrivacyPolicy } from "./models/index.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

// ======================================================
// Middleware
// ======================================================

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// Uploaded files
app.use("/uploads", express.static("uploads"));

// ======================================================
// Root
// ======================================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    service: "Islamic Academy API",
    version: "1.0.0",
  });
});

// ======================================================
// Public Privacy Policy
// ======================================================

app.get("/privacy-policy", async (req, res) => {
  try {
    const policy = await PrivacyPolicy.findOne({
      order: [["updatedAt", "DESC"]],
    });

    const title =
      policy?.title || "Privacy Policy";

    const content =
      policy?.content ||
      "Privacy Policy will be updated soon.";

    res.send(`
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">

<title>${title}</title>

<style>

body{
background:#f5f7fb;
font-family:Arial,sans-serif;
padding:30px;
}

.container{
max-width:900px;
margin:auto;
background:#fff;
padding:30px;
border-radius:20px;
box-shadow:0 5px 20px rgba(0,0,0,.08);
}

h1{
color:#0D8B6F;
margin-bottom:20px;
}

pre{
white-space:pre-wrap;
font-family:inherit;
line-height:1.7;
}

</style>

</head>

<body>

<div class="container">

<h1>${title}</h1>

<pre>${content}</pre>

</div>

</body>

</html>
`);
  } catch (error) {
    console.error(error);

    res.status(500).send("Unable to load privacy policy.");
  }
});

// ======================================================
// API Routes
// ======================================================

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

// ======================================================
// 404 Handler
// ======================================================

app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found.",
  });
});

// ======================================================
// Error Handler
// ======================================================

app.use(errorHandler);

export default app;