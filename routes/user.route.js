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

//router.get('/dashboard', dashboardController )
// router.get('/get-employee-data', auth,employeedataController.getEmployeedata);
// router.post('/post-employee-data', auth, employeedataController.postEmployeedata);
// router.get('/get-city-data', employeedataController.getCitydata);
router.get('/get-allUsersEmail', userEmail.getAllUsersEmail);
router.post('/checkin', checkin.get_checkin);
router.post('/brakein', checkin.get_brakein);
router.post('/brakeout', checkin.get_brakeout);
router.post('/checkout1', checkin.get_checkout);


module.exports = router;