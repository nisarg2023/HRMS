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
        
    const data = await query(`SELECT basic_info_id,fk_emp_id,first_name FROM basic_info where fk_emp_id = ${id};`)
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
    console.log("session : ",req.session);
    res.render('dashboard',{"first_name": userInfo[0].first_name,"emp_id":userInfo[0].fk_emp_id,"profilePhoto":profilePhoto[0].profile_photo})
  
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
    var comment = req.query.comment;
    // console.log("hwifhwhfifgiuwgfijkgwsfuigtwufgswjfswjfgweikfgsdu");
    // res.send("Your Comment ")
    console.log(comment);
    var commentQuery = `insert into employee_comment (fk_emp_id,comment) values (1,'${comment}');`
    var commentData=await query(commentQuery);
    res.json();
    // console.log(commentData);
}
const getCommentId = async (req,res)=>{
    var commentId= req.query.commentId;
    if(commentId){

        console.log(commentId);
        var idQuery=`update employee_comment  set comment_status="1" where emp_comment_id="${commentId}";`
        var idData= await query(idQuery);
    }
    else{
        res.send("Could not read comment")
    }
}
const getCommentData = async (req,res)=>{
    var allCommentQuery=`select * from employee_comment;`
    var allCommentData= await query(allCommentQuery);
    res.render('allComment',{c:allCommentData});
    // console.log(allCommentData);
}


module.exports = {getDashboard,getHotlines,getAttendance,getComment,getCommentData,getCommentId}
