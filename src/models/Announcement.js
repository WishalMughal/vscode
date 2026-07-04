import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

class Announcement extends Model {}

Announcement.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    // Optional
    title: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },

    // Optional
    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    // Optional
    image: {
      type: DataTypes.STRING(500),
      allowNull: true,
      defaultValue: null,
    },

    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "createdBy",
    },
  },
  {
    sequelize,
    modelName: "Announcement",
    tableName: "announcements",
    timestamps: true,
    underscored: false,
  }
);

export default Announcement;