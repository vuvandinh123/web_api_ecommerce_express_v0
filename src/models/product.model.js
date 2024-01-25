const knex = require("../database/database");
const { mapRowToProduct, createSlug } = require("../utils/helper");
const { selectProduct, getProducts } = require("../sql/product.sql")
const moment = require('moment');
const { sortProduct } = require("../utils/filter");
// Constructor products
const Products = function (product) {
    this.name = product.name;
    this.description = product.description;
    this.slug = product.slug;
    this.price = product.price;
    this.category_id = product.category_id;
    this.brand_id = product.brand_id;
    this.details = product.details;
    this.published = product.published || 1;
    this.quantity = product.quantity;
}
Products.getAll = async (params, result) => {
    const page = params.page || 1; // The page number to display
    const perPage = params.limit || 10; // The number of records per page
    const offset = (page - 1) * perPage;

    // sort by createdAtDesc, createdAtAsc, nameDesc, nameAsc, priceDesc, priceAsc
    const sortBy = params.sortBy || 'createdAtDesc';
    const sort = sortProduct(sortBy);

    // Retrieve the total number of products
    const total = await knex.count('* as total').from('products');
    const totalPage = Math.ceil(total[0].total / perPage);

    // filter by attributes
    const attr = params.attr && JSON.parse(params.attr) || null;
    // Retrieve the products with additional information
    try {
        const query = getProducts().clone()
            .limit(perPage)
            .offset(offset)
            .orderBy(sort.nameSort, sort.valueSort)
        if (params.brand) {
            query.where('products.brand_id', Number(params.brand));
        }
        if (params.category) {
            query.where('products.category_id', Number(params.category));
        }
        if (attr) {
            query
                .join('product_attributesValue', 'products.id', 'product_attributesValue.product_id')
                .join('attribute_value', 'product_attributesValue.attributeValue_id', 'attribute_value.id')
                .whereIn('attribute_value.value', attr)
        }
        const response = await query;
        const products = response.map(row => {
            return mapRowToProduct(row);
        });
        result(null, {
            data: products,
            pagination: {
                page: Number(page),
                limit: Number(perPage),
                totalPages: totalPage,
                totalProduct: total[0].total
            }
        })
    } catch (error) {
        result(error, null)
    }
}
Products.getById = async (id, result) => {
    try {

        if (!id) {
            result("Missing id", null)
            return
        }
        const response = await getProducts().clone().where('products.id', id).first()
        const attr = await knex.table('attributes')
            .select(
                'attributes.name',
                knex.raw('GROUP_CONCAT(attribute_values.value) as data')
            )
            .leftJoin('attribute_values', 'attributes.id', 'attribute_values.attribute_id')
            .where('attribute_values.product_id', id)
            .groupBy('attributes.id')
        if (!response) {
            result("Product not found", null)
            return
        }
        response.attributes = attr
        result(null, mapRowToProduct(response))
    } catch (error) {
        result(error, null)
    }
}
Products.searchByNameWithCategory = async (body, result) => {
    const { search, categoryId } = body;

    try {
        const query = selectProduct().clone().limit(10)
        if (!search) {
            result("Missing search", null)
            return
        }
        query.whereILike('products.name', `%${search}%`)
        if (categoryId) {
            query.where('products.category_id', categoryId)
        }
        const response = await query
        if (!response.length) {
            result("Product not found", null)
            return
        }
        result(null, response)
    } catch (error) {
        result(error, null)
    }
}
Products.create = async (product, images, result) => {
    try {
        const currentDate = moment();
        const formattedDate = currentDate.format('YYYY-MM-DD HH:mm:ss');
        const item = {
            ...product,
            slug: createSlug(product.name),
            created_at: formattedDate
        }
        const response = await knex.from('products').insert(item)
        if (!response) {
            result("Product not found", null)
            return
        }
        else {
            const id = response[0]
            if (images) {
                const arrImage = images.map((image) => {
                    return {
                        product_id: id,
                        imageUrl: image
                    }
                }
                )
                const resImage = await knex.from('product_image').insert(arrImage)
            }
            const response2 = await knex.from('products').where('products.id', id).first()
            result(null, response2)
        }
    } catch (error) {
        result(error, null)
    }
}
Products.update = async (id, product, result) => {
    try {
        if (!id) {
            result("Missing id", null)
            return
        }
        const currentDate = moment();
        const formattedDate = currentDate.format('YYYY-MM-DD HH:mm:ss');
        const item = {
            ...product,
            updated_at: formattedDate
        }
        const response = await knex.from('products').where('products.id', id).update(item)
        if (!response) {
            result("Product not found", null)
            return
        }
        result(null, response)
    } catch (error) {
        result(error, null)
    }
}
Products.deleteById = async (id, result) => {
    try {
        if (!id) {
            result("Missing id", null)
            return
        }
        const response = await knex.from('products').where('products.id', id).del()
        if (!response) {
            result("Product not found", null)
            return
        }
        result(null, response)
    } catch (error) {
        result(error, null)
    }
}
module.exports = Products