/** @param { import("knex").Knex } knex */
export const up = knex => {
  return knex.schema.createTable('page', table => {
    table.increments();
    table.integer('position').notNullable();
    table.enu('type', ['default', 'cover']).defaultTo('default');
    table.json('replacements');
    table
      .integer('photobookId')
      .references('photobook.id')
      .notNullable()
      .onDelete('CASCADE');
    table
      .integer('templateId')
      .references('template.id')
      .notNullable()
      .onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

/** @param { import("knex").Knex } knex */
export const down = knex => {
  return knex.schema.dropTable('page');
};
