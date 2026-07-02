import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

class MasjidTiming extends Model {}

MasjidTiming.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    masjidName: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    city: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: "Karachi",
    },

    fajr: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },

    dhuhr: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },

    asr: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },

    // Auto set by backend
    maghrib: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: "06:45",
    },

    isha: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },

    jumma: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },

    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "MasjidTiming",
    tableName: "masjid_timings",
    timestamps: true,
  }
);

export default MasjidTiming;