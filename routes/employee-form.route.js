
const express = require('express');
const router=express.Router();
const employeedataController=require('../controllers/employee-data.controller')
const {auth} = require('../middleware/auth');



router.get('/get-employee-data',auth,employeedataController.getEmployeedata);
router.post('/post-employee-data',auth,employeedataController.postEmployeedata);
router.get('/get-city-data',employeedataController.getCitydata);

module.exports=router;