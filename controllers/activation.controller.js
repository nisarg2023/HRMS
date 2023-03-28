const conn = require('../config/dbConnect');
const util = require('util');
const query = util.promisify(conn.query).bind(conn)
    // to render an activation page
const getActivate = async(req, res) => {
    try {
        // used for testing purpose replace it with the tocken and get email based on that.
        let email = req.body.email;
        let activationCheck = await query(`select isactivate from hrms_employee where email = '${email}'`);

        if (activationCheck[0] == 1) {
            redirect('/')
        } else {
            res.render('activation', { email });
        }
    } catch (error) {
        console.log('error in activation check fucntion', error)
    }

}

// called through fetch to update value in database
const postActivate = async(req, res) => {
    try {
        let email = req.session.email;
        let activate = await query(`update hrms_employee set isactivate = 1 where email = '${email}'`)

        res.redirect('/employee/get-employee-data');
    } catch (error) {
        console.log('error in active action fucntion', error)
    }
}

const postForgetActivate = async(req, res) => {
    try {
        let email = req.session.email;
        let activate = await query(`update hrms_employee set isactivate = 1 where email = '${email}'`)

        res.redirect('/employee/get-employee-data');
    } catch (error) {
        console.log('error in active action fucntion', error);
    }
}

module.exports = { getActivate, postActivate, postForgetActivate }