const conn = require('../config/dbConnect');
const util = require('util')
const query = util.promisify(conn.query).bind(conn);

const getUserBasicinfo = async (id = "") => {

    if (id == "") {

        const data = await query(`SELECT * FROM hrms.basic_info `)
        return data;
    } else {

        const data = await query(`SELECT basic_info_id,first_name FROM hrms.basic_info where fk_emp_id = ${id};`)
        return data;
    }

}

const getUserProfilePhoto = async (fields = "*", id = "") => {

    if (id == "") {
        data = await query(`SELECT ${fields.toString()}  FROM hrms.document;`)
        return data;
    } else {
        data = await query(`SELECT ${fields.toString()} FROM hrms.document where fk_emp_id=${id}`);
        return data;
    }


}
const getSensation = async (req, res) => {
    const data= await query(`select sensation.fk_emp_id,sensation.comment_id,basic_info.first_name,sensation.sensation_comment,document.profile_photo from sensation 
    inner join basic_info on sensation.fk_emp_id=basic_info.fk_emp_id 
    inner join document on sensation.fk_emp_id=document.fk_emp_id order by created_time; ` );
    const userData = await getUserBasicinfo(req.session.emp_id);
    const userInfo = await getUserBasicinfo(req.session.emp_id);
    const profilePhoto = await getUserProfilePhoto(["profile_photo"], req.session.emp_id);
    res.render('sensation', {data,"first_name": userInfo[0].first_name, "profilePhoto": profilePhoto[0].profile_photo, "emp_id":req.session.emp_id });
}

const postSensation = (req, res) => {
    try {

        var inputValue = req.body.sensation;
        
        const data = query(`insert into sensation (fk_emp_id,sensation_comment) values ('${req.session.emp_id}','${inputValue}')`)
        res.redirect("/dashbord/get-sensation")

    }
    catch {
        res.redirect('/dashbord')
    }
}

module.exports = { getSensation, postSensation }