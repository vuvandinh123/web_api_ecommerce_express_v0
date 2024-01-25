/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema.hasTable('attribute_value').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('attribute_value', table => {
                table.increments('id').primary().unsigned().notNullable();
                table.string('value').notNullable().unique();
                table.integer('attribute_id').notNullable().unsigned();
                table.foreign('attribute_id').references('id').inTable('attributes').onDelete('CASCADE');
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

};
