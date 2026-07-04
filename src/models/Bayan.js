import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

class Bayan extends Model {}

Bayan.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },

    youtubeUrl: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },

    weekly: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    today: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    isLive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    playlist: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    liveExpiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },

    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Bayan",
    tableName: "bayans",
    timestamps: true,
  }
);

export default Bayan;