const router = require('express').Router();
const auth = require('../middleware/auth');
const { exportTimesheetCSV } = require('../controllers/reportController');

router.use(auth);

// GET /api/reports/timesheet?start=2025-01-01&end=2025-01-31
router.get('/timesheet', exportTimesheetCSV);

module.exports = router;
