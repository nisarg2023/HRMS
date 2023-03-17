const conn = require('../config/dbConnect');
const util =  require('util');
const query =  util.promisify(conn.query).bind(conn)
const bcrypt = require('bcryptjs');

const getLogin = (req, res) => {
    // res.send('get login');
    res.render('employee-data-form')
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
        console.log(pass)
        console.log(data)
        var match = await bcrypt.compare(pass, data);
        console.log("match", match);
        if (match) {
            req.session.email = req.body.email;
            req.session.save();
            res.send(req.session);
           

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