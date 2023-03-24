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
    var hashPass = await bcrypt.hash(user_password,10);
        console.log("hash"+hashPass);

    if(user_email){

        var updateQuery=` update hrms_employee set password="${hashPass}" where email="${user_email}";`
        var updateData= await query(updateQuery); 
        res.redirect('/get-login')
    }else{
        res.send(" Your password cannot change !.......")
    }
   
}
module.exports = { forgetPassword,checkEmail,postEmail };