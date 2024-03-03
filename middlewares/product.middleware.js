const Catagory = require('../model/catagory.model');
const Product = require('../model/product.model');

const isProductCatagoryExist = async (req, res, next) => {
    try {
        const catagory = await Catagory.findOne ({name: req.body.catagory});
        if (!catagory) {
            return res.status(400).send({message: "Catagory not found"});
        }
        next();
    }
    catch (error) {
        res.status(500).send({message: "something went wrong!", error: error.message});
    }

}
const productValidation = (req, res, next) => {
    if (!req.body.name) {
        return res.status(400).send({ message: "Name is required" });
    }
    if (!req.body.catagory) {
        return res.status(400).send({ message: "Catagory is required" });
    }
    if (!req.body.price) {
        return res.status(400).send({ message: "Price is required" });
    }
    if (!req.body.stock) {
        return res.status(400).send({ message: "Stock is required" });
    }
    if (!req.body.description) {
        return res.status(400).send({ message: "Description is required" });
    }
    next();
}
const isProductExist = async (req, res, next) => {
    try {
        const product = await Product.findOne ({name: req.body.name});
        if (product) {
            return res.status(400).send({message: "Product already exist"});
        }
        next();
    }
    catch (error) {
        res.status(500).send({message: "something went wrong!", error: error.message});
    }
}

module.exports = {
    isProductCatagoryExist: isProductCatagoryExist,
    productValidation: productValidation,
    isProductExist: isProductExist
}