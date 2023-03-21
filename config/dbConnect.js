const mysql =  require('mysql2')

let conn = mysql.createConnection({
    host:"localhost",
user:"root",
    password:"roots",
    database: "hrms"
})

conn.connect((err)=>{
    if(err) throw err;
    console.log("Connected with MySql")
})


module.exports = conn