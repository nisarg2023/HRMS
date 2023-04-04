let form_1 = document.querySelector(".form_1");
let form_2 = document.querySelector(".form_2");
let form_3 = document.querySelector(".form_3");
let form_4 = document.querySelector(".form_4");


let form_1_btns = document.querySelector(".form_1_btns");
let form_2_btns = document.querySelector(".form_2_btns");
let form_3_btns = document.querySelector(".form_3_btns");
let form_4_btns = document.querySelector(".form_4_btns");


let form_1_next_btn = document.querySelector(".form_1_btns .btn_next");
let form_2_back_btn = document.querySelector(".form_2_btns .btn_back");
let form_2_next_btn = document.querySelector(".form_2_btns .btn_next");
let form_3_back_btn = document.querySelector(".form_3_btns .btn_back");
let form_3_next_btn = document.querySelector(".form_3_btns .btn_next");
let form_4_back_btn = document.querySelector(".form_4_btns .btn_back");

let form_2_progessbar = document.querySelector(".form_2_progessbar");
let form_3_progessbar = document.querySelector(".form_3_progessbar");
let form_4_progessbar = document.querySelector(".form_4_progessbar");

const all_education=[];
const form_data={};

let addEducation=document.querySelector(".add-education");

let btn_done = document.querySelector(".btn_done");
let modal_wrapper = document.querySelector(".modal_wrapper");
let shadow = document.querySelector(".shadow");

async function fetch_state() {
    const stateValue = document.getElementById('state').value;
    // console.log(stateValue)
    const ans = await  fetch(`/employee/get-city-data?stateValue=${stateValue}`);
    const data = await ans.json();
    // console.log(data[1].city_name);

    var citycombo = document.getElementById('city');
    citycombo.innerHTML = '';

    for (var i = 0; i < data.length; i++) {
        const option = document.createElement('option');
        option.value = data[i].city_name;
        option.text = data[i].city_name;
        citycombo.appendChild(option);
    }

};

function checkBasicDetails(){
    let fname=document.querySelector("#fname").value;
    let lname=document.querySelector("#lname").value;
    let blood=document.querySelector("#blood_group").value;
    let phone_number=document.querySelector("#phone_number").value;
    let dob=document.querySelector("#dob").value;
    let state=document.querySelector("#state").value;
    let city=document.querySelector("#city").value;
    let showError=document.querySelector("#errorPhonenumber");


    if(fname.trim()=="" || lname.trim()=="" || blood.trim()=="" || dob.trim()=="" || state.trim()=="" || city.trim()=="" ||phone_number.trim=="" ){
        return false;
    }
   
    return true;
}
function checkEducationDetails(){
    let coursName = document.querySelector('#course').value
    let passingYear = document.querySelector('#passing_Year').value
    let percentage = document.querySelector('#percentage').value
    let college = document.querySelector('#college').value

    if(coursName == "" || passingYear.trim()=="" || percentage.trim()=="" || college.trim()==""){
        return false
    }

    return true

}

function checkExperienceDetails(){
    let companyName = document.querySelector('#company_name').value
    let startDate = document.querySelector('#start_date').value
    let endDate = document.querySelector('#end_date').value
    let designation = document.querySelector('#designation').value

    if(companyName.trim()=="" || startDate.trim()=="" || endDate.trim()=="" || designation.trim()==""){
        return false;
    }
    return true
}

function checkDocumentDetails(){
    let resume = document.querySelector('resume').value
    let profilePhoto = document.querySelector('profile_photo').value
    let panCard =  document.querySelector('pan_card').value
    let aadharCard =  document.querySelector('aadhar_card').value
    let bankDetail = document.querySelector('bank_detail').value

    if(resume == "" || profilePhoto=="" || panCard=="" || aadharCard=="" || bankDetail==""){
        return false;
    }
    return true
}




function showErrorNumber(){
    let showError=document.querySelector("#errorPhonenumber");
    let phone_number=document.querySelector("#phone_number").value;
    if(phone_number.length!=10){
        showError.innerText="Phone Number must 10 digits!."
        showError.style.color="red"
    }
    else{
        showError.innerText="";
    }
}

form_1_next_btn.addEventListener("click", function(){
    
    if(!checkBasicDetails()){
        return false;
    }

	form_1.style.display = "none";
	form_2.style.display = "block";

	form_1_btns.style.display = "none";
	form_2_btns.style.display = "flex";

	form_2_progessbar.classList.add("active");
});

form_2_back_btn.addEventListener("click", function(){
	form_1.style.display = "block";
	form_2.style.display = "none";

	form_1_btns.style.display = "flex";
	form_2_btns.style.display = "none";

	form_2_progessbar.classList.remove("active");
});

