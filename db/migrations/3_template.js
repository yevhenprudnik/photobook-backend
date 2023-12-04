/** @param { import("knex").Knex } knex */
export const up = knex => {
  return knex.schema.createTable('template', table => {
    table.increments();
    table.string('name', 50).notNullable();
    table.text('html').notNullable();
    table.specificType('requiredFields', 'TEXT[]').defaultTo('{}');
    table.timestamps(true, true);
  });
};

/** @param { import("knex").Knex } knex */
export const down = knex => {
  return knex.schema.dropTable('template');
};
