import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

class Book extends Model {}
Book.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING(200), allowNull: false },
    author: { type: DataTypes.STRING(120) },
    pdfUrl: { type: DataTypes.STRING(300), allowNull: false },
    category: { type: DataTypes.STRING(100) },
    createdBy: { type: DataTypes.INTEGER }
  },
  { sequelize, modelName: "Book", tableName: "books", timestamps: true }
);
export default Book;
