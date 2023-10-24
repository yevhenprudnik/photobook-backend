import { repository } from './repository.js';

/** @typedef {import('./types').User} User */
/** @typedef {import('./types').Repository<User>} UserRepository */

/** @type UserRepository */
export default repository('user');
