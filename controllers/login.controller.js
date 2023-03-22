const conn = require('../config/dbConnect');
const util =  require('util');
const query =  util.promisify(conn.query).bind(conn)
const bcrypt = require('bcryptjs');

const getLogin = (req, res) => {
   
    res.render('login')
}

const postLogin = async (req, res) => {
   
    try {
        let {user_email,user_password} = req.body;
        console.log(user_email, user_password)
        
        var sql = `select emp_id,email,isactivate,isdelete,password from hrms_employee where email = '${user_email}'`;
        var result = await query(sql)

        if (result.length == 0) {
            return res.send("user not found")
        }

        const data = result[0].password;
      
        var match = await bcrypt.compare(user_password, data);
        console.log("match", match);
        if (match) {
            req.session.email = user_email;
            req.session.emp_id = result[0].emp_id;
            req.session.save();

            if(result[0].isactivate)
            {
                const basicinfo = await query(`SELECT basic_info_id,first_name FROM hrms.basic_info where fk_emp_id = ${result[0].emp_id};`)
                if(basicinfo.length == 0)
                {
                    res.redirect("/employee/get-employee-data");
                } 
                else{
                    res.redirect('dashbord');    

                }
            }
            else{

                res.redirect('/get-activate');
            }
           
        }
        else {
            return res.send("wrong password!")
        }

    }
    catch (error) {
        console.error(error);
    }
}

const getLogout = (req,res)=>{
    req.session.destroy()
    res.clearCookie("sessionid");
    res.redirect('get-login')
}

module.exports = { postLogin, getLogin,getLogout };