const Categories = require("../models/category.model");

const findAll = async (req, res) => {
    try {
        await Categories.getAll(req.query, (err, result) => {
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
    const data = await Categories.getById(id, (err, result) => {
        if (err) {
            res.status(500).send({ status: 404, message: err || "error" })
        } else {
            res.json({ status: 200, message: "sussess", result })
        }
    });
}

const create = async (req, res) => {
    const category = new Categories(req.body);
    const data = await Categories.create(category, (err, result) => {
        if (err) {
            res.status(500).send({ status: 404, message: err || "error" })
            return
        } else {
            res.json({ status: 200, message: "sussess", result })
        }
    });
}
const update = async (req, res) => {
    const category = new Categories(req.body);
    const id = req.params.id;
    const data = await Categories.update(id, category, (err, result) => {
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
    const data = await Categories.deleteById(id, (err, result) => {
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
    update,
    deleteById
}