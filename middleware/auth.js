const auth = (req,res,next)=>{
   
    
    if(req.cookies.sessionid && req.session.emp_id)
    {
        console.log("auth : ",req.session)
        next()
    }
    else{
        res.redirect("/get-login")
    }

}

module.exports = {auth}