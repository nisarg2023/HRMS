


const getLogin=(req,res)=>{
    res.send('get login');
}

const postLogin=(req,res)=>{

    req.session.email = req.body.email;
    
    req.session.save();
    res.send(req.session);
}
module.exports={postLogin,getLogin};