import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { initDB } from "./config/db.js";
import {
  syncDB,
  Student,
} from "./models/index.js";

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await initDB();

    // Check which Student model is actually loaded
    const studentFields = Object.keys(
      Student.getAttributes()
    );

    console.log(
      "📋 Loaded Student model fields:",
      studentFields
    );

    console.log(
      "🏨 hostel_required loaded:",
      studentFields.includes("hostel_required")
    );

    console.log(
      "🚌 transport_required loaded:",
      studentFields.includes("transport_required")
    );

    // Do not use alter:true repeatedly
    await syncDB();

    app.listen(PORT, () => {
      console.log(`✅ Server running on ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server start failed:", error);

    if (error?.parent?.sqlMessage) {
      console.error(
        "❌ SQL message:",
        error.parent.sqlMessage
      );
    }

    if (error?.sql) {
      console.error(
        "❌ SQL query:",
        error.sql
      );
    }

    process.exit(1);
  }
};

start();