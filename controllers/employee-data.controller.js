const conn = require('../config/dbConnect');
const util =  require('util');
const query =  util.promisify(conn.query).bind(conn);

const getEmployeedata=(req,res)=>{
    res.render('employee-data-form');
}
const postEmployeedata= async (req,res)=>{
    try{
        // For basic Info Data
        let fname=req.body.fname;
        let lname=req.body.lname;
        let dob=req.body.dob;
        let relationship=req.body.relationship;
        let blood_group=req.body.blood_group;
        let gender=req.body.gender;
        let state=req.body.state;
        let city=req.body.city;
        // console.log(req.body.fname)
        // console.log(fname);
        // console.log(lname);
        // console.log(dob);
        // console.log(relationship);
        // console.log(blood_group);
        // console.log(gender);
        // console.log(state);
        // console.log(city);

        //     For Eduction Data
        let data= req.body
        let hidden_value=req.body.hidden_value;
        let course = req.body.course
        // let hidden_value= req.body.hidden_value
        console.log(data);
        var basic_info_query=`insert into basic_info (fk_emp_id,first_name,last_name,birth_date,relationship,blood_group,
            gender,city,state) values (1,'${data.fname}','${data.lname}','${data.dob}','${data.relationship}','${data.blood_group}',
            '${data.gender}','${data.city}','${data.state}');`

        var education_euery=`insert into education (fk_emp_id,course_name,passing_year,marks,college_school) values 
        (1,'${course}','${data.passing_year}','${data.percentage}','${data.college}');`    
        // var basic_info = await query(basic_info_query);
        if(data.course){

            var education_info = await query(education_euery);
        };
        console.log(hidden_value.course)
        
        var experience_query=`insert into expreience (fk_emp_id,company_name,start_date,end_date,designation) values 
        (1,'${data.company_name}','${data.start_date}','${data.end_date}','${data.designation}');`
        if(data.company_name){

            var experience_info= await query(experience_query)
        };

        var document_query = `insert into document (fk_emp_id,resume,bank_detail,pan_card,aadhar_card) values 
        (1,'${data.resume}','${data.bank_detail}','${data.pan_card}','${data.aadhar_card}');`
        var document_info= await query(document_query)
    }
    catch (err){
        console.log(" postEmployeedata" ,err);
    }
}

module.exports={getEmployeedata,postEmployeedata};

// {/* <a type="button" class="btn_done">Save</a> */}

//{/* <div class="modal_wrapper">
// {/* <div class="shadow"></div> */}
// /{/* <div class="success_wrap"> */}
    // <span class="modal_icon"><ion-icon name="checkmark-sharp"></ion-icon></span>
    // <p>You have successfully completed the process.</p>
    // <p type="submit"></p>
// </div>
// </div> */}