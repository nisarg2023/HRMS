const conn = require('../config/dbConnect');
const util = require('util');
const query = util.promisify(conn.query).bind(conn)
const bcrypt = require('bcryptjs');

const updatePassword = async(req, res) => {
    let user_email = req.body.user_email;
    let otp = req.body.code;

    const correctmail = await query(`SELECT email FROM hrms_employee where email="${user_email}"`);

    if (correctmail.length == 0) {
        res.render('forgot1')
    } else {
        const otpget = await query(`SELECT code FROM hrms_employee where email="${user_email}"`);
        console.log("its your otp", otpget[0].code);
        if (otpget[0].code == otp) {
            res.render('forget')
        } else {
            res.render('forgot1')
        }
    }


}

const forgetPassword = (req, res) => {
    res.render('forgot1')
}
const checkEmail = async(req, res) => {
        console.log("Hello Divyang");
        const allUsersEmail = await query('SELECT email FROM hrms_employee;');
        // console.log(allUsersEmail);
        res.json(allUsersEmail.map(x => x.email));

    }
    // const gotPassword = async(req, res) => {
    //     var { user_email, code } = req.body;
    //     console.log(user_email);
    //     console.log(code);

//     var forcode = `select * from hrms_employee where code = ${code}`;
//     var forcodequery = await query(forcode);

//     if (forcodequery.length == 1) {


//         res.redirect('/get-')
//     } else {
//         res.send(" Your password cannot change !.......")
//     }

// }

const postEmail = async(req, res) => {
    var { user_email, user_password } = req.body;
    console.log(user_email);
    console.log(user_password);
    var hashPass = await bcrypt.hash(user_password, 10);
    console.log("hash" + hashPass);

    if (user_email) {

        var updateQuery = ` update hrms_employee set password="${hashPass}" where email="${user_email}";`
        var updateData = await query(updateQuery);
        res.redirect('/get-login')
    } else {
        res.send(" Your password cannot change !.......")
    }

}



module.exports = { forgetPassword, checkEmail, postEmail, updatePassword };