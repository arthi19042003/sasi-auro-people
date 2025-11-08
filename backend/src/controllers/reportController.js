const db = require('../db');
const { createObjectCsvStringifier } = require('csv-writer');

const exportTimesheetCSV = async (req, res, next) => {
  try {
    const { start, end } = req.query;
    if (!start || !end) return res.status(400).json({ message: 'start and end dates required (YYYY-MM-DD)' });
    const rows = await db('time_entries').whereBetween('date', [start, end]).orderBy('employee_id');

    const csvStringifier = createObjectCsvStringifier({
      header: [
        { id: 'id', title: 'ID' },
        { id: 'employee_id', title: 'EmployeeID' },
        { id: 'date', title: 'Date' },
        { id: 'start_time', title: 'Start' },
        { id: 'end_time', title: 'End' },
        { id: 'hours_worked', title: 'Hours' },
        { id: 'project_id', title: 'Project' },
        { id: 'status', title: 'Status' }
      ]
    });

    const header = csvStringifier.getHeaderString();
    const body = csvStringifier.stringifyRecords(rows);
    const csv = header + body;

    res.header('Content-Type', 'text/csv');
    res.attachment(`timesheet_${start}_${end}.csv`);
    res.send(csv);
  } catch (err) { next(err); }
};

module.exports = { exportTimesheetCSV };
