const db = require('../db');

const create = (data) => db('attendance').insert(data).returning('*');
const findByEmployeeDate = (employee_id, date) => db('attendance').where({ employee_id, date }).first();
const findByEmployee = (employee_id) => db('attendance').where({ employee_id }).orderBy('date', 'desc');

module.exports = { create, findByEmployeeDate, findByEmployee };
