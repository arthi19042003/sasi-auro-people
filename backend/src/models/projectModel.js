const db = require('../db');

const create = (data) => db('projects').insert(data).returning('*');
const findAll = () => db('projects').select('*');
const findById = (id) => db('projects').where({ id }).first();
const updateById = (id, changes) => db('projects').where({ id }).update(changes).returning('*');

module.exports = { create, findAll, findById, updateById };
