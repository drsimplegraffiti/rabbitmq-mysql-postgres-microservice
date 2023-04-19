const mysql = require("mysql2");
const config = require("../config/config_service");

const pool = mysql.createConnection({
  host: config.db.host,
  user: config.db.username,
  password: config.db.password,
  database: config.db.name,
  port: config.db.port,
});

pool.query("SELECT 1 + 1 AS solution", (err, rows, fields) => {
  if (err) {
    console.error("Error connecting to MySQL: " + err.stack);
    return;
  }

  console.log("Connected to MySQL as id " + pool.threadId);
  console.log("====================================================")
});

module.exports = pool.promise();


