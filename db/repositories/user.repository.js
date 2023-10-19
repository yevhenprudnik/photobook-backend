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
 * @returns {Promise<number>}
 */
const create = async definition => {
  const users = await db('user').insert(definition).returning('id');

  return users[0].id;
};

/**
 * @param {Partial<User>} filter
 * @returns {Promise<User>} ???
 */
const remove = async filter => {
  return db('user').where(filter).del();
};

export default {
  find,
  findOne,
  create,
  remove,
};

// export const update = async () => {};
// export const remove = async () => {};
// export const count = async () => {};
// export const exist = async () => {};
