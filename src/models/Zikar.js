import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

class Zikar extends Model {}
Zikar.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    arabic: { type: DataTypes.TEXT, allowNull: false },
    urdu: { type: DataTypes.TEXT, allowNull: false },
    category: { type: DataTypes.STRING(100) },
    createdBy: { type: DataTypes.INTEGER }
  },
  { sequelize, modelName: "Zikar", tableName: "zikar", timestamps: true }
);
export default Zikar;
