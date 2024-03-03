const Catagory = require('../model/catagory.model');

const validateCatagory = (req, res, next) => {
    if (!req.body.name) {
        return res.status(400).send({ message: "Name is required" });
    }
    if (!req.body.description) {
        return res.status(400).send({ message: "Description is required" });
    }
    next();
}

const isCatagoryExist = async (req, res, next) => {
    try {
        const catagory = await Catagory.findOne({ name: req.body.name });
        if (catagory) {
            return res.status(400).send({ message: "Catagory already exist" });
        }
        next();
    }
    catch (error) {
        res.status(500).send({ message: "something went wrong!", error: error.message });

    }
}
const updateCatagoryValidation = (req, res, next) => {
    if (!req.body.name) {
        return res.status(400).send({ message: "Name is required" });
    }
    if (!req.body.newName) {
        return res.status(400).send({ message: "New Name is required" });
    }
    next();
}
const deleteValidation = (req, res, next) => {
    if (!req.body.name) {
        return res.status(400).send({ message: "Name is required" });
    }
    next();
}
module.exports = {
    validateCatagory: validateCatagory,
    isCatagoryExist: isCatagoryExist,
    updateCatagoryValidation: updateCatagoryValidation,
    deleteValidation: deleteValidation
}