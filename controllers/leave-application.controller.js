const conn = require('../config/dbConnect');
const util = require('util')
const query =  util.promisify(conn.query).bind(conn)


const getLeaveapplication = async (req,res)=>{
    const result = await query(`select * from leave_application where fk_emp_id = ${req.session.emp_id}`)

    var leavesObject = {
        sLeave: 0,
        cLeave: 0,
        pLeave: 0,
        upLeave: 0,
    }
    for(x of result){
        if(x.leave_type == 'SL'){
            leavesObject.sLeave+=1;
        }
        else if(x.leave_type == 'CL'){
            leavesObject.cLeave+=1;
        }
        else if(x.leave_type == 'PL'){
            leavesObject.pLeave+=1;
        }
        else if(x.leave_type == 'UPL'){
            leavesObject.upLeave+=1;
        }
    }
    res.render('leaveapplication', {result,leavesObject})
}
const postLeaveapplication = async(req,res)=>{
    res.redirect('/deshbord/leave')
    // if(req.body.leave_type === "" || req.body.leave_date === "" || req.body.leave_reason === ""){
    //     return;
    // }
    // else{
        let result = await query(`insert into leave_application(fk_emp_id, leave_date,leave_reason,leave_type,is_halfday) values('${req.session.emp_id}','${req.body.leave_date}','${req.body.leave_reason}','${req.body.leave_type}','${req.body.is_half}')`)
    // }

}


module.exports = {getLeaveapplication,postLeaveapplication}