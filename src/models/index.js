import { sequelize } from "../config/db.js";
import User from "./User.js";
import Student from "./Student.js";
import Bayan from "./Bayan.js";
import Announcement from "./Announcement.js";
import Book from "./Book.js";
import Zikar from "./Zikar.js";
import Contact from "./Contact.js";
import MasjidTiming from "./MasjidTiming.js";
import PrivacyPolicy from "./PrivacyPolicy.js";

// Associations
User.hasMany(Student, { foreignKey: "createdBy" });
Student.belongsTo(User, { foreignKey: "createdBy" });

// Student profile ownership (student user -> their own record)
User.hasOne(Student, { foreignKey: "userId", as: "studentProfile" });
Student.belongsTo(User, { foreignKey: "userId", as: "user" });

User.hasMany(Bayan, { foreignKey: "createdBy" });
Bayan.belongsTo(User, { foreignKey: "createdBy" });

User.hasMany(Announcement, { foreignKey: "createdBy" });
Announcement.belongsTo(User, { foreignKey: "createdBy" });

User.hasMany(Book, { foreignKey: "createdBy" });
Book.belongsTo(User, { foreignKey: "createdBy" });

User.hasMany(Zikar, { foreignKey: "createdBy" });
Zikar.belongsTo(User, { foreignKey: "createdBy" });

export const syncDB = async () => {
  await sequelize.sync();
  console.log("🗃️ All models synced");
};

export { User, Student, Bayan, Announcement, Book, Zikar, Contact };
export { MasjidTiming, PrivacyPolicy };