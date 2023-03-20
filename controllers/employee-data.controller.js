const conn = require('../config/dbConnect');
const util = require('util');
const query = util.promisify(conn.query).bind(conn);

const multer = require('multer');
const getEmployeedata = async (req, res) => {
    state_query = `select state_name from state_master;`
    var stateName = await query(state_query);
    console.log(stateName.length);
    res.render('employee-data-form', { stateName });

}
var storage = multer.diskStorage({
    destination: function (req, files, cb) {

        cb(null, `./uploads/${files.fieldname}/`);
    },
    filename: function (req, files, cb,) {
        console.log(files)

        cb(null, files.originalname.split(".")[0] + Date.now() + ".jpg");
    }
});



const upload = multer({ storage: storage }).fields([{ name: 'resume', maxCount: 1 },
{ name: 'bank_detail', maxCount: 1 },
{ name: 'pan_card', maxCount: 1 },
{ name: 'aadhar_card', maxCount: 1 },
{ name: 'profile_photo', maxCount: 1 }]);


const getCitydata = async (req, res) => {
    var stateValue = req.query.stateValue;
    city_query = `select city_master.city_name from city_master inner join state_master on
    city_master.fk_state_id=state_master.state_id where state_master.state_name = "${stateValue}";`
    console.log(city_query);
    var cityData = await query(city_query);
    res.json(cityData);
    console.log(cityData)

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

            var experience_info = await query(experience_query)
        };

        // for addv images 
        var path = []
        upload(req, res, function (err) {

            if (err instanceof multer.MulterError) {
                console.log(err)
            } else if (err) {
                console.log(err)
            }
            console.log(req.files)
            var key = Object.keys(req.files)

            var i = 0;
            for (x of key) {
                path.push(req.files[x][i].path)

            }
            var document_query = `insert into document (fk_emp_id,resume,bank_detail,pan_card,aadhar_card,profile_photo) values 
        (1,'${path[0]}','${path[1]}','${path[2]}','${path[3]}','${path[4]}');`
            var document_info = query(document_query);
            
            res.redirect('deshbord');
           

        });




    }
    catch (err) {
        console.log(" postEmployeedata", err);
    }


}

module.exports = { getEmployeedata, postEmployeedata, getCitydata };

// {/* <a type="button" class="btn_done">Save</a> */}

//{/* <div class="modal_wrapper">
// {/* <div class="shadow"></div> */}
// /{/* <div class="success_wrap"> */}
    // <span class="modal_icon"><ion-icon name="checkmark-sharp"></ion-icon></span>
    // <p>You have successfully completed the process.</p>
    // <p type="submit"></p>
// </div>
// </div> */}