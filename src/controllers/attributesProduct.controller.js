const Attributes = require("../models/attributes.model");

const findById = async (req, res) => {
    const data = await Attributes.findByIdProduct(req.params.id, (err, result) => {
        if (err) {
            res.status(500).send({ status: 404, message: err || "error" })
        } else {
            res.json({ status: 200, message: "sussess", result })
        }
    });
}
const getAttributesByCategory = async (req, res) => {
    const data = await Attributes.getAttributesByProduct(req.params.id, (err, result) => {
        if (err) {
            res.status(500).send({ status: 404, message: err || "error" })
        } else {
            res.json({ status: 200, message: "sussess", result })
        }
    });
}
module.exports = {
    findById,
    getAttributesByCategory
}