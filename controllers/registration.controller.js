const conn = require('../config/dbConnect');
const util =  require('util');
const query =  util.promisify(conn.query).bind(conn)
const bcrypt = require('bcryptjs')

const getRegistration = (req,res)=>{
    // res.send("get registration")
    res.render('register')
}



const postRegistration=async(req,res)=>{
    try{

        const{email,password} = req.body;
        console.log(req.body.email)
        var hashPass = await bcrypt.hash(password,10);//(Data , salt)
        console.log("hash"+hashPass);

        var sql = `insert into hrms_employee(email,password) values('${email}','${hashPass}')`;
        var result =  await query(sql);
        // console.log(result)

        res.send("post registration")
    }
    catch (error) {
        console.error(error);
    }
}
module.exports = {getRegistration,postRegistration};