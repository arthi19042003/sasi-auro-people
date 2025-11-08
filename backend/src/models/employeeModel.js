const db = require('../db');

const create = (data) => db('employees').insert(data).returning('*');
const findAll = () => db('employees').select('*');
const findById = (id) => db('employees').where({ id }).first();
const findByUserId = (user_id) => db('employees').where({ user_id }).first();
const updateById = (id, changes) => db('employees').where({ id }).update(changes).returning('*');
const remove = (id) => db('employees').where({ id }).del();

module.exports = { create, findAll, findById, findByUserId, updateById, remove };
