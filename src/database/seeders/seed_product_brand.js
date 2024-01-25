/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const { faker } = require('@faker-js/faker');

module.exports.seedBrand = async function (knex) {
  // Deletes ALL existing entries
  await knex('product_brand').del()
  const data = [];
  for (let i = 0; i < 5; i++) {
    data.push({
      name: faker.commerce.department(),
      desc: faker.lorem.sentence(),
      slug: faker.lorem.slug(),
      image: faker.image.imageUrl(),
      created_at: faker.date.past()
    });
  }
  return await knex('product_brand').insert(data);
};
