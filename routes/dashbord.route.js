const express = require('express');
const router = express.Router();
const dashboard = require('../controllers/dashboard.controller');
const leaveApplication = require('../controllers/leave-application.controller')

const employeeLog = require('../controllers/employeeLog.controller')

const attendanceSummary = require('../controllers/attendance.summary.controller')

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



module.exports = router;