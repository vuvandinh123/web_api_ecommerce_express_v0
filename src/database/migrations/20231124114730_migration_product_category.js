/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
   await knex.schema.hasTable('product_category').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('product_category', table => {
                table.increments('id').primary().unsigned().notNullable();
                table.string('name');
                table.text('desc');
                table.string('slug')
                table.string('image');   
                table.timestamp('created_at').defaultTo(knex.fn.now()).nullable();
                table.timestamp('updated_at').nullable();
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
    return knex.schema.dropTableIfExists('product_category')
};
