import db from '../db.js';

/** @typedef {import('./types').User} User */

/**
 * @param {Partial<User>} filter
 * @returns {Promise<User[]>}
 */
const find = async (filter = {}) => {
  return db('user').where(filter);
};

/**
 * @param {Partial<User>} filter
 * @returns {Promise<User>}
 */
const findOne = async filter => {
  return db('user').where(filter).first();
};

/**
 * @param {Partial<User>} definition
 * @returns {Promise<User>} ???
 */
const create = async definition => {
  return db('user').insert(definition);
};

export default {
  find,
  findOne,
  create,
};

// export const update = async () => {};
// export const remove = async () => {};
// export const count = async () => {};
// export const exist = async () => {};
