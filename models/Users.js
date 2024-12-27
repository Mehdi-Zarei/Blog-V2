const { DataTypes } = require("sequelize");
const db = require("../db");

const Users = db.define(
  "Users",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        isEmail: {
          msg: "Please provide a valid email address.",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    role: {
      type: DataTypes.ENUM,
      values: ["USER", "ADMIN"],
      allowNull: false,
      defaultValue: "USER",
    },
    authProvider: {
      type: DataTypes.ENUM,
      values: ["local", "google"],
      defaultValue: "local",
      allowNull: false,
    },

    avatar: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  },
  {
    paranoid: true,
    freezeTableName: true,
    timestamps: true,
  }
);

module.exports = Users;
