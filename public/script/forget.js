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

const confirmPassword = () => {

    let password = document.getElementById("Password").value;
    let Cpassword = document.getElementById("Cpassword").value;

    let passvalid = document.getElementById("passvalid");

    if (password == Cpassword) {
        passvalid.innerHTML = "";
        changBtnStatus();


    } else {
        passvalid.innerHTML = "password does'nt match";
        document.getElementById("passvalid").style.color = 'red';

    }

};

const passwordError = () => {
    let newPassword = document.getElementById('Password').value;
    let passwordErr = document.getElementById("passwordErr");

    let minNumberofChars = 6;
    let maxNumberofChars = 16;
    let regularExpression = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (newPassword == "" || !regularExpression.test(newPassword)) {

        passwordErr.innerHTML = "Password should contain atleast 6 length";
        passwordErr.style.color = 'red';

    } else {
        passwordErr.innerHTML = "";
        changBtnStatus()


    }
};

const changBtnStatus = () => {
    let passvalid = document.getElementById("passvalid").innerHTML;
    let passwordErr = document.getElementById("passwordErr").innerHTML;


    if (passvalid == "" && passwordErr == "") {
        submit_btn.disabled = false;
        submit_btn.style = "opacity: 1"
    } else {
        submit_btn.disabled = true;
        submit_btn.style = "opacity: 0.5"
    }
};




const emailCorrect2 = () => {

    let regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

    let email = document.getElementById('email').value;
    let emailErr = document.getElementById("emailErr");


    fetch('http://localhost:8000/all-email')
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


    fetch('http://localhost:8000/all-email')
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
}