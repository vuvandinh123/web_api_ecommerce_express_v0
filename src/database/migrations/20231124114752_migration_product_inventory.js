/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema.hasTable('product_inventory').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('product_inventory', table => {
                table.bigIncrements('id').primary().unsigned().notNullable();
                table.integer('quantity');
                table.bigInteger('product_id').notNullable().unsigned();
                table.foreign('product_id').references('id').inTable('products').onDelete('CASCADE');
                table.timestamp('created_at').defaultTo(knex.fn.now()).nullable();
                table.timestamp('updated_at').nullable();
            }).then(() => {
                console.log('table created')
            }).catch((err) => {
                console.log(err)
            })
        }
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('product_inventory')
};
