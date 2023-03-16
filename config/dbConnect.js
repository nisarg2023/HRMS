async function conn () {
    const mysql = require('mysql2/promise');
    const conn = await mysql.createConnection({ host:'localhost', user: 'root',  password: 'root',database: 'login' });
    return conn
}
  
module.exports=conn;