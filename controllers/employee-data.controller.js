 const multer  = require('multer')


const postEmployeeForm = (req,res)=>{
  
   
 var storage = multer.diskStorage({   
    destination: function(req, file, cb) { 
   
    cb(null, './uploads');    
  }, 
  filename: function (req, file, cb) { 
    
     cb(null , file.originalname+".jpg");
      
  }
});

const upload = multer({ storage: storage }).single("myFile");

upload(req, res, function (err) {console.log(err)})

    
    res.send('employee-data-form');
};


const getEmployeeForm = (req,res)=>{
    res.render('multerDemo');
};

// module.exports = { getEmployeeForm,postEmployeeForm };


const conn = require('../config/dbConnect');
const util = require('util');
const query = util.promisify(conn.query).bind(conn);

const getEmployeedata = async (req, res) => {
    state_query = `select state_name from state_master;`
    var stateName = await query(state_query);
    console.log(stateName.length);
    res.render('employee-data-form', { stateName });

}
const getCitydata = async (req, res) => {
    var stateValue = req.query.stateValue;
    console.log(stateValue)
    city_query = `select city_master.city_name from city_master inner join state_master on
    city_master.fk_state_id=state_master.state_id where state_master.state_name = "${stateValue}";`
    console.log(city_query);
    var cityData = await query(city_query);
    console.log(cityData)
    res.json(cityData);
    

};
const postEmployeedata = async (req, res) => {
    try {
        // For basic Info Data
        let fname = req.body.fname;
        let lname = req.body.lname;
        let dob = req.body.dob;
        let relationship = req.body.relationship;
        let blood_group = req.body.blood_group;
        let gender = req.body.gender;
        let state = req.body.state;
        let city = req.body.city;


        //     For Eduction Data
        let data = req.body
        console.log(data);

        let moreEdudata = req.body.moreEdu_data;
        // console.log(moreEdudata);

        let course = req.body.course


        // for basic info
        // console.log(moreEdudata1);
        var basic_info_query = `insert into basic_info (fk_emp_id,first_name,last_name,birth_date,relationship,blood_group,
            gender,city,state) values (1,'${data.fname}','${data.lname}','${data.dob}','${data.relationship}','${data.blood_group}',
            '${data.gender}','${data.city}','${data.state}');`
        var basic_info = await query(basic_info_query);

        // for education
        var education_euery = `insert into education (fk_emp_id,course_name,passing_year,marks,college_school) values 
        (1,'${data.course}','${data.passing_year}','${data.percentage}','${data.college}');`

        if (data.course) {

            var education_info = await query(education_euery);
        };

        // for more edu
        if (moreEdudata) {

            let moreEdudata1 = JSON.parse(`${moreEdudata}`);
            console.log(moreEdudata1.length);
            console.log(moreEdudata1);
            if (moreEdudata1) {
                if (moreEdudata1.length == 1) {
                    
                    
                    var education_euery = `insert into education (fk_emp_id,course_name,passing_year,marks,college_school) values 
                    (1,'${moreEdudata1.course}','${moreEdudata1.passing_year}','${moreEdudata1.percentage}','${moreEdudata1.college}');`
                    var education_info = await query(education_euery);
                    
                }
                else {
                    for (i = 0; i < moreEdudata1.length; i++) {
                        console.log("skfiksghfishfgisghfgihsiufghsiukfgh");

                        var education_euery = `insert into education (fk_emp_id,course_name,passing_year,marks,college_school) values 
                        (1,'${moreEdudata1[i].course}','${moreEdudata1[i].passing_year}','${moreEdudata1[i].percentage}','${moreEdudata1[i].college}');`
                        var education_info = await query(education_euery);
                    }
                }

            }
        }

        var company_name = req.body.company_name;
        console.log(company_name);
        if (company_name) {
            var experience_query = `insert into expreience (fk_emp_id,company_name,start_date,end_date,designation) values 
        (1,'${data.company_name}','${data.start_date}','${data.end_date}','${data.designation}');`

        console.log(experience_query);

            var experience_info = await query(experience_query)
        };

        var document_query = `insert into document (fk_emp_id,resume,bank_detail,pan_card,aadhar_card) values 
        (1,'${data.resume}','${data.bank_detail}','${data.pan_card}','${data.aadhar_card}');`
        var document_info = await query(document_query)
        res.send("ok")
    }
    catch (err) {
        console.log(" postEmployeedata", err);
    }
}

