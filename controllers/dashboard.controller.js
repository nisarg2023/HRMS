const getDashboard = (req,res)=>{
    res.render('dashboard')
    //res.send("hello");

}

const getHotlines = (req,res)=>{
    res.render('hotline');
}

module.exports = {getDashboard,getHotlines}