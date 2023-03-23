const conn = require('../config/dbConnect');
const util = require('util')
const query =  util.promisify(conn.query).bind(conn)


const userRenderGet= async(req,res)=>{
    res.render('userProfile')
}

module.exports={userRenderGet}