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
    var commentSql=`select comment from employee_comment where comment_status='0' and fk_emp_id='${userInfo[0].basic_info_id},' ;`
    // console.log(commentSql);
    var commentData= await query(commentSql)
   
    console.log("session : ",req.session);
    res.render('dashboard',{commentData,"first_name": userInfo[0].first_name,"profilePhoto":profilePhoto[0].profile_photo})
    // <%- include("components/add-your-comment.ejs") %>
}

const getHotlines = async(req,res)=>{
    const userInfo = await getUserBasicinfo(req.session.emp_id)
    const allUsers = await getUserBasicinfo();
    const profilePhotos =  await getUserProfilePhoto(["profile_photo"]);
    const profilePhoto =  await getUserProfilePhoto(["profile_photo"],req.session.emp_id);

    console.log(profilePhotos)
    res.render('hotline',{"first_name": userInfo[0].first_name,allUsers,profilePhotos,"profilePhoto":profilePhoto[0].profile_photo});
}

const getAttendance = async (req,res)=>{
    const userInfo = await getUserBasicinfo(req.session.emp_id);
    const profilePhoto =  await getUserProfilePhoto(["profile_photo"],req.session.emp_id);
    res.render('attendance',{"first_name": userInfo[0].first_name,"profilePhoto":profilePhoto[0].profile_photo});
    
}
const getComment = async (req,res)=>{
    const userInfo = await getUserBasicinfo(req.session.emp_id);
    var comment = req.query.comment;
    console.log(userInfo);
    console.log(userInfo[0].basic_info_id);
    var commentQuery = `insert into employee_comment (fk_emp_id,comment) values (${userInfo[0].basic_info_id},'${comment}');`
    var commentData=await query(commentQuery);
    res.json({message:true});
}
const getCommentId = async (req,res)=>{
    var commentId= req.query.commentId;
    var comment= req.query.comment;
    console.log(comment);
    if(commentId){

        console.log(commentId);
        var idQuery=`update employee_comment  set comment_status="1" where emp_comment_id="${commentId}";`
        var idData= await query(idQuery);
    }
    else{
        res.json()
    }
}
const getCommentData = async (req,res)=>{
    const userInfo = await getUserBasicinfo(req.session.emp_id);
    console.log(userInfo[0].first_name);

    var allCommentQuery=`select employee_comment.emp_comment_id,employee_comment.fk_emp_id,basic_info.first_name,employee_comment.comment_time,
    employee_comment.comment_date,employee_comment.comment,employee_comment.comment_status from employee_comment left join basic_info 
    on employee_comment.fk_emp_id=basic_info.fk_emp_id order by employee_comment.emp_comment_id ;`
    var allCommentData= await query(allCommentQuery);
    console.log(allCommentData);
    res.render('allComment',{c:allCommentData,name:userInfo[0].first_name});
  
}

module.exports = { getDashboard, getHotlines, getAttendance,getComment ,getCommentId,getCommentData}