const Users = require("./Users");
const Articles = require("../models/Articles");
const Tags = require("./Tags");

Users.hasMany(Articles, {
  foreignKey: "author_id",
  as: "author",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Articles.belongsTo(Users, {
  foreignKey: "author_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Users.hasMany(Tags, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Tags.belongsTo(Users, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Articles.belongsToMany(Tags, {
  through: "ArticlesTags",
  foreignKey: "tags_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Tags.belongsToMany(Articles, {
  through: "ArticlesTags",
  foreignKey: " articles_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

module.exports = { Users, Articles, Tags };
