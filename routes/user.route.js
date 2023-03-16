const express = require('express');
const router=express.Router();

const loginController=require('../controllers/login.controller');

router.get('/login',loginController.getlogin);

router.post('/login',loginController.postlogin);

router.get('/register',loginController.getregister);

router.post('/register',loginController.postregister);




module.exports=router;