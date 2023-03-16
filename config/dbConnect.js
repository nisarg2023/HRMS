const mysql = require("mysql2/promise")
async function conn () {
    const conn = await mysql.createConnection
    ({ 
        host:'localhost', 
        user: 'root',  
        password: 'root',
        database: 'hrms'
    });
    return conn
}
  
module.exports=conn;