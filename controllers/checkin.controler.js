const conn = require('../config/dbConnect');
const util = require('util');
const query = util.promisify(conn.query).bind(conn);
const moment = require("moment");
const session = require('express-session');


let currenttimestring;
let checkouttime1;
let brakeintime1;
let brakeouttimes1;
let checkInLastInsertid;
let brakeInLastInsertid;


const get_checkin = async (req, res) => {


        const date = moment().format("HH:mm:ss")
        currenttimestring = `${date}`;
        const datecurrent = moment().format("YYYY-MM-DD");
        checkouttime1 = `${date}`;


        let startTime = moment(currenttimestring, "hh:mm:ss");
        let currentTime = moment(checkouttime1, "hh:mm:ss");
        let minsDiff = currentTime.diff(startTime, "miutes");

        let querychecktime = ` insert into check_system (checkin_time,total_office_time,basic_info_id,check_date) values("${currenttimestring}","${minsDiff}","${req.session.emp_id}","${datecurrent}")`
        let result = await query(querychecktime);  
        checkInLastInsertid = result.insertId;

        res.json({ msg: "okay-checkin", checkindate: date });


}

const get_checkout = async (req, res) => {
  

        const date = moment().format("HH:mm:ss");
        const datecurrent = moment().format("YYYY-MM-DD");
        checkouttime1 = `${date}`;


        let startTime = moment(currenttimestring, "hh:mm:ss");
        let currentTime = moment(checkouttime1, "hh:mm:ss");
        let minsDiff = currentTime.diff(startTime, "miutes");

        
        var querychecktime = `UPDATE check_system SET checkout_time = "${checkouttime1}" ,total_office_time = "${minsDiff}" where check_system_id="${checkInLastInsertid}"`
        
        
        
        let result = await query(querychecktime);
        console.log(result);
        res.json({ msg: "okay-checkout", checkoutdata: date });
}

const get_brakein = async (req, res) => {
    
        const date = moment().format("HH:mm:ss")
        brakeintime1 = `${date}`;
        
        let startTime = moment(brakeintime1, "hh:mm:ss");
        let currentTime = moment(brakeouttimes1, "hh:mm:ss");
        let minsDiff = currentTime.diff(startTime, "miutes");
        const datecurrent = moment().format("YYYY-MM-DD");

        let querybraketime = ` insert into brake_system (brakein_time,basic_info_id,brake_date) values("${brakeintime1}","${req.session.emp_id}","${datecurrent}")`;

        
        let result = await query(querybraketime);
        brakeInLastInsertid = result.insertId;

        res.json({ msg: "okay-brakein", brakeindata: date });
  
}
const get_brakeout =async (req, res) => {
   

        const date = moment().format("HH:mm:ss")
        brakeouttimes1 = `${date}`;

        
        let startTime = moment(brakeintime1, "hh:mm:ss");
        let currentTime = moment(brakeouttimes1, "hh:mm:ss");
        let minsDiff = currentTime.diff(startTime, "miutes");
        const datecurrent = moment().format("YYYY-MM-DD");
        
        let querybraketime = `UPDATE brake_system SET brakeout_time = "${brakeouttimes1}" ,total_brake_time = "${minsDiff}" where idbrake_system="${brakeInLastInsertid}"
        `
        
        
        let result = await query(querybraketime);
        
        res.json({ msg: "okay-brakeout", brakeoutdate: date });
}

module.exports = { get_checkin, get_checkout, get_brakeout, get_brakein }