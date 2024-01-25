const Cart = require("../models/cart.model");

const findByCustomerId = async (req, res) => {
    const { id } = req.params;
    try {
        await Cart.getByCustomerId(id, (err, result) => {
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
const create = async (req, res) => {
    const cart = new Cart(req.body);
    const data = await Cart.create(cart, (err, result) => {
        if (err) {
            res.status(500).send({ status: err.status, message: err.message || "error" })
            return
        } else {
            res.json({ status: 200, message: "sussess", result })
        }
    });
}

module.exports = {
    findByCustomerId,
    create
}