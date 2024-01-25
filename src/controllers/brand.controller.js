const Brands = require("../models/brand.model");

const findAll = async (req, res) => {
    try {
        await Brands.getAll(req.query, (err, result) => {
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
    const { id } = req.params;
    const data = await Brands.getById(id, (err, result) => {
        if (err) {
            res.status(500).send({ status: 404, message: err || "error" })
        } else {
            res.json({ status: 200, message: "sussess", result })
        }
    });
}

const create = async (req, res) => {
    const brand = new Brands(req.body);
    const data = await Brands.create(brand, (err, result) => {
        if (err) {
            res.status(500).send({ status: 404, message: err || "error" })
            return
        } else {
            res.json({ status: 200, message: "sussess", result })
        }
    });
}
const update = async (req, res) => {
    const brand = new Brands(req.body);
    const id = req.params.id;
    const data = await Brands.update(id, brand, (err, result) => {
        if (err) {
            res.status(500).send({ status: 404, message: err || "error" })
        }
        else {
            res.json({ status: 200, message: "sussess", result })
        }

    })
} 
const deleteById = async (req, res) => {
    const { id } = req.params;
    const data = await Brands.deleteById(id, (err, result) => {
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
    create,
    deleteById,
    update
}