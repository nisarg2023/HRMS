const conn = require('../config/dbConnect');
const util = require('util');
const query = util.promisify(conn.query).bind(conn)


let currenttimestring;
let checkouttime1;
let brakeintime1;
let brakeouttimes1;


const get_checkin = () => {
    app.post("/checkin", (req, res) => {

        const date = moment().format("HH:mm:ss")
        currenttimestring = `${date}`;

        res.json({ msg: "okay-checkin", checkindate: date });
    });

}
const get_brakein = () => {
    app.post("/brakein", (req, res) => {

        const date = moment().format("HH:mm:ss")
        brakeintime1 = `${date}`;

        res.json({ msg: "okay-brakein", brakeindata: date });
    });
}
const get_brakeout = () => {
    app.post("/brakeout", async(req, res) => {

        const date = moment().format("HH:mm:ss")
        brakeouttimes1 = `${date}`;

        res.json({ msg: "okay-brakeout", brakeoutdate: date });

        let startTime = moment(brakeintime1, "hh:mm:ss");
        let currentTime = moment(brakeouttimes1, "hh:mm:ss");
        let minsDiff = currentTime.diff(startTime, "miutes");
        const datecurrent = moment().format("YYYY-MM-DD");

        let querybraketime = ` insert into brake_system (brakein_time,brakeout_time,total_brake_time,basic_info_id,brake_date) values("${brakeintime1}","${brakeouttimes1}","${minsDiff}","1","${datecurrent}")`;

        let result = await query(querybraketime);
    });
}
const get_checkout = () => {
    app.post("/checkout1", async(req, res) => {

        const date = moment().format("HH:mm:ss");
        const datecurrent = moment().format("YYYY-MM-DD");
        checkouttime1 = `${date}`;


        let startTime = moment(currenttimestring, "hh:mm:ss");
        let currentTime = moment(checkouttime1, "hh:mm:ss");
        let minsDiff = currentTime.diff(startTime, "miutes");

        res.json({ msg: "okay-checkout", checkoutdata: date });

        let querychecktime = ` insert into check_system (checkin_time,checkout_time,total_office_time,basic_info_id,check_date) values("${currenttimestring}","${checkouttime1}","${minsDiff}","1","${datecurrent}")`
        let result = await query(querychecktime);
    });
}
module.exports = { get_checkin, get_checkout, get_brakeout, get_brakein }