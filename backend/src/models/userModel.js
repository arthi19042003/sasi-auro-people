const db = require('../db');

const create = (data) => db('users').insert(data).returning('*');
const findByEmail = (email) => db('users').where({ email }).first();
const findById = (id) => db('users').where({ id }).first();
const updateById = (id, changes) => db('users').where({ id }).update(changes).returning('*');

module.exports = { create, findByEmail, findById, updateById };
