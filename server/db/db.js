const mysql = require("mysql2");
// mysql2/promise
require("dotenv").config();

const db = mysql.createConnection({
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_password,
    database: process.env.db_name
});

db.connect((err) => {
    if (err) {
        console.log("Database Connection failed");
        console.log(err);
    } else {
        console.log("Database Connected");
    }
})
module.exports = db;
