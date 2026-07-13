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
      field: "student_id",
    },

    semesterNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "semester_no",
    },

    semesterTitle: {
      type: DataTypes.STRING(200),
      allowNull: true,
      field: "semester_title",
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
      defaultValue: "pending",
      field: "semester_status",
    },

    totalMarks: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      field: "total_marks",
    },

    obtainedMarks: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      field: "obtained_marks",
    },

    percentage: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },

    grade: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },

    remarks: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    resultFileUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
      field: "result_file_url",
    },

    published: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "created_by",
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
        name: "unique_student_semester_result",
        fields: ["studentId", "semesterNo"],
      },
    ],
  }
);

export default StudentSemesterResult;