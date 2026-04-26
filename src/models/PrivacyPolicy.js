import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

class PrivacyPolicy extends Model {}

PrivacyPolicy.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING(150), allowNull: false, defaultValue: "Privacy Policy" },
    content: { type: DataTypes.TEXT, allowNull: false },
  },
  {
    sequelize,
    modelName: "PrivacyPolicy",
    tableName: "privacy_policies",
    timestamps: true,
  }
);

export default PrivacyPolicy;