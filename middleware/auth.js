const auth = (req,res,next)=>{
   
    
    if(req.cookies.sessionid && req.session.emp_id)
    {

        next()
    }
    else{
        res.redirect("/get-login")
    }

}

module.exports = {auth}