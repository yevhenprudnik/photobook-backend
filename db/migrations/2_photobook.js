/** @param { import("knex").Knex } knex */
export const up = knex => {
  return knex.schema.createTable('photobook', table => {
    table.increments();
    table.string('name', 50).notNullable();
    table
      .integer('userId')
      .references('user.id')
      .notNullable()
      .onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

/** @param { import("knex").Knex } knex */
export const down = knex => {
  return knex.schema.dropTable('photobook');
};
