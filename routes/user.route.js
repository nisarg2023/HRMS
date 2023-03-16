const express = require('express');
const router=express.Router();

const loginController=require('../controllers/login.controller');
const registrationController = require('../controllers/registration.controller')
const {auth} = require('../middleware/auth')


router.get('/get-login',loginController.getLogin);
router.post('/post-login',loginController.postLogin);
router.get('/get-registration',auth,registrationController.getRegistration);


module.exports=router;