const Catagory = require('../model/catagory.model');
const Product = require('../model/product.model');

const createCatagory = async (req, res) => {
    try {
        const result = await Catagory.create(req.body);
        res.status(201).send(result);
    }
    catch (error) {
        res.status(500).send({ message: "something went wrong!", error: error.message });
    }
}
const updateProductByCatagory = async (name, newName) => {
    try {
        const result = await Product.updateMany({ catagory: name }, { $set: { catagory: newName } });
        return result;
    }
    catch (error) {
        return error;
    }
}

const updateCatagory = async (req, res) => {
    try {
        const catagory = await Catagory.findOne({ name: req.body.name });
        const newCatagory = await Catagory.findOne({ name: req .body.newName });
        if (newCatagory) {
            return res.status(400).send({ message: "new catagory already exist!" });
        }
        if (!catagory) {
            return res.status(400).send({ message: "catagory not found!" });
        }
        const updatedCatagory = await Catagory.updateOne({ name: req.body.name }, { $set: { name: req.body.newName } });
        const updatedProduct = await updateProductByCatagory(req.body.name, req.body.newName);



        res.status(201).send(updatedCatagory);
    }
    catch (error) {
        res.status(500).send({ message: "something went wrong!", error: error.message });
    }
}

const getCatagory = async (req, res) => {
    try {
        const result = await Catagory.find();
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send({ message: "something went wrong!", error: error.message });
    }
}
const deleteCatagory = async (req, res) => {
    try {
        const catagory = await Catagory.findOne ({name: req.body.name});
        if(catagory.products.length === 0){
            const result = await Catagory.deleteOne({ name: req.body.name });
            res.status(200).send(result);
        }
        else{
            res.status(400).send({message: "Catagory is not empty"});
        }

    }
    catch (error) {
        res.status(500).send({ message: "something went wrong!", error: error.message });
    }
}


module.exports = {
    createCatagory: createCatagory,
    updateCatagory: updateCatagory,
    getCatagory: getCatagory,
    deleteCatagory: deleteCatagory
}
