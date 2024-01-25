/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const { faker } = require('@faker-js/faker');

module.exports.seedProducts = async function (knex) {
  // Deletes ALL existing entries
  await knex('products').del()
  let data = [];
  for (let i = 0; i < 20; i++) {
    data.push({
      name: faker.commerce.productName(),
      desc: faker.commerce.productDescription(),
      details: faker.lorem.paragraphs(),
      slug: faker.lorem.slug(),
      price: faker.commerce.price(),
      created_at: faker.date.past(),
      category_id: getRandomId(1, 5), // id ngẫu nhiên
      brand_id: getRandomId(1, 5),
    })
  }
  return await knex('products').insert(data);

};
function getRandomId(min, max) {
  return faker.datatype.number({ min, max }); 
}
