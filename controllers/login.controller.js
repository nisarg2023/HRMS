const conn = require('../config/dbConnect');
const bcrypt = require('bcryptjs');

const getregister=async(req,res)=>{
    res.send('getregister')
}


const postregister=async(req,res)=>{
    try{

        const{email,password} = req.body;
        console.log(req.body.email)
        var hashPass = await bcrypt.hash(password,10);//(Data , salt)
        console.log("hash"+hashPass);

        var sql = `insert into hrms_employee(email,password) values('${email}','${hashPass}')`;
        var query = await conn()
        var [result] =  await query.execute(sql);
        console.log(result[0])

        res.send("login")
    }
    catch (error) {
        console.error(error);
    }
}

const getlogin=async(req,res)=>{
    res.send('getlogin');
}


const postlogin=async(req,res)=>{
    try{
        let email=req.body.email;
        let pass=req.body.password;
        console.log(email)
        var varifyUser = `select * from hrms_employee where email = '${email}'`;
        var query = await conn()
        // var result = await query(varifyUser);
        var result = await query.execute(varifyUser)
        console.log(result[0][0]);



  
       
        if(result.length == 0){
            return res.send("user not found")
        }
            
            


    //comparing password
        const data = result[0][0].password;
            console.log(pass)
            console.log(data)
        var match = await bcrypt.compare(pass,data);
        console.log("match" ,match);
        if(match){
            return res.send(`done`)
        }
        else{
            return res.send("wrong password!")
        }

    }
    catch (error) {
        console.error(error);
    }
}


module.exports = {getregister,postregister,getlogin,postlogin}





















