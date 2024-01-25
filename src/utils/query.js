const knex = require("../database/database");

module.exports.products = {
    table: 'products',
    columns: [
        'products.name',
        'products.slug',
        'product_brand.name as brand_name',
        'product_brand.slug as brand_slug',
        'product_category.name as category_name',
        knex.raw('GROUP_CONCAT(product_image.image_url) as image_urls'),
    ],
    joins: [
        {
            table: 'product_brand',
            on: 'product_brand.id',
            to: 'products.brand_id'
        },
        {
            table: 'product_category',
            on: 'product_category.id',
            to: 'products.category_id'
        },
        {
            table: "product_image",
            on: 'products.id',
            to: 'product_image.product_id'
        }
    ]
}