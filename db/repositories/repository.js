import db from '../db.js';

/** @type {import('./types').repository} */
export function repository(table) {
  return {
    find: async (filter = {}) => {
      return db(table).where(filter);
    },

    findOne: async filter => {
      return db(table).where(filter).first();
    },

    create: async definition => {
      const users = await db(table).insert(definition).returning('id');

      return users[0].id;
    },

    remove: async filter => {
      const affected = await db(table).where(filter).del();

      return { affected };
    },
  };
}
