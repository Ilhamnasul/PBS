//request library mysql
const mysql = require("mysql")

//variabel koneksi untuk database
const db = mysql.createConnection ({
    host:"sql6.freesqldatabase.com",
    user: "sql6702754",
    password:"1pVwYBPwkr",
    database: "sql6702754"
})

module.exports= db;

//Host: sql6.freesqldatabase.com
//Database name: sql6702754
//Database user: sql6702754
//Database password: 1pVwYBPwkr
//Port number: 3306