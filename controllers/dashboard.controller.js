const conn = require('../config/dbConnect');
const util =  require('util');
const query =  util.promisify(conn.query).bind(conn)

const getUserBasicinfo = async(id="")=>{

    if(id=="")
    {

        const data = await query(`SELECT * FROM basic_info `)
        return data;
    }
    else{
        
    const data = await query(`SELECT basic_info_id,first_name FROM basic_info where fk_emp_id = ${id};`)
    return data;
    }

}

const getEmail = async(fields="*",id="")=>{

    if(id=="")
    {
        const data = await query(`SELECT ${fields.toString()} FROM hrms_employee;`)
        return data;
    }
    else{
        const data = await query(`SELECT ${fields.toString()} FROM hrms_employee where emp_id=${id};`)
        return data;
    }
    
}

const getUserProfilePhoto = async(fields="*",id="")=>{

    if(id=="")
    {
        data = await query(`SELECT ${fields.toString()}  FROM document;`)
        return data;
    }
    else{
        data = await query(`SELECT ${fields.toString()} FROM document where fk_emp_id=${id}`);
        return data;
    }


}

const getDashboard = async(req,res)=>{
    const userInfo = await getUserBasicinfo(req.session.emp_id);
    const profilePhoto =  await getUserProfilePhoto(["profile_photo"],req.session.emp_id);
    var commentSql=`select comment from employee_comment where comment_status='0' and fk_emp_id='${req.session.emp_id}' ;`
    var commentData= await query(commentSql)
    res.render('dashboard',{commentData,"first_name": userInfo[0].first_name,"profilePhoto":profilePhoto[0].profile_photo,"emp_id":req.session.emp_id})
    // <%- include("components/add-your-comment.ejs") %>
}



const getHotlines = async(req,res)=>{
    const userInfo = await getUserBasicinfo(req.session.emp_id)
    const allUsers = await getUserBasicinfo();
    const profilePhotos =  await getUserProfilePhoto(["profile_photo"]);
    const emails = await getEmail(["email"])
    const profilePhoto =  await getUserProfilePhoto(["profile_photo"],req.session.emp_id);
    res.render('hotline',{"first_name": userInfo[0].first_name,allUsers,profilePhotos,"profilePhoto":profilePhoto[0].profile_photo,emails});
}

const getAttendance = async (req,res)=>{
    const userInfo = await getUserBasicinfo(req.session.emp_id);
    const profilePhoto =  await getUserProfilePhoto(["profile_photo"],req.session.emp_id);
    res.render('attendance',{"first_name": userInfo[0].first_name,"profilePhoto":profilePhoto[0].profile_photo});
    
}

const getComment = async (req,res)=>{
    const userInfo = await getUserBasicinfo(req.session.emp_id);
    var comment = req.query.comment;
    var commentQuery = `insert into employee_comment (fk_emp_id,comment) values (${req.session.emp_id},'${comment}');`
    var commentData=await query(commentQuery);
    res.json({message:true});
}

// to update the status of comment of read or not
const getCommentId = async (req,res)=>{
    var commentId= req.query.commentId;
    var comment= req.query.comment;
    if(commentId){

        var idQuery=`update employee_comment  set comment_status="1" where emp_comment_id="${commentId}";`
        var idData= await query(idQuery);
        res.redirect('allComment')
    }
    else{
        res.json()
    }
}
//  allcomment page 
const getCommentData = async (req,res)=>{
    const userInfo = await getUserBasicinfo(req.session.emp_id);

    var allCommentQuery=`select employee_comment.emp_comment_id,employee_comment.fk_emp_id,basic_info.first_name,employee_comment.comment_time,
    employee_comment.comment_date,employee_comment.comment,employee_comment.comment_status from employee_comment left join basic_info 
    on employee_comment.fk_emp_id=basic_info.fk_emp_id order by employee_comment.emp_comment_id ;`
    var allCommentData= await query(allCommentQuery);

    res.render('allComment',{c:allCommentData,name:userInfo[0].first_name});
    
}

const updateCommentCard = async (req,res)=>{
    // console.log("Hello")
    var commentSql=`select comment from employee_comment where comment_status='0' and fk_emp_id='${req.session.emp_id}' ;`
    var commentData= await query(commentSql)
    res.json(commentData)
} 


const getDataProfile= async(req,res)=>{
    const userInfo = await getUserBasicinfo(req.session.emp_id)
    const allUsers = await getUserBasicinfo();
    const profilePhotos =  await getUserProfilePhoto(["profile_photo"]);
    const emails = await getEmail(["email"])
    const profilePhoto =  await getUserProfilePhoto(["profile_photo"],req.session.emp_id);
    console.log(emails);
    res.render('viewProfile',{"first_name": userInfo[0].first_name,dataset: userInfo[0],allUsers,profilePhotos,"profilePhoto":profilePhoto[0].profile_photo,emails});


}

module.exports = {getDashboard,getHotlines,getAttendance,getComment,getCommentData,getCommentId,getDataProfile,updateCommentCard}
