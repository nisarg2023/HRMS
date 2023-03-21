const express = require('express');
const router=express.Router();

const loginController=require('../controllers/login.controller');
const registrationController = require('../controllers/registration.controller')
const activationController=require('../controllers/activation.controller');
const employeeController=require('../controllers/employee-data.controller');
const userEmail = require('../controllers/get-all-user-email.controller');
//const dashboardController=require('../controllers/dashboard.controller');
// const employeeController=require('../controllers/employee-data.controller');
const employeedataController=require('../controllers/employee-data.controller')
const {auth} = require('../middleware/auth')


router.get('/get-login',loginController.getLogin);
router.post('/post-login',loginController.postLogin);
router.get('/get-registration',registrationController.getRegistration);
router.post('/post-registration',registrationController.postRegistration);

router.get('/get-activate',activationController.getActivate);
router.post('/post-activate',activationController.postActivate);

//router.get('/employee-data',employeeController);


router.get('/get-allUsersEmail',userEmail.getAllUsersEmail);

//router.get('/dashboard', dashboardController )
router.get('/get-employee-data',employeedataController.getEmployeedata);
router.post('/post-employee-data',employeedataController.postEmployeedata);
router.get('/get-city-data',employeedataController.getCitydata);

router.get('/get-employee-basicinfo',employeedataController.getEmployeeBasicInfo);
router.get('/get-employee-edit',employeedataController.getEmployeeEdit);
router.post('/post-employee-edit',employeedataController.postEmployeeEdit);







module.exports=router;