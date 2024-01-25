const Products = require("../models/product.model");

const findAll = async (req, res) => {
    try {
        await Products.getAll(req.query, (err, result) => {
            if (err) {
                res.status(500).send({ status: 400, message: err || "error" });
            } else {
                res.json({ status: 200, message: "success", result });
            }
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while retrieving products."
        });
    }
    res.end();
}
const findById = async (req, res) => {
    const data = await Products.getById(req.params.id, (err, result) => {
        if (err) {
            res.status(500).send({ status: 404, message: err || "error" })
        } else {
            res.json({ status: 200, message: "sussess", result })
        }
    });
}
const searchProductByNameWithCategory = async (req, res) => {
    const data = await Products.searchByNameWithCategory(req.body, (err, result) => {
        if (err) {
            res.status(500).send({ status: 404, message: err || "error" })
        } else {
            res.json({ status: 200, message: "sussess", result })
        }
    });
}
const createProduct = async (req, res) => {
    const product = new Products(req.body);
    const data = await Products.create(product,req.body.images, (err, result) => {
        if (err) {
            res.status(500).send({ status: 404, message: err || "error" })
            return
        } else {
            res.json({ status: 200, message: "sussess", data: result })
        }
    });
}
const updateProduct = async (req, res) => {
    const product = new Products(req.body);
    const id = req.params.id;
    const data = await Products.update(id, product, (err, result) => {
        if (err) {
            res.status(500).send({ status: 404, message: err || "error" })
        }
        else {
            res.json({ status: 200, message: "sussess", result })
        }

    })
}
const deleteProductById = async (req, res) => {
    const { id } = req.params;
    const data = await Products.deleteById(id, (err, result) => {
        if (err) {
            res.status(500).send({ status: 404, message: err || "error" })
        } else {
            res.json({ status: 200, message: "sussess", result })
        }
    })
}

module.exports = {
    findAll,
    findById,
    createProduct,
    updateProduct,
    searchProductByNameWithCategory,
    deleteProductById
}