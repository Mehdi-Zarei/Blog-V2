const Users = require("./Users");
const Articles = require("../models/Articles");
const Tags = require("./Tags");

Users.hasMany(Articles, {
  foreignKey: "author_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Articles.belongsTo(Users, {
  foreignKey: "author_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

module.exports = { Users, Articles, Tags };
