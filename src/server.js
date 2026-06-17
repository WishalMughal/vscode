import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { initDB } from "./config/db.js";
import { syncDB } from "./models/index.js";

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await initDB();

    // IMPORTANT: syncDB must not use alter:true again and again
    await syncDB();

    app.listen(PORT, () => console.log(`✅ Server running on ${PORT}`));
  } catch (error) {
    console.error("❌ Server start failed:", error);
    process.exit(1);
  }
};

start();