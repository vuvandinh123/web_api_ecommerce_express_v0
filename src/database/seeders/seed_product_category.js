const { faker } = require('@faker-js/faker');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
module.exports.seedCategory = async (knex) => {
  // Deletes ALL existing entries
  await knex('product_category').del()
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
  return await knex('product_category').insert(data);
};
