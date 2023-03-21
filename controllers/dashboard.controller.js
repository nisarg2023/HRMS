const conn = require("../config/dbConnect");
const util = require('util');
const query = util.promisify(conn.query).bind(conn);

const getDashboard = (req,res)=>{
    res.render('dashboard')
    //res.send("hello");

}

const getHotlines = (req,res)=>{
    res.render('hotline');
}

const getAttendance = (req,res)=>{
    res.render('attendance');
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