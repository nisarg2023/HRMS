
const express = require('express');
const router=express.Router();
//const employDataConroller = require('../controllers/employee-data.controller')
const employeedataController=require('../controllers/employee-data.controller')


//router.get('/get-employee-form',employDataConroller.getEmployeeForm);
//router.post('/post-employee-form',employDataConroller.postEmployeeForm);

router.get('/get-employee-data',employeedataController.getEmployeedata);
router.post('/post-employee-data',employeedataController.postEmployeedata);
router.get('/get-city-data',employeedataController.getCitydata);

module.exports=router;