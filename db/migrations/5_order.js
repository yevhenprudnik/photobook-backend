/** @param { import("knex").Knex } knex */
export const up = (knex) => {
  return knex.schema.createTable('order', (table) => {
    table.increments();
    table
      .integer('userId')
      .references('user.id')
      .notNullable()
      .onDelete('CASCADE');
    table
      .integer('photobookId')
      .references('photobook.id')
      .notNullable()
      .onDelete('CASCADE');
    table
      .enu('status', ['pending', 'fulfilled', 'rejected'])
      .defaultTo('pending');
    table.string('trackingNumber');
    table.string('paymentId');
    table.json('price');
    table.timestamps(true, true);
  });
};

/** @param { import("knex").Knex } knex */
export const down = (knex) => {
  return knex.schema.dropTable('order');
};
