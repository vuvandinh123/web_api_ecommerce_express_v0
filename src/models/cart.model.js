const knex = require("../database/database");
const { createSlug, mapRowToProduct, RowToProductCart } = require("../utils/helper");
const moment = require('moment');

// Constructor cart
const Cart = function (cart) {
    this.product_id = cart.product_id;
    this.quantity = cart.quantity;
    this.cart_id = cart.cart_id;
}
Cart.getByCustomerId = async (id, result) => {
    try {
        if (!id) {
            result("Missing id", null)
            return
        }
        const response = await knex('cart_item')
            .join('cart_session', 'cart_session.id', 'cart_item.cart_id')
            .join('products', 'products.id', 'cart_item.product_id')
            .leftJoin('product_image', 'products.id', 'product_image.product_id')
            .where('cart_session.user_id', id)
            .groupBy('products.id', 'cart_item.quantity', 'cart_item.id')
            .select('cart_item.id', 'cart_item.product_id', 'products.name', 'products.price', 'cart_item.quantity', knex.raw('GROUP_CONCAT(product_image.imageUrl) as imageUrls'),);
        
        if (!response) {
            result("cart not found", null)
            return
        }
        const products = response.map(row => {
            return (RowToProductCart(row))
        })
        result(null, products)
    } catch (error) {
        result(error, null)
    }
}
Cart.create = async (newCart, result) => {
    try {
        const currentDate = moment();
        const formattedDate = currentDate.format('YYYY-MM-DD HH:mm:ss');
        
        const item = {
            ...newCart,
            created_at: formattedDate
        }
        const response = await knex.from('cart_item').insert(item)
        result(null, response)
    } catch (error) {
        console.log(error);
        result({ message: "wrong cart_id or product_id", status: 500 }, null)
    }
}
module.exports = Cart