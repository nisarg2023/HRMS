const util =  require('util');
const conn = require('../config/dbConnect');
const query =  util.promisify(conn.query).bind(conn)

const getDashboard = async(req,res)=>{

     var show = await query(`select first_name from basic_info where basic_info_id = 1`);

    res.render('dashboard.ejs',{show})
    // res.send("hello");

}

const getHotlines = (req,res)=>{
    res.render('hotline');
}

module.exports = {getDashboard,getHotlines}