const auth = (req,res,next)=>{
   
    
    if(req.cookies.sessionid && req.session.emp_id)
    {

        next()
    }
    else{
       //next()
       res.redirect("/get-login")
    }

}

module.exports = {auth}