const express = require('express');
const router=express.Router();

const loginController=require('../controllers/login.controller');
const transitonController=require('../controllers/transaction.controller');

// router.get('/',transitonController.transaction);
router.get('/',loginController);



module.exports=router;