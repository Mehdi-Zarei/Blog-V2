const { DataTypes } = require("sequelize");
const db = require("../db");

const Articles = db.define(
  "Articles",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT("medium"),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    cover: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    publish: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    tags: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field: "author",
    },
  },

  {
    paranoid: false,
    freezeTableName: true,
    timestamps: true,
  }
);

module.exports = Articles;
