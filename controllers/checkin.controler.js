const conn = require('../config/dbConnect');
const util = require('util');
const query = util.promisify(conn.query).bind(conn);
const moment = require("moment");
const session = require('express-session');


let currenttimestring;
let checkouttime1;
let brakeintime1;
let brakeouttimes1;



const get_checkin = async(req, res) => {

    const date = moment().format('YYYY-MM-DD HH:mm:ss')

        try {
                let isAlreadyCheckin = await query(`SELECT * FROM check_system where basic_info_id = ${req.session.emp_id} and check_date = "${moment().format('YYYY-MM-DD')}";`)
                if(isAlreadyCheckin.length!=0) 
                {
                    res.json({"isAlreadyCheckin": true})
                }
                else{
                let querychecktime = ` insert into check_system (checkin_time,basic_info_id,check_date) values("${date}","${req.session.emp_id}","${date}")`
                
                await query(querychecktime);

                res.json({ msg: "okay-checkin", checkindate: date });
                }
        }
        catch (err) {
                res.send(err);
        }
}

const get_checkout = async(req, res) => {

    const date = moment().format('YYYY-MM-DD HH:mm:ss')


    let startTime = moment(currenttimestring, "hh:mm:ss");
    let currentTime = moment(checkouttime1, "hh:mm:ss");
    let minsDiff = currentTime.diff(startTime, "miutes");

    try {
        conn.beginTransaction();
        const checkInLastInsertid = await query(`SELECT  max(check_system_id) as val  FROM check_system where basic_info_id =${req.session.emp_id}`);

        const checkInTime = await query(`select checkin_time from check_system where check_system_id = (SELECT  max(check_system_id) as val  FROM check_system where basic_info_id = ${req.session.emp_id});`)



        let start = moment(checkInTime[0].checkin_time);
        let end = moment(date);
        

        let checkDiff = end.diff(start,"minute");




        var querychecktime = `UPDATE check_system SET checkout_time = "${date}" ,total_office_time = "${checkDiff}" where check_system_id="${checkInLastInsertid[0].val}"`
        
        await query(querychecktime);
        
        conn.commit();

        res.json({ msg: "okay-checkout", checkoutdata: date });
        
    } catch (err) {
        conn.rollback();
        res.send(err);
    }
}

const get_brakein = async(req, res) => {

    const date = moment().format('YYYY-MM-DD HH:mm:ss')


    try {

        let isAlreadyBrakein = await query(`SELECT  brakeout_time,brakein_time  FROM brake_system  where idbrake_system in (SELECT  max(idbrake_system)  FROM brake_system where basic_info_id = ${req.session.emp_id} and brake_date = "${moment().format('YYYY-MM-DD')}");`)
        
        console.log(isAlreadyBrakein);
        if(isAlreadyBrakein.length!=0)
        {
            if(isAlreadyBrakein[0].brakeout_time)
            {
                let querybraketime = `insert into brake_system (brakein_time,basic_info_id,brake_date) values("${date}","${req.session.emp_id}","${date}")`;
                
                await query(querybraketime);
        
                res.json({ msg: "okay-brakein", brakeindata: date });}

            else{

                res.json({"isAlreadyBrakein": true});
            }
        }
        else{
        let querybraketime = `insert into brake_system (brakein_time,basic_info_id,brake_date) values("${date}","${req.session.emp_id}","${date}")`;
        
        await query(querybraketime);

        res.json({ msg: "okay-brakein", brakeindata: date });
        }
    } catch (err) {
        console.log(err);
        res.send(err);
    }

}
const get_brakeout = async(req, res) => {


    const date = moment().format('YYYY-MM-DD HH:mm:ss')


    // let startTime = moment(brakeintime1, "hh:mm:ss");
    // let currentTime = moment(brakeouttimes1, "hh:mm:ss");
    // let minsDiff = currentTime.diff(startTime, "miutes");
    // const datecurrent = moment().format('YYYY-MM-DD HH:mm:ss')


    try {
        const brakeInLastInsertid = await query(`SELECT max(idbrake_system) as val FROM brake_system where basic_info_id =${req.session.emp_id}`);

        const breakInTime = await query(`SELECT brakein_time from brake_system where idbrake_system = (SELECT max(idbrake_system) as val FROM brake_system where basic_info_id = ${req.session.emp_id});`)

        let start = moment(breakInTime[0].brakein_time);
        let end = moment(date);
        
        

        let breakDiff = end.diff(start,"minute");

        // let breakDiffs = `${(Math.floor(breakDiff/60)>9)?(Math.floor(breakDiff/60)):("0"+Math.floor(breakDiff/60))}:${(Math.floor(breakDiff%60)>9)?(Math.floor(breakDiff%60)):("0"+Math.floor(breakDiff%60))}`



        let querybraketime = `UPDATE brake_system SET brakeout_time = "${date}" ,total_brake_time = "${breakDiff}" where idbrake_system="${brakeInLastInsertid[0].val}"`
        await query(querybraketime);


        res.json({ msg: "okay-brakeout", brakeoutdate: date });

    } catch (err) {
        console.log(err)
        res.send(err);
    }
}

module.exports = { get_checkin, get_checkout, get_brakeout, get_brakein }