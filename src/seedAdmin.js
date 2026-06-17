import bcrypt from "bcryptjs";
import { User } from "./models/index.js";
import { sequelize } from "./config/db.js";

const seedAdmin = async () => {
  try {
    await sequelize.authenticate();

    const adminEmail = "admin@islamicacademy.com";
    const adminPassword = "12345678";

    const existing = await User.findOne({ where: { email: adminEmail } });

    if (existing) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const hash = await bcrypt.hash(adminPassword, 10);

    await User.create({
      name: "Admin",
      email: adminEmail,
      password: hash,
      role: "admin",
    });

    console.log("Admin created successfully");
    process.exit(0);
  } catch (error) {
    console.error("Seed admin error:", error);
    process.exit(1);
  }
};

seedAdmin();