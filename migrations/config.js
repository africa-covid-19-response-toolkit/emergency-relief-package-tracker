const app = require('../src/app');
const env = process.env.NODE_ENV || 'development';
const dialect = 'postgres'; // Or your dialect name

module.exports = {
  [env]: {
    dialect,
    username: process.env.PGNAME,
    password: process.env.PGPASS,
    database: process.env.PGDB,
    url: app.get(dialect),
    migrationStorageTableName: '_migrations',
  },
};
