/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const { faker } = require('@faker-js/faker');

module.exports.seedInventory = async function(knex) {
  // Deletes ALL existing entries
  await knex('product_inventory').del()
  const data = [];
  for (let i = 0; i < 20; i++) {
    data.push({
      quantity: faker.datatype.number({ min: 0, max: 100 }),
      product_id: i+1,
      created_at: faker.date.past()
    });
  }
  return await knex('product_inventory').insert(data);
};
