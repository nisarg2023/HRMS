const conn = require('../config/dbConnect');
const util = require('util');
const query = util.promisify(conn.query).bind(conn)


const dashboardProfile = require('./dashboardprofile.controller')



const getCommentData = async (req,res)=>{
    const userInfo = await dashboardProfile.getUserBasicinfo(req.session.emp_id)
    const profilePhoto =  await dashboardProfile.getUserProfilePhoto(["profile_photo"],req.session.emp_id);

    let allCommentQuery=`select employee_comment.emp_comment_id,employee_comment.fk_emp_id,basic_info.first_name, basic_info.last_name,
    employee_comment.comment_date,employee_comment.comment ,employee_comment.comment_status 
    from employee_comment left join basic_info 
    on employee_comment.fk_emp_id=basic_info.fk_emp_id where employee_comment.comment_status = 0 order by employee_comment.emp_comment_id ;`
    let commentsData= await query(allCommentQuery);

    res.render('adminComments',{commentsData,"first_name": userInfo[0].first_name,"profilePhoto":profilePhoto[0].profile_photo});
    
}


// to update the status of comment of read or not
const getCommentId = async (req,res)=>{
    var commentId= req.query.commentId;
    var comment= req.query.comment;
    if(commentId){

        var idQuery=`update employee_comment  set comment_status="1" where emp_comment_id="${commentId}";`
        var idData= await query(idQuery);
        res.redirect('comments')
    }
    else{
        res.json()
    }
}


module.exports = {getCommentData,getCommentId}
