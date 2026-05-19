// const mysql = require("mysql2");
// // mysql2/promise
// require("dotenv").config();

// const db = mysql.createConnection({
//     host: process.env.db_host,
//     user: process.env.db_user,
//     password: process.env.db_password,
//     database: process.env.db_name
// });

// db.connect((err) => {
//     if (err) {
//         console.log("Database Connection failed");
//         console.log(err);
//     } else {
//         console.log("Database Connected");
//     }
// })
// module.exports = db;

// mysql -h switchyard.proxy.rlwy.net -u root -p RNLhlGOMkYxNSjRCHrTVGGSDjLVkDRjE --port 23722 --protocol=TCP railway

const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT
});

db.connect((err) => {
  if (err) {
    console.log("DB Connection Failed", err);
  } else {
    console.log("MySQL Connected");
  }
});

module.exports = db;
