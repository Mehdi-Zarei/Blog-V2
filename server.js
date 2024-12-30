const db = require("./db");

const {
  Users,
  Articles,
  Tags,
  ArticlesTags,
} = require("./models/Associations");

const redis = require("./redis");
const configs = require("./configs");
const app = require("./app");

(async function startServer() {
  try {
    app.listen(configs.server.port, () => {
      console.log(`Server Running On Port ${configs.server.port}`);
    });
  } catch (error) {
    console.log("Error -->", error);
    process.exit(0);
  }
})();
