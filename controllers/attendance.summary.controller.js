const conn = require('../config/dbConnect');
const util = require('util');
const query = util.promisify(conn.query).bind(conn);
const moment = require("moment");
// const {getUserBasicinfo,getUserProfilePhoto} = require('./dashboard.controller')


const attendancy_summary = async(req, res) => {
    console.log("Heloo fromm att")
        // let total_time = [];
    let braketime = 0;
    let alltime_work_hours = 0;
    let total_brake = [];
    let total_workhours = [];

    let querychecktime = `SELECT * FROM check_system where basic_info_id = ${req.session.emp_id}`;


    let data1 = await query(querychecktime);


    for (let i = 0; i < data1.length; i++) {
        let timestmp = data1[i].total_office_time;
        alltime_work_hours += timestmp;


        let totlchecktime = moment.duration(timestmp);
        let m = totlchecktime.minutes();
        let h = totlchecktime.hours();
        let work_hours = h + ":" + m;


        total_workhours.push(work_hours);


    }

    for (let i = 0; i < data1.length; i++) {

        let querybraketime = `select total_brake_time from brake_system where brake_date ="${data1[i].check_date}";`


        let data2 = await query(querybraketime);



        for (let i = 0; i < data2.length; i++) {

            braketime += data2[i].total_brake_time;


        }

        let total_brake_ = moment.duration(braketime);

        let m = total_brake_.minutes();
        let h = total_brake_.hours();
        let brake_hours = h + ":" + m;

        total_brake.push(brake_hours);

        braketime = 0;


    }


    const getUserBasicinfo = async(id = "") => {

        if (id == "") {

            const data = await query(`SELECT * FROM hrms.basic_info `)
            return data;
        } else {

            const data = await query(`SELECT basic_info_id,first_name FROM hrms.basic_info where fk_emp_id = ${id};`)
            return data;
        }

    }

    const getUserProfilePhoto = async(fields = "*", id = "") => {

        if (id == "") {
            const data = await query(`SELECT ${fields.toString()}  FROM hrms.document;`)
            return data;
        } else {
            const data = await query(`SELECT ${fields.toString()} FROM hrms.document where fk_emp_id=${id}`);
            return data;
        }


    }



    const userInfo = await getUserBasicinfo(req.session.emp_id);
    const profilePhoto = await getUserProfilePhoto(["profile_photo"], req.session.emp_id);


    let totlchecktime = moment.duration(alltime_work_hours);
    let m = totlchecktime.minutes();
    let h = totlchecktime.hours();
    let all_work_hours = h + ":" + m;
    console.log("brakes", total_brake);
    res.render("attendance", { data1, total_brake, total_workhours, all_work_hours, "first_name": userInfo[0].first_name, "profilePhoto": profilePhoto[0].profile_photo })
}

module.exports = { attendancy_summary }