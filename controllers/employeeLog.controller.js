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

module.exports = {getBrakeInfo, getCkeckInOutInfo};