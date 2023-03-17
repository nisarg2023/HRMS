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


function checkBasicDetails(){
    let fname=document.querySelector("#fname").value;
    let lname=document.querySelector("#lname").value;
    let blood=document.querySelector("#blood_group").value;
    let dob=document.querySelector("#dob").value;
    let state=document.querySelector("#state").value;
    let city=document.querySelector("#city").value;

    if(fname.trim()=="" || lname.trim()=="" || blood.trim()=="" || dob.trim()=="" || state.trim()=="" || city.trim()=="" ){
        return false;
    }
    return true;
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

btn_done.addEventListener("click", function(){



	modal_wrapper.classList.add("active");
});

shadow.addEventListener("click", function(){

    let basic_info={};

    basic_info.fname=document.querySelector("#fname").value;
    basic_info.lname=document.querySelector("#lname").value;
    basic_info.relationship_status=document.querySelector("#relationship").value;
    basic_info.blood_group=document.querySelector("#blood_group").value;
    basic_info.dob=document.querySelector("#dob").value;
    
    let male=document.querySelector("#male").checked;
    let female=document.querySelector("#female").checked;

    if(male==true){
        basic_info.gender="male";
    }else if(female==true){
        basic_info.gender="female";
    }else{
        basic_info.gender="other";
    }

    basic_info.state=document.querySelector("#state").value;
    basic_info.city=document.querySelector("#city").value;

    //adding basic information
    form_data.basic_info=basic_info;
    form_data.education=all_education;

    let exp={}

    exp.company_name=document.querySelector("#company_name").value;
    exp.start_date=document.querySelector("#start_date").value;    
    exp.end_date=document.querySelector("#end_date").value;    
    exp.designation=document.querySelector("#designation").value;    
    
    //adding experience
    form_data.experience=exp;

    console.log(form_data);
    

	modal_wrapper.classList.remove("active");
});

addEducation.addEventListener("click", function(){

    let course=document.querySelector("#course");
    let passing_Year=document.querySelector("#passing_Year");
    let percentage=document.querySelector("#percentage");
    let college=document.querySelector("#college");

    let display_added_education=document.querySelector(".display_added_education");

    let edu={};
    let id=all_education.length+1;

    edu.course=course.value;
    edu.passing_Year=passing_Year.value;
    edu.percentage=percentage.value;
    edu.college=college.value;

    all_education.push(edu);

    let div=document.createElement("div");
    div.classList.add("added-education");
    div.innerHTML=`<div>${edu.course} : ${edu.passing_Year}</div><a class="delete-btn" data-id='${id}'>delete</a>`;

    display_added_education.appendChild(div);

    let set_delete_btn=document.querySelectorAll(".delete-btn");

    set_delete_btn.forEach(function(btn){
        btn.addEventListener("click", function(){
            btn.closest(".added-education").remove();
            all_education.splice(Number(btn.getAttribute("data-id"))-1, 1);
            
        })
    })
    
    course.value="";
    passing_Year.value="";
    percentage.value="";
    college.value="";
})