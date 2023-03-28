const express = require('express');
const router = express.Router();
const dashboard = require('../controllers/dashboard.controller');
const leaveApplication = require('../controllers/leave-application.controller')

const employeeLog = require('../controllers/employeeLog.controller')

const attendanceSummary = require('../controllers/attendance.summary.controller')
const sensation =require('../controllers/sensation.controller')

router.get('/', dashboard.getDashboard);
router.get('/get-hotline', dashboard.getHotlines);
// router.get('/get-attendance', dashboard.getAttendance);
router.get('/get-attendance', attendanceSummary.attendancy_summary);

router.get('/get-leave', leaveApplication.getLeaveapplication)
router.post('/post-leave', leaveApplication.postLeaveapplication)


router.get('/get-comment', dashboard.getComment);
router.get('/updateCommentCard', dashboard.updateCommentCard);




router.get('/getBrakeInfo', employeeLog.getBrakeInfo)
router.get('/getCkeckInOutInfo', employeeLog.getCkeckInOutInfo)
router.get('/viewProfile',dashboard.getDataProfile)

router.get('/allEmployeesLog',employeeLog.getAllEmployeesLog);
router.get('/onlineEmployeeData',dashboard.getOnlineEmployeeLogs);
router.get('/breakEmployeeData',dashboard.getBreakEmployeeLogs);
router.get('/offlineEmployeeData',dashboard.getOfflineEmployeeLogs);
router.get('/leaveEmployeeData',dashboard.getLeaveEmployeeData);

// router for sensation
router.get('/get-sensation',sensation.getSensation); 
router.post('/post-sensation',sensation.postSensation); 


module.exports = router;