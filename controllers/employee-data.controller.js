const conn = require('../config/dbConnect');
const util = require('util');
const query = util.promisify(conn.query).bind(conn);

const multer = require('multer');
const getEmployeedata = async(req, res) => {
    state_query = `select state_name from state_master;`
    var stateName = await query(state_query);
    console.log(stateName.length);
    res.render('employee-data-form', { stateName });

} 
var storage = multer.diskStorage({
    destination: function(req, files, cb) {

        cb(null, `./uploads/${files.fieldname}/`);
    },
    filename: function(req, files, cb, ) {
        //  console.log(files)

        cb(null, files.originalname.split(".")[0] + Date.now() + ".jpg");
    }
});


const getUserProfilePhoto = async(fields = "*", id = "") => {

    if (id == "") {
        data = await query(`SELECT ${fields.toString()}  FROM document;`)
        return data;
    } else {
        data = await query(`SELECT ${fields.toString()} FROM document where fk_emp_id=${id}`);
        return data;
    }


}

const getUserBasicinfo = async(id = "") => {

    if (id == "") {

        const data = await query(`SELECT * FROM basic_info `)
        return data;
    } else {

        const data = await query(`SELECT basic_info_id,first_name FROM basic_info where fk_emp_id = ${id};`)
        return data;
    }

}


const upload = multer({ storage: storage }).fields([{ name: 'resume', maxCount: 1 },
    { name: 'bank_detail', maxCount: 1 },
    { name: 'pan_card', maxCount: 1 },
    { name: 'aadhar_card', maxCount: 1 },
    { name: 'profile_photo', maxCount: 1 }
]);


const getCitydata = async(req, res) => {
    var stateValue = req.query.stateValue;
    // console.log("state val",stateValue)
    city_query = `select city_master.city_name from city_master inner join state_master on
    city_master.fk_state_id=state_master.state_id where state_master.state_name = "${stateValue}";`
        //console.log(city_query);
    var cityData = await query(city_query);
    res.json(cityData);
    // console.log(cityData)

};
const postEmployeedata = async(req, res) => {


    try {
        // for addv images 
        conn.beginTransaction();
        var path = [];
        upload(req, res, async function(err) {

            if (err instanceof multer.MulterError) {
                console.log(err)
            } else if (err) {
                console.log(err)
            }

            var key = Object.keys(req.files);

            var i = 0;
            for (x of key) {
                path.push(req.files[x][i].path)

            }
        
            let data = req.body

            var document_query = `insert into document (fk_emp_id,resume,bank_detail,pan_card,aadhar_card,profile_photo) values ('${req.session.emp_id}','${path[0]}','${path[1]}','${path[2]}','${path[3]}','${path[4]}');`
            var document_info = await query(document_query);


        let moreEdudata = req.body.moreEdu_data;

        let course = req.body.course


        // for basic info

        var basic_info_query = `insert into basic_info (fk_emp_id,first_name,last_name,birth_date,relationship,blood_group,
            gender,city,state,phone_number) values ('${req.session.emp_id}','${data.fname}','${data.lname}','${data.dob}','${data.relationship}','${data.blood_group}',
            '${data.gender}','${data.city}','${data.state}','${data.phone_number}');`
        var basic_info = await query(basic_info_query);

        // for education
        var education_euery = `insert into education (fk_emp_id,course_name,passing_year,marks,college_school) values 
        ('${req.session.emp_id}','${data.course}','${data.passing_year}','${data.percentage}','${data.college}');`

        if (data.course) {

            var education_info = await query(education_euery);
        };

        // for more edu
        if (moreEdudata) {

            let moreEdudata1 = JSON.parse(moreEdudata);

            // console.log(moreEdudata1.length);
            console.log(moreEdudata1);
            if (moreEdudata1) {

                for (i = 0; i < moreEdudata1.length; i++) {
                    var education_euery = `insert into education (fk_emp_id,course_name,passing_year,marks,college_school) values 
                        ('${req.session.emp_id}','${moreEdudata1[i].course}','${moreEdudata1[i].passing_year}','${moreEdudata1[i].percentage}','${moreEdudata1[i].college}');`
                    var education_info = await query(education_euery);

                }

            }
        }

        // for expreience
        var company_name = req.body.company_name;
        // console.log(company_name);
        if (company_name) {
            var experience_query = `insert into expreience (fk_emp_id,company_name,start_date,end_date,designation) values ('${req.session.emp_id}','${data.company_name}','${data.start_date}','${data.end_date}','${data.designation}');`

                var experience_info = await query(experience_query)
            };
            var experience_info = await query(experience_query)
            conn.commit()
            res.redirect('../dashbord');
        })

        }
    catch (err) {
        res.send(toString(" postEmployeedata", err));
        conn.rollback()
    }
}

//Get EmployeeBasic Data From DataBase
const getEmployeeBasicInfo = async(req, res) => {
    basic = `select basic_info_id,first_name,last_name,birth_date,relationship,blood_group,gender,city,state from basic_info;`
    var basic_details = await query(basic);
    console.log(basic_details)
    res.render("employee-basic-info.ejs", { basic_details })
}


