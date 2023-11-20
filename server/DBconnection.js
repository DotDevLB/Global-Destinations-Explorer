var mysql = require("mysql2");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "J1j2j3j4",
  database: "XploreApp",
});

connection.connect((err) => {
  if (err) {
    console.error("\x1b[31mError connecting to MySQL:\x1b[0m", err);
    return;
  }
  console.log("\x1b[42m\x1b[32m[SUCCESS]\x1b[0m MYSQL server started\x1b[0m");
});


module.exports = { connection };
