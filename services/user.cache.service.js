/** @typedef {import('../db/repositories/types').User} User */

/**
 * @param {any} target
 * @param {User} user
 * @returns {boolean}
 */
export const setUser = (target, user) => {
  return Reflect.set(target, 'user', user);
};

/**
 * @param {any} target
 * @returns {User}
 */
export const getUser = target => {
  return Reflect.get(target, 'user');
};
