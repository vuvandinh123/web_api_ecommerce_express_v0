const knex = require("../database/database")
const nodemailer = require('nodemailer');
const { Vonage } = require('@vonage/server-sdk')



const Attributes = (attributes) => {
    this.name = attributes.name
}
Attributes.getAttributesByCategory = async (id, result) => {
    try {
        if (!id) {
            result("Missing id", null)
            return
        }
        // const response = await knex
        //     .select('attributes.name', knex.raw('GROUP_CONCAT(attribute_value.value) as content'))
        //     .from('attributes')
        //     .join('category_attributes', 'attributes.id', 'category_attributes.attribute_id')
        //     .join('attribute_value', 'attributes.id', 'attribute_value.attribute_id')
        //     .where('category_attributes.category_id', id)
        //     .groupBy('attributes.id')
        const response = await knex
            .select('products.*', knex.raw('GROUP_CONCAT(attribute_value.value) as content'))
            .from('products')
            .join('product_attributesValue', 'products.id', 'product_attributesValue.product_id')
            .join('attribute_value', 'product_attributesValue.attributeValue_id', 'attribute_value.id')
            .whereIn('attribute_value.value', ['32gb', 'red'])
            .groupBy('products.id')
        if (!response) {
            result("Attributes not found", null)
            return
        }
        result(null, response)
    } catch (error) {
        result(error, null)
    }
}
Attributes.getAttributesByProduct = async (id, result) => {
    try {
        // let transporter = nodemailer.createTransport({
        //     host: "smtp.gmail.com",
        //     port: 587,
        //     secure: false,
        //     auth: {
        //         user: 'vuvandinh203@gmail.com',
        //         pass: 'myrcyargrbibcphf'
        //     }
        // });

        // let mailOptions = {
        //     from: 'vuvandinh203@gmail.com', // địa chỉ email người gửi
        //     to: 'vudinh.01633583800@gmail.com', // địa chỉ email người nhận
        //     subject: 'Gửi email test',
        //     text: 'Nội dung email test 21198'
        // }
        // transporter.sendMail(mailOptions, function (error, info) {
        //     if (error) {
        //         console.log(error);
        //     } else {
        //         console.log('Email sent: ' + info.response);
        //     }
        // });
        // if (!id) {
        //     result("Missing id", null)
        //     return
        // }
        // const response = await knex
        //     .select('products.*')
        //     .from('products')
        //     .join('product_attributes', 'products.id', 'product_attributes.product_id')
        //     .where('product_attributes.value', 'red')
        //     .groupBy('products.id')
        // if (!response) {
        //     result("Attributes not found", null)
        //     return
        // }
        result(null, null)
    } catch (error) {
        result(error, null)
    }
}
Attributes.findByIdProduct = async (id, result) => {
    try {
        if (!id) {
            result("Missing id", null)
            return
        }
        const response = await knex.
            select(
                'attributes.name',
                knex.raw('GROUP_CONCAT(product_attributes.value) as content')
            )
            .from('attributes')
            .join('product_attributes', 'attributes.id', 'product_attributes.attribute_id')
            .where('product_attributes.product_id', id)
            .groupBy('attributes.id')
        if (!response) {
            result("Attributes not found", null)
            return
        }
        const attr = response.map(row => {
            return {
                name: row.name,
                content: row.content.split(',')
            }
        })
        result(null, attr)
    } catch (error) {
        result(error, null)
    }
}
module.exports = Attributes