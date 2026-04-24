import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

class Announcement extends Model {}
Announcement.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING(200), allowNull: false },
    message: { type: DataTypes.TEXT, allowNull: false },
    active: { type: DataTypes.BOOLEAN, defaultValue: true },
    createdBy: { type: DataTypes.INTEGER }
  },
  { sequelize, modelName: "Announcement", tableName: "announcements", timestamps: true }
);
export default Announcement;
