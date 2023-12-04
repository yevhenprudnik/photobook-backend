import db from '../db.js';

/** @type {import('./types.js').repository} */
export function repositoryBuilder(table) {
  return {
    find: async (filter = {}) => {
      return db(table).where(filter);
    },

    findOne: async filter => {
      return db(table).where(filter).first();
    },

    create: async definition => {
      const entities = await db(table).insert(definition).returning('id');

      return entities[0].id;
    },

    update: async (id, definition) => {
      const res = await db(table)
        .where({ id })
        .update(definition)
        .returning('*');

      return res[0];
    },

    remove: async filter => {
      const affected = await db(table).where(filter).del();

      return { affected };
    },
  };
}
