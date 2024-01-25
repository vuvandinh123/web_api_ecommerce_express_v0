/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.hasTable('attributes').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('attributes', table => {
                table.increments('id').primary().unsigned().notNullable();
                table.string('name');
                
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
