import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

class Student extends Model {}

Student.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },

    father_name: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },

    dob: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: "date_of_birth",
    },

    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    gender: {
      type: DataTypes.ENUM(
        "male",
        "female",
        "other"
      ),
      allowNull: true,
      defaultValue: "male",
    },

    marital_status: {
      type: DataTypes.ENUM(
        "single",
        "married"
      ),
      allowNull: true,
      defaultValue: "single",
    },

    student_cnic: {
      type: DataTypes.STRING(30),
      allowNull: true,
      field: "student_b_form_or_cnic",
    },

    cnic: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },

    guardian_name: {
      type: DataTypes.STRING(120),
      allowNull: true,
    },

    guardian_profession: {
      type: DataTypes.STRING(120),
      allowNull: true,
    },

    guardian_phone: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },

    guardian_cnic: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },

    relation: {
      type: DataTypes.STRING(80),
      allowNull: true,
      field: "guardian_relation",
    },

    guarantor_name: {
      type: DataTypes.STRING(120),
      allowNull: true,
    },

    guarantor_profession: {
      type: DataTypes.STRING(120),
      allowNull: true,
    },

    guarantor_phone: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },

    phone: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },

    whatsapp: {
      type: DataTypes.STRING(30),
      allowNull: true,
      field: "whatsapp_number",
    },

    emergency_contact_name: {
      type: DataTypes.STRING(120),
      allowNull: true,
    },

    emergency_contact_phone: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },

    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    city: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    district: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    province: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    dini_education: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    asri_education: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    prev_dini_institute: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: "previous_dini_institute",
    },

    prev_school: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: "previous_asri_institute",
    },

    previous_class: {
      type: DataTypes.STRING(120),
      allowNull: true,
      field: "previous_class_or_degree",
    },

    course_applied_for: {
      type: DataTypes.STRING(120),
      allowNull: true,
    },

    other_course: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },

    activities: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "other_activities",
    },

    medical_condition: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    passport_photo_url: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },

    profile_image_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
      field: "profile_image",
    },

    student_document_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
      field: "student_document",
    },

    father_cnic_document_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
      field: "father_cnic_document",
    },

    educational_document_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
      field: "educational_document",
    },

    document_notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    admission_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    semester_no: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
    },

   semester_status: {
  type: DataTypes.ENUM(
    "pending",
    "active",
    "completed",
    "passed",
    "failed",
    "on_hold",
    "cancelled"
  ),
  allowNull: false,
  defaultValue: "pending",
},

    semester_result_pdf: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },

    semester_result: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    renewal_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },

   status: {
  type: DataTypes.ENUM(
    "pending",
    "approved",
    "active",
    "suspended",
    "inactive",
    "blocked",
    "rejected",
    "graduated"
  ),
  allowNull: false,
  defaultValue: "pending",
},

    remarks: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Student",
    tableName: "students",
    timestamps: true,
  }
);

export default Student;