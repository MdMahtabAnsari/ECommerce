const Product = require('../model/product.model');
const Catagory = require('../model/catagory.model');

const createProduct = async (req, res) => {
    try {
        const createdProdct = await Product.create(req.body);
        const result = await Catagory.updateOne({ name: req.body.catagory }, { $push: { product: createdProdct._id } });
        res.status(201).send(createdProdct);
    }
    catch (error) {
        res.status(500).send({ message: "something went wrong!", error: error.message });
    }
}



module.exports = { createProduct: createProduct };