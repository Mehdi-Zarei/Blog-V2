const configs = require("./configs");

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  host: configs.DB.host,
  username: configs.DB.username,
  password: configs.DB.password,
  database: configs.DB.database,
  dialect: "mysql",
  logging: false, //console.log,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connect To DB Successfully.");
  } catch (error) {
    await sequelize.close();
    console.error("Unable to connect to the database:", error);
  }
})();

(async () => {
  try {
    await sequelize.sync(); //TODO: remove force: true
    console.log("Database synced successfully.");
  } catch (err) {
    console.error("Error syncing database:", err);
  }
})();

module.exports = sequelize;