//Get Particular employee data from  ID
const getEmployeeEdit = async (req,res)=>{
  let id = req.query.id;
//   console.log(id)

//   console.log(req.session.emp_id)

        state_query = `select state_name from state_master;`
        let stateName = await query(state_query);
        userProfilePhoto = await query(`select profile_photo from document where fk_emp_id = ${req.session.emp_id}`)
        //basicInfo
        basic_info = await query(`select * from basic_info where fk_emp_id = ${req.session.emp_id}`)
        // console.log("basic_info",basic_info)
        let stateId = basic_info[0].state;
        // console.log("st" , stateId)

        //stateValue
        state_data = await query(`select * from state_master where state_name = '${stateId}'`)
        // console.log(state_data[0].state_name)
        // console.log(basic_info[0].relationship)

        //courseData
        education = await query(`select * from education where fk_emp_id = ${req.session.emp_id}`)
    // console.log("hfghdfghfghfghfgh");
    // console.log(education)

    //workExperince
    work = await query(`select * from expreience where fk_emp_id = ${req.session.emp_id}`)
    // console.log(work)

    const userInfo = await getUserBasicinfo(req.session.emp_id);
    const profilePhoto = await getUserProfilePhoto(["profile_photo"], req.session.emp_id);

    res.render("employee-edit-data.ejs", { stateName, basic_info, stateid: state_data[0].state_name, work, education, "first_name": userInfo[0].first_name, "profilePhoto": profilePhoto[0].profile_photo })
}

//Edit EmployeeData 
const postEmployeeEdit = async(req, res) => {
    let data = req.body;
    console.log("reletionship", req.body.relationship)
    // console.log(data)
    let state = req.body.state;
    let city = req.body.city;
    // console.log("state", state)
    // console.log("city", city)
    let id = data.id;
    // console.log("ID = " + id);

    //update basic_info
    let basicSql = `update basic_info set first_name ="${data.first_name}", last_name = "${data.last_name}",gender = "${data.gender}",birth_date = "${data.birth_date}",relationship = "${data.relationship}",blood_group="${data.blood_group}",city="${data.city}",state="${data.state}" where basic_info_id = ${id}`;
    let basicsql1 = await query(basicSql)

    
    //update education
    const edu_id = req.body.edu_id;
    const course_name = req.body.course_name;
    const passing_year = req.body.passing_year;
    const marks = req.body.marks;
    const college_school = req.body.college_school;

    console.log(typeof(course_name) , course_name ,req.body.new_passing_year)
    console.log(typeof(edu_id), edu_id)

    if (typeof(course_name) == "string") {
        let expSql = `update education set course_name='${course_name}',passing_year='${passing_year}',marks='${marks}',college_school='${college_school}' where education_id=${edu_id}`;
        let expSql1 = await query(expSql)
        // console.log("expsql1", expSql1)

    } else if(typeof(course_name) == "object") {
        for (var i = 0; i < course_name.length; i++) {
            let expSql = `update education set course_name='${course_name[i]}',passing_year='${passing_year[i]}',marks='${marks[i]}',college_school='${college_school[i]}' where education_id=${edu_id[i]}`;
            let expSql1 = await query(expSql)
        }
    }

    if(req.body.new_course_name){
        if (typeof(req.body.new_course_name) == "string") {
            console.log("if", typeof(req.body.new_course_name))
            let expSql =  `insert into education (fk_emp_id,course_name, passing_year, marks, college_school) values('${req.session.emp_id}','${req.body.new_course_name}','${req.body.new_passing_year}','${req.body.new_marks}','${req.body.new_college_school}')`
            let expSql1 = await query(expSql)
    
        } else if(typeof(req.body.new_course_name) == "object") {
            console.log("else", typeof(req.body.new_course_name))
            for (var i = 0; i < req.body.new_course_name.length; i++) {

                let expSql =  `insert into education (fk_emp_id,course_name, passing_year, marks, college_school) values('${req.session.emp_id}','${req.body.new_course_name[i]}','${req.body.new_passing_year[i]}','${req.body.new_marks[i]}','${req.body.new_college_school[i]}')`
                let expSql1 = await query(expSql)
            }
        }
    }



    //update work experince
    let c_name = req.body.company_name;
    let desig = req.body.designation;
    let start = req.body.start_date;
    let end = req.body.end_date;
    // console.log(c_name);
    // console.log(desig);
    // console.log(start);
    // console.log(end);
    if (typeof(c_name, desig, start, end) == "string") {
        let expSql = `update expreience set company_name='${c_name}',designation='${desig}',start_date='${start}',end_date='${end}' where expreience_id=${id}`;
        let expSql1 = await query(expSql)
        // console.log("expsql1", expSql1)

    } else {
        for (i = 0; i < c_name.length; i++) {
            let expSql = `update expreience set company_name='${c_name}',designation='${desig}',start_date='${start}',end_date='${end}' where expreience_id=${id}`;
            let expSql1 = await query(expSql)
            // console.log("expsql1", expSql1)
        }
    }
    res.redirect('/dashbord')
}

module.exports = { getEmployeedata, postEmployeedata, getCitydata, getEmployeeBasicInfo, getEmployeeEdit, postEmployeeEdit };