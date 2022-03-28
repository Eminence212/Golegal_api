require('dotenv').config();
module.exports = {
  development: {
    username: process.env.POSTGRESQL_ADDON_USER,
    password: process.env.POSTGRESQL_ADDON_PASSWORD,
    database: process.env.POSTGRESQL_ADDON_DB,
    host: process.env.POSTGRESQL_ADDON_HOST,
    dialect: 'postgres',
  },
  test: {
    username: process.env.POSTGRESQL_ADDON_USER,
    password: process.env.POSTGRESQL_ADDON_PASSWORD,
    database: process.env.POSTGRESQL_ADDON_DB,
    host: process.env.POSTGRESQL_ADDON_HOST,
    dialect: 'postgres',
  },
  production: {
    username: process.env.POSTGRESQL_ADDON_USER,
    password: process.env.POSTGRESQL_ADDON_PASSWORD,
    database: process.env.POSTGRESQL_ADDON_DB,
    host: process.env.POSTGRESQL_ADDON_HOST,
    dialect: 'postgres',
  },
};
