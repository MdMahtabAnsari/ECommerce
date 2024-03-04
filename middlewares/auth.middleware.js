const User = require('../model/user.model');
const emailValidator = require("email-validator");
const { secret } = require('../config/secretKey.config');
const jwt = require('jsonwebtoken');


const signUpValidator = async (req, res, next) => {
    try {
        if (!req.body.name) {
            res.status(400).send({ message: "name is require" });
            return;
        }
        if (!req.body.userId) {
            res.status(400).send({ message: "userId is require" });
            return;
        }
        if (!req.body.password) {
            res.status(400).send({ message: "password is require" });
            return;
        }
        if (!req.body.email) {
            res.status(400).send({ message: "email is require" });
            return;
        }
        next();

    }
    catch (error) {
        res.status(500).send({ message: "something went wrong!", error: error.message });
    }
}

const emailValidation = (req, res, next) => {
    try {
        if (!emailValidator.validate(req.body.email)) {
            res.status(400).send({ message: "valid email require" });
            return;
        }
        next();
    }
    catch (error) {
        res.status(500).send({ message: "something went wrong!", error: error.message });
    }
}

const isUserExist = async (req, res, next) => {
    try {
        if (await User.findOne({ userId: req.body.userId })) {
            res.status(400).send({ message: "userId already exist" });
            return;
        }
        if (await User.findOne({ email: req.body.email })) {
            res.status(400).send({ message: "email already exist" });
            return;
        }
        next();
    }
    catch (error) {
        res.status(500).send({ message: "something went wrong!", error: error.message });
    }
}

const signInValidation = (req, res, next) => {
    if (!req.body.userId) {
        res.status(400).send({ message: "userId is require" });
        return;
    }
    if (!req.body.password) {
        res.status(400).send({ message: "password is require" });
        return;
    }
    
    next()
}

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];
        if (!token) {
            res.status(400).send({ message: "token is require" });
            return;
        }
        const decoded = jwt.verify(token, secret);
        if(!decoded){
            res.status(400).send({ message: "invalid token" });
            return;
        }
        const user = await User.findOne({ userId: decoded.userId });
        if (!user) {
            res.status(400).send({ message: "invalid token" });
            return;
        }
        next()
    }
    catch (error) {
        res.status(500).send({ message: "something went wrong", error: error.message });
    }
}

const isAdmin = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];
        const decoded = jwt.verify(token, secret);
        const user = await User.findOne({ userId: decoded.userId });
        if (user.userType !== "admin") {
            res.status(400).send({ message: "you are not admin" });
            return;
        }
        next();
    } catch (error) {
        res.status(500).send({ message: "something went wrong", error: error.message });
    }
}

const validateOTP = async(req, res, next) => {
    try {
        if(!req.body.userId){
            res.status(400).send({message:"userId is require"});
            return;
        }
        if (!req.body.otp) {
            res.status(400).send({ message: "otp is require" });
            return;
        }
        const user = await User.findOne({userId:req.body.userId});
        if(!user){
            res.status(400).send({message:"invalid userId"});
            return;
        }
        next();
    }
    catch (error) {
        res.status(500).send({ message: "something went wrong", error: error.message });
    }
}
const valiadteGenerateOTP =async (req, res, next) => {
    try {
        if (!req.body.userId) {
            res.status(400).send({ message: "userId is require" });
            return;
        }
        const user = await User.findOne({ userId:req.body.userId });
        if (!user) {
            res.status(400).send({ message: "invalid userId" });
            return;
        }
        if (user.verified) {
            res.status(400).send({ message: "user already verified" });
            return;
        }
        next();
    }
    catch (error) {
        res.status(500).send({ message: "something went wrong", error: error.message });
    }
}

module.exports = {
    signUpValidator: signUpValidator,
    emailValidation: emailValidation,
    isUserExist: isUserExist,
    signInValidation: signInValidation,
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    validateOTP: validateOTP,
    valiadteGenerateOTP: valiadteGenerateOTP
}