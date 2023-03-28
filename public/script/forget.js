let submit_btn = document.getElementById("submit_btn");
let data;
var code_otp;
let codem = document.getElementById("getcodem").value;


const getCode = async () => {
    let email = document.getElementById("email1").value;

    let res = await fetch("/getcode", {
        method: "post",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({

            "email": email,

        })

    })

    data = await res.json();


}

const verifyOtp = async () => {
    let user_email = document.getElementById('email1')
    let otp = document.getElementById('getcodem').value
    let resetPassword = document.getElementById('reset-password')
    let beforeVerify = document.getElementById('before-verify')
    let wrongOtp = document.getElementById('wrong-otp')
    await fetch(`/verifyOtp?userEmail=${user_email.value}&otp=${otp}`)
    .then(res=>res.json())
    .then((data) => {
        if(data.isVerified === true) {
            resetPassword.style.display = 'block'
            beforeVerify.style.display = 'none'
            user_email.readOnly = true
        }
        else if(data.isVerified === false){
            wrongOtp.innerText = "Wrong OTP"
            wrongOtp.style.color = "red"
        }
    })
}


const confirmPassword = () => {

    let password = document.getElementById("Password").value;
    let Cpassword = document.getElementById("Cpassword").value;

    let passvalid = document.getElementById("passvalid");

    if (password == Cpassword) {
        passvalid.innerHTML = "";
        changBtnStatus()


    } else {
        passvalid.innerHTML = "password does'nt match";
        document.getElementById("passvalid").style.color = 'red';

    }

};


const changBtnStatus = () => {
    let passvalid = document.getElementById("passvalid").innerHTML;
    let passwordErr = document.getElementById("passwordErr").innerHTML;


    if (passvalid == "" && passwordErr == "") {
        submit_btn.disabled = false;
        submit_btn.style = "opacity: 1"
    }
    else {
        submit_btn.disabled = true;
        submit_btn.style = "opacity: 0.5"
    }
};




const emailCorrect2 = () => {

    let regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

    let email = document.getElementById('email').value;
    let emailErr = document.getElementById("emailErr");


    fetch('/all-email')
        .then(res => res.json())
        .then((emails) => {
            if (!emails.includes(email)) {
                emailErr.innerHTML = 'user not register';
                emailErr.style.color = 'red';
                submit_btn.disabled = true;
                submit_btn.style = "opacity: 0.5"
                return false;
            } else {
                emailErr.innerHTML = '';
                submit_btn.disabled = false;
                submit_btn.style = "opacity: 1"
            }

        })
};

const emailCorrect3 = () => {

    let regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

    let email = document.getElementById('email1').value;
    let submit_btn = document.getElementById('sub_id');
    let emailErr = document.getElementById("emailErr");
}
const passwordError = () => {

    let newPassword = document.getElementById('Password').value;
    let passwordErr = document.getElementById("passwordErr");
    let passvalid = document.getElementById("passvalid");
    let minNumberofChars = 6;
    let maxNumberofChars = 16;
    let regularExpression = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if (newPassword.length < minNumberofChars || newPassword.length > maxNumberofChars) {
        passvalid.innerHTML = "Password should contain atleast 6 length";
        document.getElementById("passvalid").style.color = 'red';
    } else {
        passvalid.innerHTML = "";
    }
    if (!regularExpression.test(newPassword)) {
        passwordErr.innerHTML = "Password should contain atleast one no&spacial cherecter";
        document.getElementById("passwordErr").style.color = 'red';
    } else {
        passwordErr.innerHTML = "";
    }

}

function removeText(){
    console.log("Hello Hw are you!...");
    var eoorrText=document.getElementById("showError").innerText="";
}
const togglePassword = document.querySelector("#togglePassword");
togglePassword.addEventListener("mouseover", function () {
    const x = document.getElementById("Password")
    if (x.type === "password") {
        x.type = "text";
        togglePassword.classList="fa-sharp fa-solid fa-eye-slash"
        
    } else {
        x.type = "password";
    }
});
togglePassword.addEventListener("mouseout", function () {
    const x = document.getElementById("Password")
    if (x.type === "text") {
        x.type = "password";
        togglePassword.classList="fa-solid fa-eye"
    } else {
        x.type = "text";
    }
});


    
