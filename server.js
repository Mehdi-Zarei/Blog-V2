const { Users, Articles, Tags } = require("./models/Associations");
const db = require("./db");
const redis = require("./redis");
const configs = require("./configs");
const app = require("./app");

(async () => {
  try {
    app.listen(configs.server.port, () => {
      console.log(`Server Running On Port ${configs.server.port}`);
    });
  } catch (error) {
    console.log("Error -->", error);
  }
})();
