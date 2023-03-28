const conn = require('../config/dbConnect');
const util = require('util')
const query =  util.promisify(conn.query).bind(conn)


const dashboardProfile = require('./dashboardprofile.controller')

const getApproveLeave = async(req,res)=>{

    const userInfo = await dashboardProfile.getUserBasicinfo(req.session.emp_id)
    const profilePhoto =  await dashboardProfile.getUserProfilePhoto(["profile_photo"],req.session.emp_id);

    let sqlQuery = `select leave_application.leave_id, leave_application.fk_emp_id, leave_application.leave_date, leave_application.leave_reason,leave_application.is_halfday, leave_application.is_cto_approved, leave_application.is_hr_approved, basic_info.first_name,basic_info.last_name from leave_application left join basic_info on basic_info.fk_emp_id = leave_application.fk_emp_id;`


    const result = await query(sqlQuery)
    res.render('adminLeaveApplication', {result, "first_name": userInfo[0].first_name,"profilePhoto":profilePhoto[0].profile_photo})
}

const postApproveLeave = async(req,res)=>{
    const result = await query(`update leave_application set ${req.query.field} = '${req.query.val}' where leave_id = ${req.query.leaveId}`)
}

module.exports = {getApproveLeave,postApproveLeave}