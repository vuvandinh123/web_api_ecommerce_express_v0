/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const { faker } = require('@faker-js/faker');

module.exports.seedProduct_Attributes = async function(knex) {
  // Deletes ALL existing entries
  await knex('attribute_value').del()
  const data = [];
  for (let i = 0; i < 5; i++) {
    data.push({
      value: faker.commerce.department(),
      attribute_id: i+1,
    });
  }
  return await knex('attribute_value').insert(data);
};
