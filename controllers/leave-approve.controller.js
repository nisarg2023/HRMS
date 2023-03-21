const conn = require('../config/dbConnect');
const util = require('util')
const query =  util.promisify(conn.query).bind(conn)

const getApproveLeave = async(req,res)=>{
    const result = await query(`select leave_id,fk_emp_id, leave_date, leave_reason,is_halfday, is_cto_approved,is_hr_approved from leave_application`)
    res.render('approveleave', {result})
}

const postApproveLeave = async(req,res)=>{
    console.log(req.query.field)
    const result = await query(`update leave_application set ${req.query.field} = '${req.query.val}' where leave_id = ${req.query.leaveId}`)
}

module.exports = {getApproveLeave,postApproveLeave}