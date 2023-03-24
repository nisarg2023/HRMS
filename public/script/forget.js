let submit_btn = document.getElementById("submit_btn");
submit_btn.disabled = true;
submit_btn.style = "opacity: 0.5"


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

}

// const passwordError = () => {
//     let newPassword = document.getElementById('Password').value;
//     let passwordErr = document.getElementById("passwordErr");

//     let minNumberofChars = 6;
//     let maxNumberofChars = 16;
//     let regularExpression = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
//     if (newPassword == "" || !regularExpression.test(newPassword)) {

//         passwordErr.innerHTML = "Password should contain atleast 6 length";
//         passwordErr.style.color = 'red';

//     } else {
//         passwordErr.innerHTML = "";
//         changBtnStatus()


//     }
// }

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
}

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
            }
            else {
                emailErr.innerHTML = '';
                submit_btn.disabled = false;
                submit_btn.style = "opacity: 1"
            }

        })
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


