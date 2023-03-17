const express = require('express');
const router=express.Router();

const loginController=require('../controllers/login.controller');
const registrationController = require('../controllers/registration.controller')
const activationController=require('../controllers/activation.controller');
const employeeController=require('../controllers/employee-data.controller');
const {auth} = require('../middleware/auth')


router.get('/get-login',loginController.getLogin);
router.post('/post-login',loginController.postLogin);
router.get('/get-registration',auth,registrationController.getRegistration);

router.get('/activation',activationController.activation);
router.get('/activate',activationController.activate);


router.get('/employee-data',employeeController);


module.exports=router;