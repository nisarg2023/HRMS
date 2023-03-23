const conn = require('../config/dbConnect');
const util =  require('util');
const query =  util.promisify(conn.query).bind(conn)
const bcrypt = require('bcryptjs');


const forgetPassword = (req,res) =>{
    res.render('forget')
}
const checkEmail =async (req,res) =>{
    console.log("Hello Divyang");
    const allUsersEmail = await query('SELECT email FROM hrms_employee;');
    // console.log(allUsersEmail);
    res.json(allUsersEmail.map(x=>x.email));

}
const postEmail =async (req,res)=>{
    var {user_email,user_password}=req.body;
    console.log(user_email);
    console.log(user_password);
    let activate = await query(`update hrms_employee set isactivate = 0 where email = '${user_email}'`)
    // res.redirect('/get-login')
}
module.exports = { forgetPassword,checkEmail,postEmail };