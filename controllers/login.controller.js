const conn = require('../config/dbConnect');
const util =  require('util');
const query =  util.promisify(conn.query).bind(conn)
const bcrypt = require('bcryptjs');

const getLogin = (req, res) => {
   
    res.render('login')
}

const postLogin = async (req, res) => {
   
    try {
        let email = req.body.email;
        let pass = req.body.password;
        console.log(email)
        var verifyUser = `select * from hrms_employee where email = '${email}'`;


        var result = await query(verifyUser)
        console.log("result",result);





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
                res.send('dashboard');    
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

module.exports = { postLogin, getLogin };