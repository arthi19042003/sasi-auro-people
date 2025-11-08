const db = require('../db');

const create = (data) => db('time_entries').insert(data).returning('*');
const findByEmployee = (employee_id) => db('time_entries').where({ employee_id }).orderBy('date', 'desc');
const findById = (id) => db('time_entries').where({ id }).first();
const updateById = (id, changes) => db('time_entries').where({ id }).update(changes).returning('*');

module.exports = { create, findByEmployee, findById, updateById };
