const conn = require('../config/dbConnect');
const util =  require('util');
const query =  util.promisify(conn.query).bind(conn)
const bcrypt = require('bcryptjs')
const mailer = require('./email-controller')

const getRegistration = (req,res)=>{
    // res.send("get registration")
    res.render('register')
}
const postRegistration=async(req,res)=>{
    
    try{
        
        let {user_email,user_password}=req.body;
        
        var hashPassword = await bcrypt.hash(user_password,10);//(Data , salt)
        

        var sql = `insert into hrms_employee(email,password) values('${user_email}','${hashPassword}')`;
        var result =  await query(sql);
        mailer.sendMail(user_email)

        res.redirect("/get-login")
    }
    catch (error) {
        console.error(error);
        res.send(error.message);
    }
}
module.exports = {getRegistration,postRegistration};