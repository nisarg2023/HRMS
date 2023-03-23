const express = require('express');
const router = express.Router();
const deshbord = require('../controllers/dashboard.controller');
const leaveApplication = require('../controllers/leave-application.controller')
const leaveApprove = require('../controllers/leave-approve.controller')
const employeeLog = require('../controllers/employeeLog.controller')

router.get('/', deshbord.getDashboard);
router.get('/get-hotline', deshbord.getHotlines);
router.get('/get-attendance', deshbord.getAttendance);

router.get('/get-leave', leaveApplication.getLeaveapplication)
router.post('/post-leave', leaveApplication.postLeaveapplication)

router.get('/approveleave', leaveApprove.getApproveLeave)
router.get('/post-approveleave', leaveApprove.postApproveLeave)


router.get('/getBrakeInfo', employeeLog.getBrakeInfo)
router.get('/getCkeckInOutInfo', employeeLog.getCkeckInOutInfo)


module.exports = router;