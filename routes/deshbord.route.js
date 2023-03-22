const express = require('express');
const router=express.Router();
const deshbord = require('../controllers/dashboard.controller');
const leaveApplication = require('../controllers/leave-application.controller')
const leaveApprove = require('../controllers/leave-approve.controller')

router.get('/',deshbord.getDashboard);
router.get('/get-hotline',deshbord.getHotlines);
router.get('/get-attendance',deshbord.getAttendance);
router.get('/get-comment',deshbord.getComment);
router.get('/allComment',deshbord.getCommentData);
router.get('/comment-id',deshbord.getCommentId);

router.get('/leave',leaveApplication.getLeaveapplication)
router.post('/leave',leaveApplication.postLeaveapplication)

router.get('/approveleave',leaveApprove.getApproveLeave)
router.get('/post-approveleave',leaveApprove.postApproveLeave)


module.exports=router;