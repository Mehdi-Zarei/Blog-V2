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

(async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log(`Connect To ${configs.DB.database} DB Successfully.`);
  } catch (error) {
    await sequelize.close();
    console.error("Unable to connect to the database:", error);
  }
})();

(async function syncDatabase() {
  try {
    await sequelize.sync({ alert: true });
    console.log(`Database ${configs.DB.database} synced successfully.`);
  } catch (err) {
    console.error(`Error syncing ${configs.DB.database} database:`, err);
  }
})();

module.exports = sequelize;
