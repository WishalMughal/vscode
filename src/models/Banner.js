import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

class Banner extends Model {}

Banner.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

    title: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },

    image: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },

    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Banner",
    tableName: "banners",
    timestamps: true,
  }
);

export default Banner;