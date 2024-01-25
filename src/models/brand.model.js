const knex = require("../database/database");
const { createSlug } = require("../utils/helper");
const moment = require('moment');

// Constructor products
const Brands = function (brand) {
    this.name = brand.name;
    this.imageUrl = brand.imageUrl;
}
Brands.getAll = async (params, result) => {
    const page = params.page || 1; // The page number to display
    const perPage = params.limit || 10; // The number of records per page
    const offset = (page - 1) * perPage;
    const total = await knex.count('* as total').from('brands');
    const totalPage = Math.ceil(total[0].total / perPage);
    try {

        const query = await knex.from('brands').select("*")
            .limit(perPage)
            .offset(offset)
            .orderBy('brands.id', 'desc')
        result(null, {
            data: query,
            pagination: {
                page: Number(page),
                limit: Number(perPage),
                totalItems: total[0].total,
                totalPages: totalPage,
            }
        })
    } catch (error) {
        console.log("error", error);
        result(error, null)
    }
}
Brands.getById = async (id, result) => {
    try {
        if (!id) {
            result("Missing id", null)
            return
        }
        const response = await knex.from('brands')
            .select("*")
            .where('brands.id', id)
            .first();

        if (!response) {
            result("Product not found", null)
            return
        }
        result(null, response)
    } catch (error) {
        result(error, null)
    }
}
Brands.create = async (brand, result) => {
    try {
        const currentDate = moment();
        const formattedDate = currentDate.format('YYYY-MM-DD HH:mm:ss');
        const item = {
            ...brand,
            slug: createSlug(brand.name),
            created_at: formattedDate
        }
        const response = await knex.from('brands').insert(item)
        result(null, response)
    } catch (error) {
        console.log(error);
        result(error, null)
    }
}
Brands.update = async (id, brand, result) => {
    try {
        if (!id) {
            result("Missing id", null)
            return
        }
        const currentDate = moment();
        const formattedDate = currentDate.format('YYYY-MM-DD HH:mm:ss');
        const item = {
            name: brand.name,
            imageUrl: brand.imageUrl,
            slug: createSlug(brand.name),
            updated_at: formattedDate
        }
        const response = await knex.from('brands').where('brands.id', id).update(item)
        if (!response) {
            result("Brands not found", null)
            return
        }
        result(null, response)
    } catch (error) {
        result(error, null)
    }
}
Brands.deleteById = async (id, result) => {
    try {
        if (!id) {
            result("Missing id", null)
            return
        }
        const response = await knex.from('brands').where('brands.id', id).del()
        if (!response) {
            result("brands not found", null)
            return
        }
        result(null, response)
    } catch (error) {
        console.log(error);
        result(error, null)
    }
}
module.exports = Brands