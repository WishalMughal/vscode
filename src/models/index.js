import { sequelize } from "../config/db.js";

import User from "./User.js";
import Student from "./Student.js";
import StudentDocument from "./StudentDocument.js";
import StudentSemesterResult from "./StudentSemesterResult.js";

import Bayan from "./Bayan.js";
import Announcement from "./Announcement.js";
import Book from "./Book.js";
import Zikar from "./Zikar.js";
import Contact from "./Contact.js";
import MasjidTiming from "./MasjidTiming.js";
import PrivacyPolicy from "./PrivacyPolicy.js";
import Banner from "./Banner.js";

// ======================================================
// USER ↔ STUDENT
// ======================================================

// Record creator/admin relation
User.hasMany(Student, {
  foreignKey: "createdBy",
  as: "createdStudents",
});

Student.belongsTo(User, {
  foreignKey: "createdBy",
  as: "creator",
});

// Student account ownership
User.hasOne(Student, {
  foreignKey: "userId",
  as: "studentProfile",
  onDelete: "CASCADE",
});

Student.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

// ======================================================
// STUDENT ↔ DOCUMENTS
// ======================================================

Student.hasMany(StudentDocument, {
  foreignKey: "studentId",
  as: "documents",
  onDelete: "CASCADE",
  hooks: true,
});

StudentDocument.belongsTo(Student, {
  foreignKey: "studentId",
  as: "student",
});

// User who uploaded the document
User.hasMany(StudentDocument, {
  foreignKey: "uploadedBy",
  as: "uploadedStudentDocuments",
});

StudentDocument.belongsTo(User, {
  foreignKey: "uploadedBy",
  as: "uploader",
});

// Admin who verified the document
User.hasMany(StudentDocument, {
  foreignKey: "verifiedBy",
  as: "verifiedStudentDocuments",
});

StudentDocument.belongsTo(User, {
  foreignKey: "verifiedBy",
  as: "verifier",
});

// ======================================================
// STUDENT ↔ SEMESTER RESULTS
// ======================================================

Student.hasMany(StudentSemesterResult, {
  foreignKey: "studentId",
  as: "semesterResults",
  onDelete: "CASCADE",
  hooks: true,
});

StudentSemesterResult.belongsTo(Student, {
  foreignKey: "studentId",
  as: "student",
});

// Admin who created result
User.hasMany(StudentSemesterResult, {
  foreignKey: "createdBy",
  as: "createdSemesterResults",
});

StudentSemesterResult.belongsTo(User, {
  foreignKey: "createdBy",
  as: "creator",
});

// Admin who last updated result
User.hasMany(StudentSemesterResult, {
  foreignKey: "updatedBy",
  as: "updatedSemesterResults",
});

StudentSemesterResult.belongsTo(User, {
  foreignKey: "updatedBy",
  as: "updater",
});

// ======================================================
// OTHER CONTENT ASSOCIATIONS
// ======================================================

User.hasMany(Bayan, {
  foreignKey: "createdBy",
  as: "createdBayans",
});

Bayan.belongsTo(User, {
  foreignKey: "createdBy",
  as: "creator",
});

User.hasMany(Announcement, {
  foreignKey: "createdBy",
  as: "createdAnnouncements",
});

Announcement.belongsTo(User, {
  foreignKey: "createdBy",
  as: "creator",
});

User.hasMany(Book, {
  foreignKey: "createdBy",
  as: "createdBooks",
});

Book.belongsTo(User, {
  foreignKey: "createdBy",
  as: "creator",
});

User.hasMany(Zikar, {
  foreignKey: "createdBy",
  as: "createdZikars",
});

Zikar.belongsTo(User, {
  foreignKey: "createdBy",
  as: "creator",
});

User.hasMany(Banner, {
  foreignKey: "createdBy",
  as: "createdBanners",
});

Banner.belongsTo(User, {
  foreignKey: "createdBy",
  as: "creator",
});

// ======================================================
// DATABASE SYNC
// ======================================================

export const syncDB = async () => {
  await sequelize.sync();

  console.log("🗃️ All models synced");
};

// ======================================================
// EXPORTS
// ======================================================

export {
  User,
  Student,
  StudentDocument,
  StudentSemesterResult,
  Bayan,
  Announcement,
  Book,
  Zikar,
  Contact,
  Banner,
  MasjidTiming,
  PrivacyPolicy,
};