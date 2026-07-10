import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

class StudentSemesterResult extends Model {}

StudentSemesterResult.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "studentId",
    },

    semesterNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "semesterNo",
    },

    semesterTitle: {
      type: DataTypes.STRING(150),
      allowNull: true,
      field: "semesterTitle",
    },

    semesterStatus: {
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
      field: "semesterStatus",
    },

    totalMarks: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      field: "totalMarks",
    },

    obtainedMarks: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      field: "obtainedMarks",
    },

    percentage: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },

    grade: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },

    resultFileUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
      field: "resultFileUrl",
    },

    remarks: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    published: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    publishedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "publishedAt",
    },

    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "createdBy",
    },

    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "updatedBy",
    },
  },
  {
    sequelize,
    modelName: "StudentSemesterResult",
    tableName: "student_semester_results",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["studentId", "semesterNo"],
        name: "unique_student_semester_result",
      },
    ],
  }
);

export default StudentSemesterResult;