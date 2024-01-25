/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const { faker } = require('@faker-js/faker');

module.exports.seedAttributes = async function(knex) {
  // Deletes ALL existing entries
  await knex('attributes').del()
  const data = [];
  for (let i = 0; i < 5; i++) {
    data.push({
      name: faker.commerce.department(),
    });
  }
  return await knex('attributes').insert(data);
};
