const conn = require('../config/dbConnect');
const util =  require('util');
const query =  util.promisify(conn.query).bind(conn)
const bcrypt = require('bcryptjs');

const getAllUsersEmail = async(req,res)=>{

    const allUsersEmail = await query('SELECT email FROM hrms_employee;')
    res.json(allUsersEmail.map(x=>x.email));

}

module.exports ={getAllUsersEmail}