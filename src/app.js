import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";

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
import exportRoutes from "./routes/exportRoutes.js";

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

// ======================================================
// Uploads Configuration
// Must stay before API routes and the 404 handler
// ======================================================

const uploadsPath = path.join(
  process.cwd(),
  "uploads"
);

const studentsUploadsPath = path.join(
  uploadsPath,
  "students"
);

if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, {
    recursive: true,
  });
}

if (!fs.existsSync(studentsUploadsPath)) {
  fs.mkdirSync(studentsUploadsPath, {
    recursive: true,
  });
}

// Serve uploaded files publicly.
app.use(
  "/uploads",
  express.static(uploadsPath, {
    fallthrough: true,
    maxAge: "1d",
  })
);

// ======================================================
// Upload Diagnostics
// Remove /uploads-list after testing in production
// ======================================================

app.get("/uploads-check", (req, res) => {
  return res.json({
    success: true,
    uploadsPath,
    studentsUploadsPath,
    uploadsDirectoryExists:
      fs.existsSync(uploadsPath),
    studentsDirectoryExists:
      fs.existsSync(studentsUploadsPath),
  });
});

app.get("/uploads-list", (req, res) => {
  try {
    const directoryExists =
      fs.existsSync(studentsUploadsPath);

    const fileNames = directoryExists
      ? fs.readdirSync(studentsUploadsPath)
      : [];

    const files = fileNames
      .filter((fileName) => {
        const fullPath = path.join(
          studentsUploadsPath,
          fileName
        );

        return fs.statSync(fullPath).isFile();
      })
      .map((fileName) => {
        const fullPath = path.join(
          studentsUploadsPath,
          fileName
        );

        const stats = fs.statSync(fullPath);

        return {
          fileName,
          sizeBytes: stats.size,
          modifiedAt: stats.mtime,
          relativePath:
            `/uploads/students/${fileName}`,
          publicUrl:
            `${req.protocol}://${req.get(
              "host"
            )}/uploads/students/${encodeURIComponent(
              fileName
            )}`,
        };
      });

    return res.json({
      success: true,
      studentsUploadsPath,
      directoryExists,
      count: files.length,
      files,
    });
  } catch (error) {
    console.error(
      "Uploads list error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error?.message ||
        "Failed to read uploads directory",
    });
  }
});

// Check one exact uploaded file.
app.get(
  "/uploads-file-check/:fileName",
  (req, res) => {
    try {
      const fileName = path.basename(
        req.params.fileName
      );

      const fullPath = path.join(
        studentsUploadsPath,
        fileName
      );

      const exists = fs.existsSync(fullPath);

      if (!exists) {
        return res.status(404).json({
          success: false,
          exists: false,
          fileName,
          fullPath,
          message:
            "The file does not exist on the server.",
        });
      }

      const stats = fs.statSync(fullPath);

      return res.json({
        success: true,
        exists: true,
        fileName,
        fullPath,
        sizeBytes: stats.size,
        modifiedAt: stats.mtime,
        publicUrl:
          `${req.protocol}://${req.get(
            "host"
          )}/uploads/students/${encodeURIComponent(
            fileName
          )}`,
      });
    } catch (error) {
      console.error(
        "Upload file check error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error?.message ||
          "Failed to check uploaded file",
      });
    }
  }
);

// ======================================================
// Root
// ======================================================

app.get("/", (req, res) => {
  return res.json({
    success: true,
    service: "Islamic Academy API",
    version: "1.0.0",
  });
});

// ======================================================
// Public Privacy Policy
// ======================================================

app.get(
  "/privacy-policy",
  async (req, res) => {
    try {
      const policy =
        await PrivacyPolicy.findOne({
          order: [["updatedAt", "DESC"]],
        });

      const title =
        policy?.title || "Privacy Policy";

      const content =
        policy?.content ||
        "Privacy Policy will be updated soon.";

      return res.send(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1"
  >

  <title>${title}</title>

  <style>
    body {
      background: #f5f7fb;
      font-family: Arial, sans-serif;
      padding: 30px;
      color: #222;
    }

    .container {
      max-width: 900px;
      margin: auto;
      background: #fff;
      padding: 30px;
      border-radius: 20px;
      box-shadow:
        0 5px 20px rgba(0, 0, 0, 0.08);
    }

    h1 {
      color: #0D8B6F;
      margin-bottom: 20px;
    }

    pre {
      white-space: pre-wrap;
      font-family: inherit;
      line-height: 1.7;
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
      console.error(
        "Privacy policy error:",
        error
      );

      return res
        .status(500)
        .send(
          "Unable to load privacy policy."
        );
    }
  }
);
app.get(
  "/api/debug/student-statuses",
  (req, res) => {
    return res.json({
      success: true,
      version:
        "student-status-fix-2026-07-18-v3",
      admissionStatuses: [
        "pending",
        "approved",
        "active",
        "suspended",
        "inactive",
        "blocked",
        "rejected",
        "graduated",
      ],
      semesterStatuses: [
        "pending",
        "active",
        "completed",
        "passed",
        "failed",
        "on_hold",
        "cancelled",
      ],
    });
  }
);
// ======================================================
// API Routes
// ======================================================

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/bayans",
  bayanRoutes
);

app.use(
  "/api/announcements",
  announcementRoutes
);

app.use(
  "/api/students",
  studentRoutes
);

app.use(
  "/api/books",
  bookRoutes
);

app.use(
  "/api/zikar",
  zikarRoutes
);

app.use(
  "/api/namaz",
  namazRoutes
);

app.use(
  "/api/quran",
  quranRoutes
);

app.use(
  "/api/contact",
  contactRoutes
);

app.use(
  "/api/weather",
  weatherRoutes
);

app.use(
  "/api/youtube",
  youtubeRoutes
);

app.use(
  "/api/banners",
  bannerRoutes
);

app.use(
  "/api/admin-content",
  adminContentRoutes
);
app.use("/api/export", exportRoutes);

// ======================================================
// 404 Handler
// Always keep after static files and API routes
// ======================================================

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "API endpoint not found.",
    path: req.originalUrl,
  });
});

// ======================================================
// Error Handler
// Always last
// ======================================================

app.use(errorHandler);

export default app;