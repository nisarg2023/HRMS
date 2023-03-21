const conn = require('../config/dbConnect');
const util =  require('util');
const query =  util.promisify(conn.query).bind(conn)

const getUserBasicinfo = async(id="")=>{

    if(id=="")
    {

        const data = await query(`SELECT * FROM hrms.basic_info `)
        return data;
    }
    else{

    const data = await query(`SELECT basic_info_id,first_name FROM hrms.basic_info where fk_emp_id = ${id};`)
    return data;
    }

}

const getUserProfilePhoto = async(fields="*",id="")=>{

    if(id=="")
    {
        data = await query(`SELECT ${fields.toString()}  FROM hrms.document;`)
        return data;
    }
    else{
        data = await query(`SELECT ${fields.toString()} FROM hrms.document where fk_emp_id=${id}`);
        return data;
    }


}

const getDashboard = async(req,res)=>{
    const userInfo = await getUserBasicinfo(req.session.emp_id);
    const profilePhoto =  await getUserProfilePhoto(["profile_photo"],req.session.emp_id);
    
    res.render('dashboard',{"first_name": userInfo[0].first_name,"profilePhoto":profilePhoto[0].profile_photo})
  
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

module.exports = { getDashboard, getHotlines, getAttendance }