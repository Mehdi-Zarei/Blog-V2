const configs = require("./configs");
const { Sequelize } = require("sequelize");

//* Way 1

// const sequelize = new Sequelize(
//   `mysql://${configs.DB.username}:${configs.DB.password}@${configs.DB.host}/${configs.DB.database}`,
//   {
//     logging: false, // Optional: For disabling logging
//   }
// );

//* Way 2

// const sequelize = new Sequelize({
//   host: configs.DB.host,
//   username: configs.DB.username,
//   password: configs.DB.password,
//   database: configs.DB.database,
//   dialect: "mysql",
//   logging: false, //console.log,
// });

//* Way 3

const sequelize = new Sequelize(`mysql://root:@localhost:3306/BLOG_V2`, {
  logging: false, // Optional: Disable logging
});

///////////////////////////////////////////

(async () => {
  try {
    await sequelize.authenticate();
    console.log(`Connect To ${configs.DB.database} DB Successfully.`);
  } catch (error) {
    await sequelize.close();
    console.error("Unable to connect to the database:", error);
  }
})();

(async () => {
  try {
    await sequelize.sync(); //TODO: remove force: true
    console.log(`Database ${configs.DB.database} synced successfully.`);
  } catch (err) {
    console.error(`Error syncing ${configs.DB.database} database:`, err);
  }
})();

module.exports = sequelize;
