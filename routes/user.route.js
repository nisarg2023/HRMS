const express = require('express');
const router=express.Router();

const loginController=require('../controllers/login.controller');
const activationController=require('../controllers/activation.controller');

router.get('/',loginController);
router.get('/activation',activationController.activation);
router.get('/activate',activationController.activate);


module.exports=router;