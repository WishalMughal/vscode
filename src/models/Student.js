import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

class Student extends Model {}
Student.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

    // Basic student info
    name: { type: DataTypes.STRING(120), allowNull: false },
    father_name: { type: DataTypes.STRING(120) },
    date_of_birth: { type: DataTypes.DATEONLY },
    age: { type: DataTypes.INTEGER },
    gender: { type: DataTypes.ENUM("male", "female", "other"), defaultValue: "male" },
    marital_status: { type: DataTypes.ENUM("single", "married"), defaultValue: "single" },
    student_b_form_or_cnic: { type: DataTypes.STRING(30) },
    cnic: { type: DataTypes.STRING(30) },

    // Guardian / guarantor
    guardian_name: { type: DataTypes.STRING(120) },
    guardian_profession: { type: DataTypes.STRING(120) },
    guardian_phone: { type: DataTypes.STRING(30) },
    guardian_cnic: { type: DataTypes.STRING(30) },
    guardian_relation: { type: DataTypes.STRING(80) },
    guarantor_name: { type: DataTypes.STRING(120) },
    guarantor_profession: { type: DataTypes.STRING(120) },
    guarantor_phone: { type: DataTypes.STRING(30) },

    // Contact / address
    phone: { type: DataTypes.STRING(30) },
    whatsapp_number: { type: DataTypes.STRING(30) },
    emergency_contact_name: { type: DataTypes.STRING(120) },
    emergency_contact_phone: { type: DataTypes.STRING(30) },
    address: { type: DataTypes.STRING(255) },
    city: { type: DataTypes.STRING(100) },
    district: { type: DataTypes.STRING(100) },
    province: { type: DataTypes.STRING(100) },

    // Education details
    dini_education: { type: DataTypes.TEXT },
    asri_education: { type: DataTypes.TEXT },
    previous_dini_institute: { type: DataTypes.STRING(255) },
    previous_asri_institute: { type: DataTypes.STRING(255) },
    previous_class_or_degree: { type: DataTypes.STRING(120) },
    course_applied_for: { type: DataTypes.STRING(120), defaultValue: "درس نظامی" },

    // Other details
    other_activities: { type: DataTypes.TEXT },
    medical_condition: { type: DataTypes.TEXT },
    hostel_required: { type: DataTypes.BOOLEAN, defaultValue: false },
    transport_required: { type: DataTypes.BOOLEAN, defaultValue: false },
    passport_photo_url: { type: DataTypes.STRING(300) },
    document_notes: { type: DataTypes.TEXT },

    // Admission workflow
    admission_date: { type: DataTypes.DATE },
    semester_no: { type: DataTypes.INTEGER, defaultValue: 1 },
    renewal_date: { type: DataTypes.DATE },
    status: {
      type: DataTypes.ENUM("active", "pending", "blocked", "rejected", "graduated"),
      defaultValue: "pending",
    },
    remarks: { type: DataTypes.TEXT },

    // Link student record with an authenticated student user
    userId: { type: DataTypes.INTEGER },
    createdBy: { type: DataTypes.INTEGER },
  },
  { sequelize, modelName: "Student", tableName: "students", timestamps: true }
);
export default Student;
