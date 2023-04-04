const mysql = require('mysql2')

let conn = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME
})

conn.connect((err) => {
    if (err) throw err;
    console.log("Connected with MySql")
})


module.exports = conn