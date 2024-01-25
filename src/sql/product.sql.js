const knex = require("../database/database")

const getProducts = () => {
    return knex.select(
        [
            'products.*',
            'brands.name as brand_name',
            'categories.name as category_name',
            'brands.slug as brand_slug',
            'categories.slug as category_slug',
            knex.raw('GROUP_CONCAT(product_image.imageUrl) as imageUrls')
        ]
    )
        .from('products')
        .leftJoin('brands', 'products.brand_id', 'brands.id')
        .leftJoin('categories', 'products.category_id', 'categories.id')
        .leftJoin('product_image', 'products.id', 'product_image.product_id')
        .groupBy('products.id')
}
module.exports = {
    getProducts
}