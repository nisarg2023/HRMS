 const multer  = require('multer')


const postEmployeeForm = (req,res)=>{
  
   
 var storage = multer.diskStorage({   
    destination: function(req, file, cb) { 
   
    cb(null, './uploads');    
  }, 
  filename: function (req, file, cb) { 
    
     cb(null , file.originalname+".jpg");
      
  }
});

const upload = multer({ storage: storage }).single("myFile");

upload(req, res, function (err) {console.log(err)})

    
    res.send('employee-data-form');
};


const getEmployeeForm = (req,res)=>{
    res.render('multerDemo');
};

module.exports = { getEmployeeForm,postEmployeeForm };


