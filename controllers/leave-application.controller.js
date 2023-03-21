const conn = require('../config/dbConnect');
const util = require('util')
const query =  util.promisify(conn.query).bind(conn)


const getLeaveapplication = async (req,res)=>{
    const result = await query(`select * from leave_application where fk_emp_id = ${req.session.emp_id}`)
    res.render('leaveapplication', {result})
}
const postLeaveapplication = async(req,res)=>{
    res.redirect('/deshbord/leave')

    let result = await query(`insert into leave_application(fk_emp_id, leave_date,leave_reason,leave_type,is_halfday) values('${req.session.emp_id}','${req.body.leave_date}','${req.body.leave_reason}','${req.body.leave_type}','${req.body.is_half}')`)
}

module.exports = {getLeaveapplication,postLeaveapplication}