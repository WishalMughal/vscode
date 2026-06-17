import dotenv from "dotenv";
import app from "./app.js";
import { initDB } from "./config/db.js";
import { syncDB } from "./models/index.js";
dotenv.config();

const PORT = process.env.PORT || 5000;

const start = async () => {
  await initDB();
  await syncDB(); // dev only
  app.listen(PORT, () => console.log(`✅ Server running on ${PORT}`));
};
start();
