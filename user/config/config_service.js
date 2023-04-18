const {
  APP_PORT,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME,
  JWT_SECRET,
  JWT_SECRET_EXPIRATION_TIME,
  NODE_ENV,
} = process.env;

const config = {
  app: {
    port: APP_PORT,
  },
  db: {
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    host: DB_HOST,
    name: DB_NAME,
  },
  jwt: {
    secret: JWT_SECRET,
    secretExpirationTime: JWT_SECRET_EXPIRATION_TIME,
  },
  env: {
    isProduction: NODE_ENV === "production",
    isDevelopment: NODE_ENV === "development",
  },
};

module.exports = config;
