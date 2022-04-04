const mysql = require("mysql2");

//needs to work with mysql database
const pool = mysql.createPool({
    connectionLimit: 5,
    host: "us-cdbr-east-05.cleardb.net",
    user: "bcb8efcda24e38",
    database: "heroku_a3fe05d4dc2182c",
    password: "6bee5239"
});

module.exports = pool