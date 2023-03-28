const openMenu= () =>{
    let profile = document.getElementById('user-profile-edit')
    // console.log(profile.style.display)
    if(profile.style.display =="block"){
        // console.log("if")
        profile.style.display = "none"
    }
    else{
        // console.log("else")
    profile.style.display ="block"
    }

}
