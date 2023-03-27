let submit_btn  = document.getElementById("submit_btn");
submit_btn.disabled=true;
submit_btn.style="opacity: 0.5"


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
}



const emailCorrect = () => {
    
    let regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

    let email = document.getElementById('email').value;
    let emailErr = document.getElementById("emailErr");

    fetch('http://localhost:8000/get-allUsersEmail')
    .then(res=>res.json())
    .then((emails) => {
        if(emails.includes(email))
        {
            emailErr.innerHTML = 'user already exists';    
        }
        else{
            emailErr.innerHTML = '';    
        }

    })

    if (email == "" || !regex.test(email)) {
        
        emailErr.innerHTML = 'Email is invalid';
        emailErr.style.color = 'red';
            submit_btn.disabled=true;
            submit_btn.style="opacity: 0.5"
            return false;
        
    } else {
        emailErr.innerHTML = '';
        changBtnStatus()
       
    }
}

const changBtnStatus = () => {
    let passvalid = document.getElementById("passvalid").innerHTML;
    let passwordErr = document.getElementById("passwordErr").innerHTML;
    let emailErr = document.getElementById("emailErr").innerHTML;
   
    if(passvalid=="" && passwordErr=="" &&emailErr=="")
    {
        submit_btn.disabled=false;
        submit_btn.style="opacity: 1"
    }
    else{
        submit_btn.disabled=true;
        submit_btn.style="opacity: 0.5"
    }
}
  
