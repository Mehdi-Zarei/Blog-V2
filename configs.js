module.exports = {
  server: {
    port: process.env.SERVER_PORT,
  },

  DB: {
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },

  auth: {
    accessTokenSecretKey: process.env.ACCESS_TOKEN_SECRET_KEY,
    refreshTokenSecretKey: process.env.REFRESH_TOKEN_SECRET_KEY,
    accessTokenExpireInMinutes: process.env.ACCESS_TOKEN_EXPIRE_IN_MINUTES,
    refreshTokenExpireInDays: process.env.REFRESH_TOKEN_EXPIRE_IN_DAYS,
  },

  redis: {
    uri: process.env.Redis_URI,

    refreshTokenExpireTimeInRedis:
      process.env.REFRESH_TOKEN_EXPIRE_TIME_IN_REDIS,
  },

  mySql: {
    uri: process.env.MY_SQL_URI,
  },
};
