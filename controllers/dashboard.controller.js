const conn = require('../config/dbConnect');
const util = require('util');
const query = util.promisify(conn.query).bind(conn)

const getUserBasicinfo = async(id = "") => {

    if (id == "") {

        const data = await query(`SELECT * FROM basic_info `)
        return data;
    } else {

        const data = await query(`SELECT * FROM hrms.basic_info where fk_emp_id = ${id};`)
        return data;
    }

}

const getEmail = async(fields = "*", id = "") => {

    if (id == "") {
        const data = await query(`SELECT ${fields.toString()} FROM hrms_employee;`)
        return data;
    } else {
        const data = await query(`SELECT ${fields.toString()} FROM hrms_employee where emp_id=${id};`)
        return data;
    }

}

const getUserProfilePhoto = async(fields = "*", id = "") => {

    if (id == "") {
        data = await query(`SELECT ${fields.toString()}  FROM document;`)
        return data;
    } else {
        data = await query(`SELECT ${fields.toString()} FROM document where fk_emp_id=${id}`);
        return data;
    }


}

const getDashboard = async(req, res) => {
    const userInfo = await getUserBasicinfo(req.session.emp_id);
    const profilePhoto =  await getUserProfilePhoto(["profile_photo"],req.session.emp_id);
    var commentSql=`select comment from employee_comment where comment_status='0' and fk_emp_id='${req.session.emp_id}' ;`
    var commentData= await query(commentSql)
    res.render('dashboard',{commentData,"first_name": userInfo[0].first_name,"profilePhoto":profilePhoto[0].profile_photo,"emp_id":req.session.emp_id})
    // <%- include("components/add-your-comment.ejs") %>
}



const getHotlines = async(req, res) => {
    const userInfo = await getUserBasicinfo(req.session.emp_id)
    const allUsers = await getUserBasicinfo();
    const profilePhotos = await getUserProfilePhoto(["profile_photo"]);
    const emails = await getEmail(["email"])
    const profilePhoto = await getUserProfilePhoto(["profile_photo"], req.session.emp_id);
    res.render('hotline', { "first_name": userInfo[0].first_name, allUsers, profilePhotos, "profilePhoto": profilePhoto[0].profile_photo, emails });
}



const getComment = async (req,res)=>{
    const userInfo = await getUserBasicinfo(req.session.emp_id);
    var comment = req.query.comment;
    var commentQuery = `insert into employee_comment (fk_emp_id,comment) values (${req.session.emp_id},'${comment}');`
    var commentData=await query(commentQuery);
    res.json({message:true});
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
    const email = req.session.email;
    const profilePhoto =  await getUserProfilePhoto(["profile_photo"],req.session.emp_id);
    const e_id = req.session.emp_id;

    console.log(userInfo[0]);
    const document_query = await query(`select * from document where fk_emp_id = "${e_id}"`);
    res.render('viewProfile',{"first_name": userInfo[0].first_name,dataset: userInfo[0],allUsers,profilePhotos,"profilePhoto":profilePhoto[0].profile_photo,email,document:document_query});
    

}

module.exports = {getDashboard,getHotlines,getComment,getDataProfile,updateCommentCard}
