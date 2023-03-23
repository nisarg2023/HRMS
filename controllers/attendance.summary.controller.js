const conn = require('../config/dbConnect');
const util = require('util');
const query = util.promisify(conn.query).bind(conn);
const moment = require("moment");


const attendancy_summary = async(req, res) => {
    let info_id = 1;
    // let total_time = [];
    let braketime = 0;
    let alltime_work_hours = 0;
    let total_brake = [];
    let total_workhours = [];

    let querychecktime = `SELECT * FROM hrms.check_system where basic_info_id = ${info_id}`;


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

        let querybraketime = `select total_brake_time from  hrms.brake_system where date ="${data1[i].date}";`


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


    let totlchecktime = moment.duration(alltime_work_hours);
    let m = totlchecktime.minutes();
    let h = totlchecktime.hours();
    let all_work_hours = h + ":" + m;
    console.log("brakes", total_brake);
    res.render("attendance-summary.ejs", { data1, total_brake, total_workhours, all_work_hours })
}

module.exports = { attendancy_summary }