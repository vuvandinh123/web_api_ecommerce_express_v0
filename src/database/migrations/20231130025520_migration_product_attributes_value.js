/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.hasTable('product_attributesValue').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('product_attributesValue', table => {
                table.increments('id').primary().unsigned().notNullable();
                table.bigInteger('product_id').notNullable().unsigned();
                table.integer('attributeValue_id').notNullable().unsigned();
                table.foreign('attributeValue_id').references('id').inTable('attribute_value').onDelete('CASCADE');
                table.foreign('product_id').references('id').inTable('products').onDelete('CASCADE');
                
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
