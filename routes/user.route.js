const express = require('express');
const router = express.Router();

const loginController = require('../controllers/login.controller');
const registrationController = require('../controllers/registration.controller')
const activationController=require('../controllers/activation.controller');


const employeeController = require('../controllers/employee-data.controller');
const userEmail = require('../controllers/get-all-user-email.controller');
const checkin = require("../controllers/checkin.controler");
const employeedataController = require('../controllers/employee-data.controller')
const { auth } = require('../middleware/auth')


router.get('/', loginController.redirectLogin);
router.get('/get-login', loginController.getLogin);
router.post('/post-login', loginController.postLogin);
router.get('/get-registration', registrationController.getRegistration);
router.post('/post-registration', registrationController.postRegistration);
router.get('/get-activate', activationController.getActivate);
router.post('/post-activate', activationController.postActivate);
router.get('/get-logout', loginController.getLogout);
//router.get('/employee-data',employeeController);


router.get('/get-allUsersEmail', userEmail.getAllUsersEmail);

router.get('/get-allUsersEmail', userEmail.getAllUsersEmail);
router.post('/checkin', checkin.get_checkin);
router.post('/brakein', checkin.get_brakein);
router.post('/brakeout', checkin.get_brakeout);
router.post('/checkout', checkin.get_checkout);

router.get('/get-employee-basicinfo',employeedataController.getEmployeeBasicInfo);
router.get('/get-employee-edit',employeedataController.getEmployeeEdit);
router.post('/post-employee-edit',employeedataController.postEmployeeEdit);




module.exports=router;  

