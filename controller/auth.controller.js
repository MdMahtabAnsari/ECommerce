const bcrypt = require('bcrypt');
const User = require('../model/user.model');
const { salt } = require('../config/hashSalt.config');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/secretKey.config');
const speakeasy = require('speakeasy');
const nodemailer = require('nodemailer');
const { user, pass,mailPort } = require('../config/email.config');



const singnUp = async (req, res) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, salt);
        const result = await User.create(req.body);
        res.status(201).send(result);
    }
    catch (error) {
        res.status(500).send({ message: "something went wrong!", error: error.message });
    }
}

const signIn = async (req, res) => {
    try {
        const data = await User.findOne({ userId: req.body.userId });
        if (data.verified === false) {
            res.status(401).send({ message: "Please verify your account first" });
            return;
        }
        if (bcrypt.compareSync(req.body.password, data.password)) {
            const token = jwt.sign({ userId: req.body.userId }, secret, { expiresIn: '7d' })
            res.status(200).send({ userId: req.body.userId, token: token });
            return;
        }
        else {
            res.status(401).send({ message: "Wrong Password" })
            return;
        }
    }
    catch (error) {
        res.status(500).send({ message: "something went wrong!", error: error.message });
    }
}

const generateOTP = async (req, res) => {
    try {
        const secret = speakeasy.generateSecret();
        const data = await User.updateOne({ userId: req.body.userId }, { secret: secret.base32 });
        const userData = await User.findOne({ userId: req.body.userId });
        const otp = speakeasy.totp({
            secret: secret.base32,
            encoding: 'base32',
            window: 600
        });
        const transporter = nodemailer.createTransport({

            host: 'smtp.gmail.com',
            port: mailPort,
            auth: {
                user: user,
                pass: pass
            }
        });
        const mailOptions = {
            from: user,
            to: userData.email,
            subject: 'OTP for verification',
            text: `Your OTP is ${otp} and it will expire in 10 minutes. Please do not share it with anyone.`
        }
        await transporter.sendMail(mailOptions);
        res.status(200).send({ message: 'OTP sent successfully' });

    }
    catch (error) {
        res.status(500).send({ message: "something went wrong!", error: error.message });
    }


}
const verifyOTP = async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.body.userId });
        const secret = user.secret;
        const otp = req.body.otp;
        const tokenValidates = speakeasy.totp.verify({
            secret: secret,
            encoding: 'base32',
            token: otp,
            window: 600
        });
        if (tokenValidates) {
            const result = await User.updateOne({ userId: req.body.userId }, { verified: true });
            res.status(200).send({ message: 'OTP verified successfully' });
        }
        else {
            res.status(401).send({ message: 'Invalid OTP' });
        }
    }
    catch (error) {
        res.status(500).send({ message: "something went wrong!", error: error.message });
    }
}




module.exports = {
    signUp: singnUp,
    signIn: signIn,
    generateOTP: generateOTP,
    verifyOTP: verifyOTP

}