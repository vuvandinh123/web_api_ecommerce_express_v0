const knex = require("../database/database");
const { createSlug } = require("../utils/helper");
const moment = require('moment');

// Constructor category
const Categories = function (category) {
    this.name = category.name;
    this.parend_id = category.parend_id;
    this.imageUrl = category.imageUrl;
}
Categories.getAll = async (params, result) => {
    const page = params.page || 1; // The page number to display
    const perPage = params.limit || 10; // The number of records per page
    const offset = (page - 1) * perPage;

    const total = await knex.count('* as total').from('categories');
    const totalPage = Math.ceil(total[0].total / perPage);
    try {
        const response = await knex.select('*')
            .from('categories')
            .limit(perPage)
            .offset(offset)
            .orderBy('categories.id', 'desc')

        result(null, {
            data: response,
            pagination: {
                page: Number(page),
                limit: Number(perPage),
                totalItems: total[0].total,
                totalPages: totalPage,
            }
        })
    } catch (error) {
        result(error, null)
    }
}
Categories.getById = async (id, result) => {
    try {
        if (!id) {
            result("Missing id", null)
            return
        }
        const response = await knex.select('*').from('categories').where('categories.id', id).first();
        if (!response) {
            result("category not found", null)
            return
        }
        result(null, response)
    } catch (error) {
        result(error, null)
    }
}

Categories.create = async (category, result) => {
    try {
        const currentDate = moment();
        const formattedDate = currentDate.format('YYYY-MM-DD HH:mm:ss');
        const item = {
            name: category.name,
            parend_id: category.parend_id,
            imageUrl: category.imageUrl,
            slug: createSlug(category.name),
            created_at: formattedDate
        }
        const response = await knex.from('categories').insert(item)
        if (response) {
            const id = response[0]
            const response2 = await knex.from('categories').where('categories.id', id).first()
            result(null, response2)
        }
        else{
            result("Error insert", null)
            return 
        }
    } catch (error) {
        console.log(error);
        result(error, null)
    }
}
Categories.update = async (id, category, result) => {
    try {
        if (!id) {
            result("Missing id", null)
            return
        }
        const currentDate = moment();
        const formattedDate = currentDate.format('YYYY-MM-DD HH:mm:ss');
        const item = {
            name: category.name,
            parend_id: category.parend_id,
            imageUrl: category.imageUrl,
            slug: createSlug(category.name),
            updated_at: formattedDate
        }
        const response = await knex.from('categories').where('categories.id', id).update(item)
        if (!response) {
            result("category not found", null)
            return
        }
        else{
            const response2 = await knex.from('categories').where('categories.id', id).first()
            result(null, response2)
        }
    } catch (error) {
        result(error, null)
    }
}
Categories.deleteById = async (id, result) => {
    try {
        if (!id) {
            result("Missing id", null)
            return
        }
        const response = await knex.from('categories').where('categories.id', id).del()
        if (!response) {
            result("category not found", null)
            return
        }
        result(null, response)
    } catch (error) {
        result(error, null)
    }
}
module.exports = Categories