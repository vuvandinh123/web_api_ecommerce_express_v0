/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
   await knex.schema.hasTable('users').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('users', table => {
                table.increments('id');
                table.string('email');
                table.string('password');
                table.string('role');
                table.string('avatar');
                table.string('phone');
                table.string('address');
                table.string('name');
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
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users')
};
