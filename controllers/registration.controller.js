
const bcrypt = require('bcryptjs')
const conn =  require('../config/dbConnect')

const getRegistration = (req,res)=>{
    res.send("get registration")
}



const postRegistration=async(req,res)=>{
    try{

        const{email,password} = req.body;
        console.log(req.body.email)
        var hashPass = await bcrypt.hash(password,10);//(Data , salt)
        console.log("hash"+hashPass);

        var sql = `insert into hrms_employee(email,password) values('${email}','${hashPass}')`;
        var query = await conn()
        var [result] =  await query.execute(sql);
        console.log(result[0])

        res.send("post registration")
    }
    catch (error) {
        console.error(error);
    }
}
module.exports = {getRegistration,postRegistration};