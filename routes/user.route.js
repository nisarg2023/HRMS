const express = require('express');
const router=express.Router();

const loginController=require('../controllers/login.controller');
const registrationController = require('../controllers/registration.controller')
const activationController=require('../controllers/activation.controller');
const employeeController=require('../controllers/employee-data.controller');
const {auth} = require('../middleware/auth')


router.get('/get-login',loginController.getLogin);
router.post('/post-login',loginController.postLogin);
router.get('/get-registration',registrationController.getRegistration);
router.post('/post-registration',registrationController.postRegistration);

router.get('/get-activate',activationController.getActivate);
router.post('/post-activate',activationController.postActivate);

//router.get('/employee-data',employeeController);


//router.get('get-allUsersEmail')




module.exports=router;