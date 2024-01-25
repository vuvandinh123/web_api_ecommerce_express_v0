/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.hasTable('products').then(function (exists) {
        if (!exists) {
            return  knex.schema.createTable('products', table => {
                table.bigIncrements('id').primary().unsigned();
                table.string('name');
                table.text('desc');
                table.text('details');
                table.string('slug')
                table.float('price');   
                table.timestamp('created_at').defaultTo(knex.fn.now()).nullable();
                table.timestamp('updated_at').nullable();
                table.integer('category_id').notNullable().unsigned();
                table.integer('brand_id').notNullable().unsigned();
                table.foreign('brand_id').references('id').inTable('product_brand').onDelete('CASCADE');
                table.foreign('category_id').references('id').inTable('product_category').onDelete('CASCADE');
            }).then(()=>{
                console.log('table created')
            }).catch((err)=>{
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
    return knex.schema.dropTableIfExists('products')
};
