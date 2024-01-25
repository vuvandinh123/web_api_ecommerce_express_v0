/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.hasTable('category_attributes').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('category_attributes', table => {
                table.increments('id').primary().unsigned().notNullable();
                table.integer('category_id').notNullable().unsigned();
                table.integer('attribute_id').notNullable().unsigned();
                table.foreign('attribute_id').references('id').inTable('attributes').onDelete('CASCADE');
                table.foreign('category_id').references('id').inTable('product_category').onDelete('CASCADE');
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
  
};
