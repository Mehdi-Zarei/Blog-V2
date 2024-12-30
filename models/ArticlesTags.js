const { DataTypes } = require("sequelize");
const db = require("../db");

const Articles = db.define(
  "ArticlesTags",
  {
    articles_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: "Articles",
        key: "id",
      },
      allowNull: false,
    },
    tags_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: "Tags",
        key: "id",
      },
      allowNull: false,
    },
  },

  {
    paranoid: true,
    freezeTableName: true,
    timestamps: true,

    //* primary key تنظیمات لازم برای کلید ترکیبی به جای
    indexes: [
      {
        unique: true,
        fields: ["article_id", "tag_id"],
      },
    ],
  }
);

module.exports = Articles;
