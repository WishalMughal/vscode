import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";
class Contact extends Model {}
Contact.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(120) },
    email: { type: DataTypes.STRING(120) },
    message: { type: DataTypes.TEXT, allowNull: false }
  },
  { sequelize, modelName: "Contact", tableName: "contacts", timestamps: true }
);
export default Contact;
