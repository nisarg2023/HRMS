const conn = require('../config/dbConnect');
const util =  require('util');
const query =  util.promisify(conn.query).bind(conn)
// to render an activation page
const activation = async (req,res)=>{
    try{
        // used for testing purpose replace it with the tocken and get email based on that.
        let email = req.body.email;
        let activationCheck = await query(`select isactivate from hrms_employee where email = '${email}'`);
        
        if(activationCheck[0] == 1){
            redirect('/')
        }
        else{
            console.log('activation2',email)
            res.render('activation',{email});
        }
    }

    catch(error){
        console.log('error in activation check fucntion' ,error)
    }

}

// called through fetch to update value in database
const activate = async(req,res)=>{
    try{
        let email = req.query.email;
        let activate = await query(`update hrms_employee set isactivate = 1 where email = '${email}'`)
        // res.redirect('/')
        res.send("activate")
    }
    catch(error){
        console.log('error in active action fucntion' ,error)
    }
}

module.exports = {activation,activate}