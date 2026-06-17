import bcrypt from "bcryptjs";
import { User } from "./models/index.js";
import { sequelize } from "./config/db.js";

const resetAdminPassword = async () => {
  try {
    await sequelize.authenticate();

    const email = "admin@islamicacademy.com";
    const newPassword = "12345678";

    const hash = await bcrypt.hash(newPassword, 10);

    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log("Admin not found");
      process.exit(1);
    }

    user.password = hash;
    user.role = "admin";
    await user.save();

    console.log("Admin password reset successfully");
    process.exit(0);
  } catch (error) {
    console.error("Reset admin password error:", error);
    process.exit(1);
  }
};

resetAdminPassword();