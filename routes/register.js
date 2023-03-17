const confirmPassword = () => {

    let password = document.getElementById("Password").value;
    let Cpassword = document.getElementById("Cpassword").value;

    let passvalid = document.getElementById("passvalid");

    if (password == Cpassword) {
        passvalid.innerHTML = "";

    } else {
        passvalid.innerHTML = "password does'nt match";
        document.getElementById("passvalid").style.color = 'red';
    }

}

const passwordError = () => {
    let newPassword = document.getElementById('Password').value;
    let passtype = document.getElementById("passtype");
    let passno = document.getElementById("passno");
    let minNumberofChars = 6;
    let maxNumberofChars = 16;
    let regularExpression = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (newPassword != "") {
        if (newPassword.length < minNumberofChars || newPassword.length > maxNumberofChars) {
            passno.innerHTML = "Password should contain atleast 6 length";
            document.getElementById("passno").style.color = 'red';
        } else {
            passno.innerHTML = "";
        }
        if (!regularExpression.test(newPassword)) {
            passtype.innerHTML = "Password should contain atleast one no&spacial cherecter";
            document.getElementById("passtype").style.color = 'red';
        } else {
            passtype.innerHTML = "";
        }
    } else {
        passtype.innerHTML = "";
        passno.innerHTML = "";
    }
}

// const passwordError = () => {
//     let newPassword = document.getElementById('Password').value;
//     if (!(/[a-z]/.test(newPassword))) {
//         console.log("abc");
//         return false;

//     }
//     if (!(/[A-Z]/.test(newPassword))) {
//         console.log("ABC");

//         return false;
//     }
//     if (!(/[0-9]/.test(newPassword))) {
//         console.log(09);
//         return false;
//     }
//     if (!(/[!@#$%^&*]/.test(newPassword))) {
//         console.log("SPECIAL;");

//         return false;
//     }
//     if (newPassword.lenght < 6) {
//         return false;
//     }
//     return true;
// }


const emailCorrect = () => {
    let regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

    let email = document.getElementById('email').value;
    let ermail = document.getElementById("erroremail");

    if (email != "") {
        if (!regex.test(email)) {
            ermail.innerHTML = 'Email is invalid';
            ermail.style.color = 'red';
            return false;
        } else {
            ermail.innerHTML = '';
        }
    } else {
        ermail.innerHTML = '';
    }
}