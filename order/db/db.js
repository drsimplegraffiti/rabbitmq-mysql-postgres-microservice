const { Pool } = require("pg");
const config = require("../config/config_service");


const pool = new Pool({
  user: config.db.username,
  host: config.db.host,
  database: config.db.name,
  password: config.db.password,
  port: config.db.port,
});


// connect to the database
pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  client.query("SELECT NOW()", (err, result) => {
    release();
    if (err) {
      return console.error("Error executing query", err.stack);
    }
    console.log("Connected to the PostgreSQL server successfully.");
    console.log("**********************************************************")
  });
});


module.exports = pool;
