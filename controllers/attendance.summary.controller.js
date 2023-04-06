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






const attendancy_summary = async(req, res) => {
    
    
    let dailyBreakTime = 0;
    let monthlyWorkHours = 0;
    let monthlyBreakArr = [];
    let dailyWorkHoursArr = [];

    let querychecktime = `SELECT * FROM check_system where basic_info_id = ${req.session.emp_id}`;


    let data1 = await query(querychecktime);

    
 


    
    for (let i = 0; i < data1.length; i++) {
        dailyWorkHoursArr.push(data1[i].total_office_time);
        monthlyWorkHours += Number(data1[i].total_office_time);
        // in minutes
        


    }

    for (let i = 0; i < data1.length; i++) {

        let querybraketime = `select total_brake_time from brake_system where brake_date ="${moment(data1[i].check_date).format("YYYY-MM-DD")} and basic_info_id = ${req.session.emp_id}";`

        let data2 = await query(querybraketime);

        for (let i = 0; i < data2.length; i++) {
            dailyBreakTime += Number(data2[i].total_brake_time);
        }

        monthlyBreakArr.push(dailyBreakTime);

        dailyBreakTime = 0;


    }

    const userInfo = await getUserBasicinfo(req.session.emp_id);
    const profilePhoto = await getUserProfilePhoto(["profile_photo"], req.session.emp_id);

    res.render("attendance", { data1, dailyBreakTime, monthlyBreakArr, dailyWorkHoursArr,monthlyWorkHours, "first_name": userInfo[0].first_name, "profilePhoto": profilePhoto[0].profile_photo, "tz":`${req.cookies.tz}` })
}

module.exports = { attendancy_summary }





