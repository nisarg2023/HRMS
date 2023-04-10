const conn = require('../config/dbConnect');
const util = require('util');
const query = util.promisify(conn.query).bind(conn);
const moment = require("moment");
// const {getUserBasicinfo,getUserProfilePhoto} = require('./dashboard.controller')


const getUserBasicinfo = async(id = "") => {

    if (id == "") {

        const data = await query(`SELECT * FROM hrms.basic_info `)
        return data;
    } else {

        const data = await query(`SELECT basic_info_id,first_name FROM basic_info where fk_emp_id = ${id};`)
        return data;
    }

}

const getUserProfilePhoto = async(fields = "*", id = "") => {

    if (id == "") {
        const data = await query(`SELECT ${fields.toString()}  FROM document;`)
        return data;
    } else {
        const data = await query(`SELECT ${fields.toString()} FROM document where fk_emp_id=${id}`);
        return data;
    }


}




const attendance =  require('./dashboardprofile.controller')

const attendancy_summary = async(req, res) => {

    let attendanceData = await attendance.empolyeeAttendanceData(req)


    const userInfo = await getUserBasicinfo(req.session.emp_id);
    const profilePhoto = await getUserProfilePhoto(["profile_photo"], req.session.emp_id);

    res.render("attendance", {attendanceData, "first_name": userInfo[0].first_name, "profilePhoto": profilePhoto[0].profile_photo, "tz":`${parseInt(req.cookies.tz)}` })
}

module.exports = { attendancy_summary }





