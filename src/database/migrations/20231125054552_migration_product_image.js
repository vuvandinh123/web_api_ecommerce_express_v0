/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.hasTable('product_image').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('product_image', table => {
                table.bigIncrements('id').primary().unsigned().notNullable();
                table.string('image_url');
                table.bigInteger('product_id').notNullable().unsigned();
                table.foreign('product_id').references('id').inTable('products').onDelete('CASCADE');
                table.timestamp('created_at').defaultTo(knex.fn.now()).nullable();
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
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('product_image')
};
