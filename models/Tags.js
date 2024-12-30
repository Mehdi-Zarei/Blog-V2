const { DataTypes } = require("sequelize");
const db = require("../db");

const Tags = db.define(
  "Tags",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: [3, 10],
      },
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    paranoid: true,
    freezeTableName: true,
    timestamps: true,
  }
);

module.exports = Tags;
