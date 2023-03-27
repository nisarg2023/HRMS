const conn = require('../config/dbConnect');
const util = require('util');
const query = util.promisify(conn.query).bind(conn);


const getBrakeInfo = async (req, res) => {
        const data = await query(`SELECT * FROM brake_system where basic_info_id =${req.query.emp_id} and brake_date ="${req.query.date}"`);
        
        res.json(data);
};

const getCkeckInOutInfo = async (req, res) => {
    const data = await query(`SELECT * FROM check_system where basic_info_id =${req.query.emp_id} and check_date="${req.query.date}"`);
    
    res.json(data);
};

const getAllEmployeesLog = async (req, res) => {

    try{
        const data =[];
        const checkInfo = await query(`select first_name,last_name, checkin_time,checkout_time from basic_info join check_system on basic_info.fk_emp_id
        = check_system.basic_info_id where check_date= '${req.query.date}'`)
         data.push(...checkInfo)

        const brakeInfo  = await query(`select first_name,last_name, brakein_time,brakeout_time from basic_info join brake_system on basic_info.fk_emp_id
        = brake_system.basic_info_id where brake_date= '${req.query.date}'`)
         data.push(...brakeInfo)



        res.json(data);

    }
    catch(err){
        console.log(err);
        res.send(err);
    }

}

module.exports = {getBrakeInfo, getCkeckInOutInfo,getAllEmployeesLog};