const auth = (req,res,next)=>{
   
    
    if(req.cookies.sessionid && req.session.email)
    {
        next()
    }
    else{
        res.redirect("/get-login")
    }

}

module.exports = {auth}