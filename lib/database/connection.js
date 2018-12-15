const { MYSQL_PASSWORD } = require("../../config/app.config").security;
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: MYSQL_PASSWORD,
  database: "bbs"
});

connection.connect();

module.exports = connection;