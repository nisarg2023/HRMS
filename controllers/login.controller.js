const db = require('../config/dbConnect');
const bcrypt = require('bcryptjs');

const getLogin = (req, res) => {
    res.send('get login');
}

const postLogin = async (req, res) => {
    try {
        let email = req.body.email;
        let pass = req.body.password;
        console.log(email)
        var varifyUser = `select * from hrms_employee where email = '${email}'`;
        var query = await db()

        var result = await query.execute(varifyUser)
        console.log("result",result[0][0]);





        if (result.length == 0) {
            return res.send("user not found")
        }


        const data = result[0][0].password;
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