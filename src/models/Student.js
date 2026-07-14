import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

class Student extends Model {}

Student.init(
  {
    // =====================================================
    // PRIMARY KEY
    // =====================================================

    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    // =====================================================
    // BASIC INFORMATION
    // =====================================================

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
    },

    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    gender: {
      type: DataTypes.ENUM(
        "Male",
        "Female",
        "Other"
      ),
      allowNull: true,
    },

    marital_status: {
      type: DataTypes.ENUM(
        "Single",
        "Married"
      ),
      allowNull: true,
    },

    // =====================================================
    // CNIC / B-FORM
    // =====================================================

    student_cnic: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },

    guardian_cnic: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },

    // =====================================================
    // CONTACT
    // =====================================================

    phone: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },

    whatsapp: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },

    address: {
      type: DataTypes.TEXT,
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

    // =====================================================
    // EDUCATION
    // =====================================================

    dini_education: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    prev_dini_institute: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    prev_school: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    previous_class: {
      type: DataTypes.STRING(120),
      allowNull: true,
    },

    // =====================================================
    // COURSE
    // =====================================================

    course_applied_for: {
      type: DataTypes.ENUM(
        "Dars e Nizami",
        "Shoba e Hifz o Nazra",
        "Shoba e Banat",
        "Al Abbasi Islamic Education System",
        "Takhassus",
        "Taleem e deen course",
        "Dora e Tafseer",
        "Dora e Tadrebiyyah",
        "Dora Lugat e Arabi",
        "Dora e Sarf o Nahw",
        "English Language Course",
        "Dora e Tajweed",
        "Taleem o Tarbiyat",
        "Quiz Program",
        "Other"
      ),
      allowNull: true,
    },

    other_course: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },

    activities: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    // =====================================================
    // GUARDIAN
    // =====================================================

    guardian_name: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },

    guardian_profession: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },

    guardian_phone: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },

    relation: {
      type: DataTypes.STRING(80),
      allowNull: true,
    },

    // =====================================================
    // GUARANTOR
    // =====================================================

    guarantor_name: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },

    guarantor_profession: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },

    guarantor_phone: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },

    // =====================================================
    // DOCUMENTS
    // =====================================================

    profile_image_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },

    student_document_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },

    father_cnic_document_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },

    educational_document_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },

    // =====================================================
    // SEMESTER
    // =====================================================

    current_semester: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },

    semester_no: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },

    semester_status: {
      type: DataTypes.ENUM(
        "pending",
        "active",
        "completed",
        "passed",
        "failed"
      ),
      defaultValue: "pending",
    },

    // =====================================================
    // RESULT
    // =====================================================

    semester_result: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    semester_result_pdf: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },

    // =====================================================
    // ADMISSION
    // =====================================================

    admission_date: {
      type: DataTypes.DATE,
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
        "rejected",
        "inactive",
        "blocked",
        "graduated"
      ),
      defaultValue: "pending",
    },

    remarks: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    // =====================================================
    // RELATIONS
    // =====================================================

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