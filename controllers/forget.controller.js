const conn = require('../config/dbConnect');
const util = require('util');
const query = util.promisify(conn.query).bind(conn)
const bcrypt = require('bcryptjs');

const updatePassword = async(req, res) => {
    let user_email = req.query.userEmail;
    let otp = req.query.otp;

    const correctmail = await query(`SELECT email FROM hrms_employee where email="${user_email}"`);

    if (correctmail.length == 0) {
        res.render('forgot1')
    } else {
        const otpget = await query(`SELECT code FROM hrms_employee where email="${user_email}"`);
        console.log("its your otp", otpget[0].code);
        if (otpget[0].code == otp) {
            res.json({'isVerified':true})
        } else {
            res.json({'isVerified':false})
        }
    }


}

const forgetPassword = (req, res) => {
    res.render('forgot1')
}
const checkEmail = async(req, res) => {
        const allUsersEmail = await query('SELECT email FROM hrms_employee;');
        // console.log(allUsersEmail);
        res.json(allUsersEmail.map(x => x.email));

    }


const postEmail = async(req, res) => {
    var { user_email, user_password } = req.body;
    console.log(user_email);
    console.log(user_password);
    var hashPass = await bcrypt.hash(user_password, 10);
    console.log("hash" + hashPass);
    if (user_email) {
        var updateQuery = `update hrms_employee set password="${hashPass}" where email="${user_email}";`
        var updateData = await query(updateQuery);
        res.redirect('/get-login')
    } else {
        res.send(" Your password cannot change !.......")
    }

}



module.exports = { forgetPassword, checkEmail, postEmail, updatePassword };