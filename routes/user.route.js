const express = require('express');
const router=express.Router();

const loginController=require('../controllers/login.controller');
const employeeController=require('../controllers/employee-data.controller');

router.get('/',loginController);

router.get('/employee-data',employeeController);


module.exports=router;