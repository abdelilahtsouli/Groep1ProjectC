const Pool = require("pg").Pool;
const settings = require("../appsettings.json");

const pool = new Pool({
  user: settings.PostgreSQL.user,
  password: settings.PostgreSQL.password,
  host: settings.PostgreSQL.host,
  port: settings.PostgreSQL.port,
  database: settings.PostgreSQL.database,
});

module.exports = pool;