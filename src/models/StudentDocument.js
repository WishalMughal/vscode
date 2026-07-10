import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

class StudentDocument extends Model {}

StudentDocument.init(
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

    documentType: {
      type: DataTypes.ENUM(
        "student_cnic_bform",
        "father_cnic",
        "educational_document",
        "profile_picture",
        "result_document",
        "other"
      ),
      allowNull: false,
      field: "documentType",
    },

    documentName: {
      type: DataTypes.STRING(200),
      allowNull: true,
      field: "documentName",
    },

    fileUrl: {
      type: DataTypes.STRING(500),
      allowNull: false,
      field: "fileUrl",
    },

    mimeType: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: "mimeType",
    },

    fileSize: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "fileSize",
    },

    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "isVerified",
    },

    verifiedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "verifiedBy",
    },

    verifiedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "verifiedAt",
    },

    remarks: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    uploadedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "uploadedBy",
    },
  },
  {
    sequelize,
    modelName: "StudentDocument",
    tableName: "student_documents",
    timestamps: true,
  }
);

export default StudentDocument;