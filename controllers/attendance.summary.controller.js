const conn = require('../config/dbConnect');
const util = require('util');
const query = util.promisify(conn.query).bind(conn);
const moment = require("moment");


const attendancy_summary = async(req, res) => {
    let info_id = 1;
    // let total_time = [];
    let totalworkinhours = 0;
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
        totalworkinhours += braketime;
        console.log("in", totalworkinhours);
        let total_brake_ = moment.duration(braketime);

        let m = total_brake_.minutes();
        let h = total_brake_.hours();
        let brake_hours = h + ":" + m;

        total_brake.push(brake_hours);

        braketime = 0;


    }

    totalworkinhours += alltime_work_hours;
    console.log("***", alltime_work_hours - totalworkinhours);
    let q = moment.duration(totalworkinhours);

    let ho = q.hours();
    let all_stafing_hours = ho;
    let execute = totalworkinhours - alltime_work_hours;

    let todasd = moment.duration(execute);
    let dif_mins = moment.duration(totalworkinhours);

    let gg = todasd.minutes();
    let minuts = dif_mins.minutes();

    console.log("min*565*", gg, minuts);

    let productiveratio = (((minuts - gg) / minuts) * 100);
    console.log();


    console.log("minus", productiveratio);




    let totlchecktime = moment.duration(alltime_work_hours);

    let h = totlchecktime.hours();
    let all_work_hours = h;
    console.log("brakes", total_brake);

    res.render("attendance-summary.ejs", { data1, total_brake, total_workhours, all_work_hours, all_stafing_hours, productiveratio })
}

module.exports = { attendancy_summary }