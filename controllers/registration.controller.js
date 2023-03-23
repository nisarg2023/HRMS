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

        

        
        const{email,} = req.body;
        let password=req.body.user_password
         var user_email=req.body.user_email;
console.log("gfyhftyhftyhfthufftyhfrtyh");
        console.log(user_email)

        var sql1 = (`select * from  hrms_employee where email = '${user_email}'`)
        var result1 = await query(sql1)
        console.log(result)

        if(result1.length>0){
            res.send("exists")
        }
        else{
        
            var hashPass = await bcrypt.hash(password,10);//(Data , salt)
        console.log(hashPass);

        var sql = `insert into hrms_employee(email,password) values('${user_email}','${hashPass}')`;
        var result =  await query(sql);
        mailer.sendMail(user_email)
        res.redirect("/get-login")
        }

    }
    catch (error) {
        console.error(error);
        res.send(error.message);
    }
}
module.exports = {getRegistration,postRegistration};