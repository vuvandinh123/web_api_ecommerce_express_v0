const { seedAttributes } = require("./seed_attributes")
const { seedProduct_Attributes } = require("./seed_product_attributes")
const { seedBrand } = require("./seed_product_brand")
const { seedCategory } = require("./seed_product_category")
const { seedInventory } = require("./seed_product_inventory")
const { seedProducts } = require("./seed_products")

exports.seed = async function(knex) {

    await seedCategory(knex)
    await seedBrand(knex)
    await seedProducts(knex)
    await seedInventory(knex)
    await seedAttributes(knex)
    await seedProduct_Attributes(knex)

}