//Get EmployeeBasic Data From DataBase
const getEmployeeBasicInfo = async (req, res) =>{
    basic = `select basic_info_id,first_name,last_name,birth_date,relationship,blood_group,gender,city,state from basic_info;`
    var basic_details = await query(basic);
    console.log(basic_details)
    res.render("employee-basic-info.ejs",{basic_details})
}


//Get Particular employee data from  ID
const getEmployeeEdit = async (req,res)=>{
  let id = req.query.id;
  console.log(id)

        state_query = `select state_name from state_master;`
        let stateName = await query(state_query);

        //basicInfo
        basic_info = await query(`select * from basic_info where basic_info_id = ${id}`)
        console.log("basic_info",basic_info)
        let stateId = basic_info[0].state;
        console.log("st" , stateId)

        //stateValue
        state_data = await query(`select * from state_master where state_name = '${stateId}'`)
        console.log(state_data[0].state_name)
        console.log(basic_info[0].relationship)

        //courseData
        education = await query(`select * from education where education_id = ${id}`)
    console.log("hfghdfghfghfghfgh");
        console.log(education)

        //workExperince
        work = await query(`select * from expreience where expreience_id = ${id}`)
        console.log(work)


    res.render("employee-edit-data.ejs",{stateName,basic_info,stateid:state_data[0].state_name,work,education})
}

//Edit EmployeeData 
const postEmployeeEdit = async(req,res)=>{
        let data = req.body;
        console.log("reletionship",req.body.relationship)
        console.log(data)
        let state = req.body.state;
        let city = req.body.city;
        console.log("state",state)
        console.log("city",city)
        let id = data.id;
        console.log("ID = " + id);

        //update basic_info
        let basicSql = `update basic_info set first_name ="${data.first_name}", last_name = "${data.last_name}",gender = "${data.gender}",birth_date = "${data.birth_date}",relationship = "${data.relationship}",blood_group="${data.blood_group}",city="${data.city}",state="${data.state}" where basic_info_id = ${id}`;
        let basicsql1 = await query(basicSql)

        //update education
        const course_name = req.body.course_name;
        const passing_year = req.body.passing_year;
        const marks = req.body.marks;
        const college_school = req.body.college_school;
        console.log("course_name"+course_name);
        console.log("college_school"+college_school);
        console.log("passing_year"+passing_year);
        console.log("marks"+marks);

        applicantId = id;

          if (typeof (course_name, passing_year, marks, college_school) == "string") {
            let expSql = `update education set education_id='${applicantId}',course_name='${course_name}',passing_year='${passing_year}',marks='${marks}',college_school='${college_school}' where education_id=${id}`;
            let expSql1 = await query(expSql)
            console.log("expsql1",expSql1)

          } else {
            for (i = 0; i < course_name.length; i++) {
                let expSql = `update education set education_id='${applicantId}',course_name='${course_name}',passing_year='${passing_year}',marks='${marks}',college_school='${college_school}' where education_id=${id}`;
                let expSql1 = await query(expSql)
            console.log("expsql1",expSql1)
            }
          }



        //update work experince
        let c_name = req.body.company_name;
        let desig = req.body.designation;
        let start = req.body.start_date;
        let end = req.body.end_date;
        console.log(c_name);
        console.log(desig);
        console.log(start);
        console.log(end);
        if (typeof (c_name, desig, start, end) == "string") {
            let expSql = `update expreience set company_name='${c_name}',designation='${desig}',start_date='${start}',end_date='${end}' where expreience_id=${id}`;
            let expSql1 = await query(expSql)
            console.log("expsql1",expSql1)

          } else {
            for (i = 0; i < c_name.length; i++) {
            let expSql = `update expreience set company_name='${c_name}',designation='${desig}',start_date='${start}',end_date='${end}' where expreience_id=${id}`;
            let expSql1 = await query(expSql)
            console.log("expsql1",expSql1)
            }
          }
    res.send("done")
}


module.exports = { getEmployeedata, postEmployeedata, getCitydata , getEmployeeForm,postEmployeeForm ,getEmployeeBasicInfo,getEmployeeEdit,postEmployeeEdit};

// {/* <a type="button" class="btn_done">Save</a> */}

//{/* <div class="modal_wrapper">
// {/* <div class="shadow"></div> */}
// /{/* <div class="success_wrap"> */}
    // <span class="modal_icon"><ion-icon name="checkmark-sharp"></ion-icon></span>
    // <p>You have successfully completed the process.</p>
    // <p type="submit"></p>
// </div>
// </div> */}
