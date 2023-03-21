
const express = require('express');
const router=express.Router();
const employDataConroller = require('../controllers/employee-data.controller')


router.get('/get-employee-form',employDataConroller.getEmployeeForm);
router.post('/post-employee-form',employDataConroller.postEmployeeForm);

module.exports=router;