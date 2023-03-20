const express = require('express');
const router=express.Router();
const deshbord = require('../controllers/dashboard.controller');

router.get('/',deshbord.getDashboard);
router.get('/get-hotline',deshbord.getHotlines);

module.exports=router;