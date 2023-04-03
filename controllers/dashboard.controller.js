const conn = require('../config/dbConnect');
const util = require('util');
const query = util.promisify(conn.query).bind(conn)
const moment =  require('moment');

const getUserBasicinfo = async(id = "") => {

    if (id == "") {

        const data = await query(`SELECT * FROM basic_info `)
        return data;
    } else {

        const data = await query(`SELECT * FROM basic_info where fk_emp_id = ${id};`)
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

const getAllEmployeesLog = async (currentDate) => {

    try{
        const data =[];
        const checkInfo = await query(`select fk_emp_id,first_name,last_name, checkin_time,checkout_time from basic_info join check_system on basic_info.fk_emp_id
        = check_system.basic_info_id where check_date= '${currentDate}'`)
         data.push(checkInfo)

        const brakeInfo  = await query(`select fk_emp_id,first_name,last_name, brakein_time,brakeout_time from basic_info join brake_system on basic_info.fk_emp_id
        = brake_system.basic_info_id where brake_date= '${currentDate}' `)
         
        data.push(brakeInfo)
        return data;


        

    }
    catch(err){
        console.log(err);
        return 0;
    }

}




const getDashboard = async(req, res) => {
   try{
    let sqlData = await query(`select * from basic_info where fk_emp_id = ${req.session.emp_id}`)
    if(sqlData.length == 0){
        res.redirect('/employee/get-employee-data')
    }
    else{
        const userInfo = await getUserBasicinfo(req.session.emp_id);
        const profilePhoto = await getUserProfilePhoto(["profile_photo"], req.session.emp_id);
        var commentSql = `select comment from employee_comment where comment_status='0' and fk_emp_id='${req.session.emp_id}' ;`
        var commentData = await query(commentSql)
        res.render('dashboard', { commentData, "first_name": userInfo[0].first_name, "profilePhoto": profilePhoto[0].profile_photo, "emp_id": req.session.emp_id })    
    }
   }
   catch(err){
    console.log(err)
   }
}



const getHotlines = async(req, res) => {
    const userInfo = await getUserBasicinfo(req.session.emp_id)
    const allUsers = await getUserBasicinfo();
    const profilePhotos = await getUserProfilePhoto(["profile_photo"]);
    const emails = await getEmail(["email"])

    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();


    let currentDate = `${year}-${(month > 9) ? (month) : ("0" + month)}-${(day > 9) ? (day) : ("0" + day)}`;

    const allEmployeesLog = await getAllEmployeesLog(currentDate);
    const profilePhoto = await getUserProfilePhoto(["profile_photo"], req.session.emp_id);
    res.render('hotline', { "first_name": userInfo[0].first_name, allUsers, profilePhotos, "profilePhoto": profilePhoto[0].profile_photo, emails,allEmployeesLog });
}



const getComment = async(req, res) => {
    const userInfo = await getUserBasicinfo(req.session.emp_id);
    var comment = req.query.comment;
    var commentQuery = `insert into employee_comment (fk_emp_id,comment) values (${req.session.emp_id},'${comment}');`
    var commentData = await query(commentQuery);
    res.json({ message: true });
}


const updateCommentCard = async(req, res) => {
    var commentSql = `select comment from employee_comment where comment_status='0' and fk_emp_id='${req.session.emp_id}' ;`
    var commentData = await query(commentSql)
    res.json(commentData)
}


const getDataProfile= async(req,res)=>{
    const userInfo = await getUserBasicinfo(req.session.emp_id)
    const allUsers = await getUserBasicinfo();
    const profilePhotos = await getUserProfilePhoto(["profile_photo"]);
    const email = req.session.email;
    const profilePhoto = await getUserProfilePhoto(["profile_photo"],req.session.emp_id);
    const e_id = req.session.emp_id;
    
    const document_query = await query(`select * from document where fk_emp_id = "${e_id}"`);
    res.render('viewProfile',{"first_name": userInfo[0].first_name,dataset: userInfo[0],allUsers,profilePhotos,"profilePhoto":profilePhoto[0].profile_photo,email,document:document_query});
    
    
}


const getOnlineEmployeeLogs = async (req,res)=>{

    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();


    let currentDate = `${year}-${(month > 9) ? (month) : ("0" + month)}-${(day > 9) ? (day) : ("0" + day)}`;


    const OnlineEmployeeData = await query(`select first_name,last_name,profile_photo,email,phone_number from basic_info inner join document on basic_info.fk_emp_id = document.fk_emp_id 
    inner join hrms_employee on hrms_employee.emp_id=basic_info.fk_emp_id where basic_info.fk_emp_id  
    in (select basic_info_id from check_system where check_date = '${currentDate}' 
    and checkout_time is null 
    and basic_info_id not in(select brake_syReadstem.basic_info_id 
    from check_system join brake_system on brake_system.basic_info_id = check_system.basic_info_id 
    where checkout_time is null and brake_system.brakeout_time is null and check_system.check_date = '${currentDate}'));`)

    res.json(OnlineEmployeeData)
}

const getBreakEmployeeLogs = async (req,res)=>{

    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();


    let currentDate = `${year}-${(month > 9) ? (month) : ("0" + month)}-${(day > 9) ? (day) : ("0" + day)}`;
    

    const BreakEmployeeData = await query(`select first_name,last_name,profile_photo,email,phone_number from basic_info inner join document on basic_info.fk_emp_id = document.fk_emp_id 
    inner join hrms_employee on hrms_employee.emp_id=basic_info.fk_emp_id where basic_info.fk_emp_id  
    in 
    (select brake_system.basic_info_id from check_system join brake_system
     on brake_system.basic_info_id = check_system.basic_info_id 
     where checkout_time is null and brake_system.brakeout_time is null and check_system.check_date = '${currentDate}')`)

    res.json(BreakEmployeeData)
}

const getOfflineEmployeeLogs = async (req,res)=>{

    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();


    let currentDate = `${year}-${(month > 9) ? (month) : ("0" + month)}-${(day > 9) ? (day) : ("0" + day)}`;


    // const OfflineEmployeeData = await query(`select first_name,last_name,profile_photo,email,phone_number from basic_info inner join document on basic_info.fk_emp_id = document.fk_emp_id 
    // inner join hrms_employee on hrms_employee.emp_id=basic_info.fk_emp_id where basic_info.fk_emp_id  
    // not in (select basic_info_id from check_system where check_date = '${currentDate}' 
    // and checkout_time is null 
    // and basic_info_id not in(select brake_system.basic_info_id 
    // from check_system join brake_system on brake_system.basic_info_id = check_system.basic_info_id 
    // where checkout_time is null and brake_system.brakeout_time is null and check_system.check_date = '${currentDate}'));`)

    // const OfflineEmployeeData = await query(`select first_name,last_name,profile_photo,email,phone_number from basic_info inner join document on basic_info.fk_emp_id = document.fk_emp_id
    // inner join hrms_employee on hrms_employee.emp_id=basic_info.fk_emp_id where basic_info.fk_emp_id
    // not in (select fk_emp_id from leave_application where is_hr_approved = 1 and leave_date = '${currentDate}' and
    // fk_emp_id not in (select basic_info_id from check_system where check_date = '${currentDate}')
    // );`)

    const OfflineEmployeeData = await query(`select basic_info_id,last_name,profile_photo,email,phone_number from basic_info 
	inner join document on basic_info.fk_emp_id = document.fk_emp_id
    inner join hrms_employee on hrms_employee.emp_id=basic_info.fk_emp_id where basic_info.fk_emp_id
    not in (select fk_emp_id from leave_application where is_hr_approved = 1 and leave_date = '${currentDate}')
    and basic_info.fk_emp_id not in (select basic_info_id from check_system where check_date = '${currentDate}');`)


    res.json(OfflineEmployeeData)
}

const getLeaveEmployeeData = async (req, res) =>{
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();


    let currentDate = `${year}-${(month > 9) ? (month) : ("0" + month)}-${(day > 9) ? (day) : ("0" + day)}`;


    const LeaveEmployeeData = await query(`
    select first_name,last_name,profile_photo,email,phone_number from basic_info inner join document 
    on basic_info.fk_emp_id = document.fk_emp_id 
        inner join hrms_employee on hrms_employee.emp_id=basic_info.fk_emp_id where basic_info.fk_emp_id  
        in (select fk_emp_id from leave_application where is_hr_approved = 1 and leave_date = '${currentDate}' and
    fk_emp_id not in (select basic_info_id from check_system where check_date = '${currentDate}'));`)

    res.json(LeaveEmployeeData)
}






module.exports = {getDashboard,getHotlines,getComment,getDataProfile,updateCommentCard, getOnlineEmployeeLogs,getBreakEmployeeLogs,getOfflineEmployeeLogs, getLeaveEmployeeData}