form_2_next_btn.addEventListener("click", function(){

    if(!checkEducationDetails()){
        return false;
    }

	form_2.style.display = "none";
	form_3.style.display = "block";

	form_3_btns.style.display = "flex";
	form_2_btns.style.display = "none";

	form_3_progessbar.classList.add("active");
});

form_3_back_btn.addEventListener("click", function(){
	form_2.style.display = "block";
	form_3.style.display = "none";

	form_3_btns.style.display = "none";
	form_2_btns.style.display = "flex";

	form_3_progessbar.classList.remove("active");
});

form_3_next_btn.addEventListener("click", function(){

    if(!checkExperienceDetails()){
        return false;
    }

	form_4.style.display = "block";
	form_3.style.display = "none";

	form_3_btns.style.display = "none";
	form_4_btns.style.display = "flex";

	form_4_progessbar.classList.add("active");
});

form_4_back_btn.addEventListener("click", function(){
	
    form_3.style.display = "block";
	form_4.style.display = "none";

	form_4_btns.style.display = "none";
	form_3_btns.style.display = "flex";

	form_4_progessbar.classList.remove("active");
    
});

// btn_done.addEventListener("click", function(){



// 	modal_wrapper.classList.add("active");
// });

// shadow.addEventListener("click", function(){

//     let basic_info={};

//     basic_info.fname=document.querySelector("#fname").value;
//     basic_info.lname=document.querySelector("#lname").value;
//     basic_info.relationship_status=document.querySelector("#relationship").value;
//     basic_info.blood_group=document.querySelector("#blood_group").value;
//     basic_info.dob=document.querySelector("#dob").value;
    
//     let male=document.querySelector("#male").checked;
//     let female=document.querySelector("#female").checked;

//     if(male==true){
//         basic_info.gender="male";
//     }else if(female==true){
//         basic_info.gender="female";
//     }else{
//         basic_info.gender="other";
//     }

//     basic_info.state=document.querySelector("#state").value;
//     basic_info.city=document.querySelector("#city").value;

//     //adding basic information
//     form_data.basic_info=basic_info;
//     form_data.education=all_education;

//     let exp={}

//     exp.company_name=document.querySelector("#company_name").value;
//     exp.start_date=document.querySelector("#start_date").value;    
//     exp.end_date=document.querySelector("#end_date").value;    
//     exp.designation=document.querySelector("#designation").value;    
    
//     //adding experience
//     form_data.experience=exp;

//     console.log(form_data);
    

// 	modal_wrapper.classList.remove("active");
// });

addEducation.addEventListener("click", function(){

    let course=document.querySelector("#course");
    let passing_Year=document.querySelector("#passing_Year");
    let percentage=document.querySelector("#percentage");
    let college=document.querySelector("#college");

    let display_added_education=document.querySelector(".display_added_education");
	const hidden_value=document.getElementById("hidden_edu");

    let edu={};
    let id=all_education.length+1;

    edu.course=course.value;
    edu.passing_Year=passing_Year.value;
    edu.percentage=percentage.value;
    edu.college=college.value;
	// console.log(edu);
	
	
    all_education.push(edu);
	// hidden_value.value=all_education;

    let div=document.createElement("div");
    div.classList.add("added-education");
    div.innerHTML=`<div>${edu.course} : ${edu.passing_Year}</div><a class="delete-btn" data-id='${id}'>delete</a>`;

    display_added_education.appendChild(div);

    let set_delete_btn=document.querySelectorAll(".delete-btn");
    hidden_value.value=JSON.stringify(all_education);
    // below comment does not delete this is for delete functionally

    // const entries = Object.values(hidden_value.value);
    // console.log(entries);
    // console.log(typeof(entries));

    // set_delete_btn.forEach(function(btn){
    //     btn.addEventListener("click", function(){
    //         btn.closest(".added-education").remove();
    //         all_education.splice(Number(btn.getAttribute("data-id"))-1, 1);
	// 		console.log(Number(btn.getAttribute("data-id")));

    //        const arr1= JSON.parse(`${hidden_value.value}`);
    //        const entries = Object.entries(arr1);
          
    //        console.log(typeof(entries));
	// 		hidden_value=entries.spice(Number(btn.getAttribute("data-id")),1);
            
    //     })
    // })
    console.log(hidden_value.value);
	
    
    course.value="";
    passing_Year.value="";
    percentage.value="";
    college.value="";
})

function submitBtn(){
    if(!checkDocumentDetails()){
        return false;
    }
}