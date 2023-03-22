const conn = require('../config/dbConnect');
const util = require('util');
const query = util.promisify(conn.query).bind(conn);
const moment = require("moment");


const attendancy_summary = async(req, res) => {
    let info_id = 1;
    let data2;
    let braketime = 0;
    let querychecktime = `SELECT * FROM hrms.check_system where basic_info_id = ${info_id}`;


    let data1 = await query(querychecktime);


    for (i = 0; i < data1.length; i++) {
        let querybraketime = `select * from  brake_system where check_system_id =${i};`
        data2 = await query(querybraketime);



        for (i = 0; i < data2.length; i++) {
            braketime += data2[i].total_brake_time;
        }
        let queryupdate = `update brake_system`


    }
    res.render("attendance-summary.ejs", { data: data1, result: data2 });

}









module.exports = { attendancy_summary }